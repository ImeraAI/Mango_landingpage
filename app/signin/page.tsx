'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Info, Fingerprint, Eye, EyeOff } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/primitives/Logo';
import { AuthBackdrop } from '@/components/primitives/AuthBackdrop';

import { supabase } from '@/lib/supabase';

/** Google's mark, inlined — the CSP blocks remote assets and an <img> here
 *  would be a render-blocking request for a 20px icon. */
function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.64v3.02h3.88c2.27-2.09 3.57-5.17 3.57-8.9Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3.02c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.23 0 12 0A12 12 0 0 0 1.29 6.62l3.98 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

export default function SignInPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [notice, setNotice] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // Redirect user to the /dashboard path served by proxy rewrite
    window.location.href = '/dashboard';
  }

  return (
    <>
      <Header />
      <main className="relative flex min-h-[calc(100vh-68px)] items-center justify-center overflow-x-hidden bg-slate-50/70 px-4 py-24">
        <AuthBackdrop />
        <div className="relative w-full max-w-md">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-card">
            <div className="flex justify-center">
              <Link
                href="/"
                aria-label="Mango home"
                className="inline-flex rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
              >
                <Logo className="h-9 w-auto" />
              </Link>
            </div>
            <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight text-slate-900">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Welcome back. Enter your details to reach your dashboard.
            </p>

            {errorMsg && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourshop.com"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <span className="text-xs text-slate-400">
                    Forgot it? Call us.
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-3.5 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  />
                  {/*
                    Outside the label and typed as a button, so a click reveals
                    the value instead of re-focusing the input, and Enter here
                    never submits the form. `aria-pressed` is what tells a
                    screen reader the password is currently visible.
                  */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    aria-controls="password"
                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl text-slate-400 transition-colors hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" variant="brand" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200/60" />
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Or sign in with
              </span>
              <span className="h-px flex-1 bg-slate-200/60" />
            </div>

            {/* Same honest path as the password form: there is no auth backend,
                so these surface the notice rather than starting a fake OAuth /
                WebAuthn flow. Replace with the real handlers once one exists. */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setNotice(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-xs transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
              >
                <GoogleMark className="h-[1.125rem] w-[1.125rem]" />
                Google
              </button>
              <button
                type="button"
                onClick={() => setNotice(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-xs transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
              >
                <Fingerprint
                  className="h-[1.125rem] w-[1.125rem] text-brand-600"
                  strokeWidth={2}
                />
                Passkey
              </button>
            </div>

            {notice ? (
              <div
                role="status"
                className="mt-5 flex gap-2.5 rounded-xl border border-brand-100 bg-brand-50/70 p-4 text-sm leading-relaxed text-brand-900"
              >
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span>
                  Customer accounts are not open yet, so there is nothing to
                  sign in to. Nothing you typed was sent anywhere. Book a demo
                  and we will set your shop up directly.
                </span>
              </div>
            ) : null}

            <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
              No account yet?{' '}
              <Link
                href="/signup"
                className="font-semibold text-brand-700 hover:text-brand-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
