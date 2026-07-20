import type { Metadata } from 'next';
import { BasicPage } from '@/components/layout/BasicPage';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Mango builds the AI front office for home service businesses, so no call goes unanswered.',
};

export default function AboutPage() {
  return (
    <BasicPage
      eyebrow="About"
      title="Built for the people who answer the phone."
      description="Mango is the AI front office for home service businesses."
    >
      <p>
        Every trade business loses work the same way: the phone rings while
        everyone is already on a job, and the caller dials the next name on the
        list. It is not a marketing problem or a pricing problem. It is a
        capacity problem at the exact moment a customer is ready to buy.
      </p>
      <p>
        Mango answers every call the way your best office manager would. It
        qualifies the lead, follows your emergency protocols, books the job into
        your calendar, and follows up afterwards. It works nights, weekends, and
        the middle of a busy Tuesday.
      </p>
      <p>
        We are a small team, and we would rather talk to you than sell to you.
        Book a demo and we will run a real call through it for your trade.
      </p>
    </BasicPage>
  );
}
