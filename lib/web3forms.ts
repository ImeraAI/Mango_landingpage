/**
 * Web3Forms submission helper.
 *
 * The forms on this site are ours — our markup, our validation, our success
 * state. Web3Forms is only the transport: a POST to their endpoint, an email
 * in the inbox. Nothing is embedded, nothing is branded, and swapping it for
 * an own-hosted route handler later means changing this file alone.
 *
 * The access key is public by design (it identifies the form, not the
 * account) so shipping it to the client is expected. It still reads from the
 * environment first, so a fork or a preview deploy can point somewhere else
 * without editing source.
 */
const FALLBACK_ACCESS_KEY = '65ef6c2f-efc8-483f-a453-c6c30df4a97b';

export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || FALLBACK_ACCESS_KEY;

const ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Name of the hidden input Web3Forms treats as a honeypot. A bot that fills
 * every field it finds fills this one too, and the submission is dropped
 * server-side. Humans never see it, so there is no CAPTCHA to fail and no
 * third-party script to load.
 */
export const BOTCHECK_FIELD = 'botcheck';

/**
 * A form completed faster than this was not typed by a person. Paired with
 * the honeypot it covers the two ways cheap spam arrives — fill-everything
 * bots and replay scripts — without touching the experience of anyone real.
 */
const MIN_FILL_MS = 2500;

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

const GENERIC_ERROR =
  'Something went wrong sending that. Please try again, or email us directly.';

export async function submitToWeb3Forms(options: {
  /** Subject line of the notification email. */
  subject: string;
  /** Flat field map. Empty values are dropped so the email stays readable. */
  fields: Record<string, string | undefined | null>;
  /** Value of the honeypot input. Non-empty means bot. */
  botcheck?: string;
  /** `Date.now()` captured when the form was first rendered. */
  startedAt?: number;
  /** Shown as the sender name in the notification email. */
  fromName?: string;
}): Promise<SubmitResult> {
  const { subject, fields, botcheck, startedAt, fromName = 'Mango website' } =
    options;

  // Both bot gates fail closed and silent: report success to the client so a
  // scripted submitter learns nothing, but send nothing onward.
  if (botcheck) return { ok: true };
  if (startedAt && Date.now() - startedAt < MIN_FILL_MS) return { ok: true };

  const payload: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject,
    from_name: fromName,
  };
  for (const [key, value] of Object.entries(fields)) {
    const trimmed = typeof value === 'string' ? value.trim() : '';
    if (trimmed) payload[key] = trimmed;
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data: { success?: boolean; message?: string } = await res
      .json()
      .catch(() => ({}));

    if (res.ok && data.success) return { ok: true };
    return { ok: false, error: data.message || GENERIC_ERROR };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}
