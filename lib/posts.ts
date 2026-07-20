export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  /** Body paragraphs. Swap this for MDX or a CMS when there is one. */
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: 'what-a-missed-call-actually-costs',
    title: 'What a missed call actually costs a home service business',
    excerpt:
      'Most shops track marketing spend to the dollar and never measure the calls that ring out. Here is how to put a number on it.',
    category: 'Running the business',
    date: '2026-07-14',
    readingTime: '5 min read',
    author: 'The Mango team',
    body: [
      'Every trade business has a number it does not track: the calls nobody picked up. Marketing spend gets measured to the dollar, van wraps get argued over, and meanwhile the phone rings at 6:40pm and goes to voicemail.',
      'The math is simpler than most owners expect. Take your average job value, multiply by the share of first-time callers who book, and multiply that by the calls you miss in a month. For a lot of shops that lands somewhere between one and four jobs a week walking straight to a competitor.',
      'The part that stings is that missed calls are not evenly distributed. They cluster in exactly the moments when the caller has an emergency and the least patience: evenings, weekends, and the middle of a job when your hands are full.',
      'Emergency callers rarely leave a voicemail. They hang up and dial the next result. That is why a missed call is not a delayed job, it is a lost one, and usually a lost customer for every job after it too.',
      'Start by counting. Pull your call log for last month and count the unanswered inbound calls. Most owners are surprised, and the number alone usually makes the decision about what to do next fairly obvious.',
    ],
  },
  {
    slug: 'after-hours-calls-without-hiring',
    title: 'How to cover after-hours calls without hiring anyone',
    excerpt:
      'Answering services, call forwarding, rotating on-call phones, and AI reception. What each one actually costs and where each one breaks.',
    category: 'Operations',
    date: '2026-07-02',
    readingTime: '6 min read',
    author: 'The Mango team',
    body: [
      'There are four common ways to cover the phone after 5pm, and each one trades money for reliability in a different way.',
      'Rotating the on-call phone between techs is free and it is what most shops start with. It also burns out your best people, produces wildly inconsistent intake, and means the person answering is often driving or asleep.',
      'Call forwarding to your mobile keeps you in control and costs nothing. It also means you are never actually off, and you will still miss calls when you are under a sink or on another line.',
      'A traditional answering service gets a human on the phone, but they are working from a script for a dozen different businesses. They take a message. They do not know your pricing, your service area, or whether a burst pipe outranks a dripping tap.',
      'AI reception sits in the fourth slot: it answers on the first ring every time, follows your protocols, and books into your calendar. The tradeoff is that it is software, so it is only as good as the setup you give it.',
      'Whichever you pick, the test is the same. Call your own number at 9pm on a Saturday and see what happens. That is what your customers are getting.',
    ],
  },
  {
    slug: 'questions-to-ask-on-every-emergency-call',
    title: 'The seven questions to ask on every emergency call',
    excerpt:
      'A short intake script that gets your tech to the right address, with the right parts, without a second trip.',
    category: 'On the tools',
    date: '2026-06-19',
    readingTime: '4 min read',
    author: 'The Mango team',
    body: [
      'Second trips kill margin. Most of them trace back to something nobody asked on the first call.',
      'Ask where the problem is, and get the full service address including unit or gate codes. Ask what is happening right now, in the caller’s own words, before offering any diagnosis.',
      'Ask when it started. A heater that has been out for three days is a different job from one that failed an hour ago, and it changes how you schedule.',
      'Ask for the make and model if there is equipment involved. A photo of the label texted over takes the caller thirty seconds and saves your tech a trip to the supplier.',
      'Ask whether anything has been shut off already. Ask who will be on site and how to reach them. Ask whether there is anything the tech should know before arriving, which is where you find out about the dog, the locked side gate, and the elderly parent upstairs.',
      'Seven questions, about ninety seconds. Written down and asked the same way every time, they are worth more than most software.',
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  // Format in UTC. A bare 'YYYY-MM-DD' is parsed as midnight UTC, so
  // formatting it in a behind-UTC timezone would render the previous day.
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
