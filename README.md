# NewsFlow - Personalized News Feed

A modern news application built with Next.js 15, Convex, and Tailwind CSS that provides personalized news feeds based on user interests.

## Features

- 🔐 Authentication with Convex Auth
- 📰 Personalized news feed based on user interests
- 🔍 Search and filter functionality
- 👤 User profile management
- 📧 Email digest subscriptions
- 🎨 Modern UI with Tailwind CSS
- ⚡ Real-time updates with Convex

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Backend**: Convex (Database + Backend)
- **Authentication**: Convex Auth
- **Styling**: Tailwind CSS
- **Email**: Resend
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Convex account

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd newsletters-convex-resend
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
```

4. Set up Convex:

```bash
npx convex dev
```

5. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Navigation component
│   ├── NewsCard.tsx       # News article card
│   ├── NewsFeed.tsx       # News feed component
│   ├── OnboardingFlow.tsx # User onboarding
│   ├── ProfileSettings.tsx # User profile settings
│   └── SearchAndFilter.tsx # Search and filter
├── convex/               # Convex backend
│   ├── auth.config.ts    # Authentication config
│   ├── schema.ts         # Database schema
│   ├── news.ts           # News-related functions
│   └── subscribers.ts    # Subscriber management
├── lib/                  # Utility functions
│   └── utils.ts          # Common utilities
├── public/               # Static assets
└── SignInForm.tsx        # Authentication form
```

## Key Features

### Authentication

- Email/password authentication
- Anonymous sign-in option
- Secure session management

### News Feed

- Personalized content based on user interests
- Real-time updates
- Search and filtering capabilities
- Infinite scroll pagination

### User Management

- Topic subscription management
- Email digest preferences
- Profile settings

## Development

### Running in Development Mode

```bash
pnpm dev
```

### Building for Production

```bash
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

## Deployment

The application can be deployed to Vercel with the following steps:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
