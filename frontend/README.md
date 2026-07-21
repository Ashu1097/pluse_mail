This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Connecting a real Gmail account

The app now signs in with real Google OAuth and reads live inbox data
through the Gmail API (`/api/gmail/messages`), instead of mock data.
To run it, you need your own Google OAuth credentials:

1. **Create a Google Cloud project** at https://console.cloud.google.com/.
2. **Enable the Gmail API**: APIs & Services → Library → search "Gmail API" → Enable.
3. **Configure the OAuth consent screen** (APIs & Services → OAuth consent screen):
   - User type: External (or Internal if you're on Workspace).
   - Add your own Google account under "Test users" while the app is unpublished
     (Google restricts unverified apps to test users only).
   - Scope: add `.../auth/gmail.readonly`.
4. **Create an OAuth client ID** (APIs & Services → Credentials → Create Credentials → OAuth client ID):
   - Application type: Web application.
   - Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
     (swap the host for your deployed domain in production).
   - Copy the generated Client ID and Client Secret.
5. **Set up your environment**: copy `.env.local.example` to `.env.local` and fill in
   `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `NEXTAUTH_SECRET`
   (generate one with `openssl rand -base64 32`).
6. `npm install && npm run dev`, then click **Continue with Google** on `/login`.
   Google will warn that the app is unverified — that's expected until you submit
   it for verification; click through as the test user you added in step 3.

### What's real vs. still mocked

- **Real**: Google OAuth sign-in/sign-out, session handling, and the actual list
  of your Gmail inbox messages, subjects, senders, snippets, dates, unread
  state, and attachments (`src/lib/gmail.ts`, `src/app/api/gmail/**`).
- **Not yet real**: the product spec's AI processing pipeline (Gemini
  summarization, action-item/date/meeting extraction, embeddings + vector
  search for chat, daily digest generation). Category, priority, and chat
  answers are currently simple heuristics/keyword matching over the live
  data as a stand-in — replace `guessCategory`/`guessPriority` in
  `src/lib/gmail.ts` and `sendMessage` in `src/services/chat.ts` once a real
  LLM backend exists.
