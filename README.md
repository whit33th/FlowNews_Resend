# FlowNews

FlowNews is a modern news aggregation platform built with cutting-edge technologies to provide a seamless user experience.

## Key Technologies

### Convex

FlowNews leverages [Convex](https://www.convex.dev/) as its backend solution, providing real-time data synchronization and state management. Convex allows for automatic data updates and simplified backend development.

### Resend

[Resend](https://resend.com/) powers all email functionality in FlowNews, enabling reliable delivery of newsletters, notifications, and user communications with detailed analytics and high deliverability rates.

### Component Library

The project utilizes a robust component library built with:

- React for UI components
- Tailwind CSS for styling

## Email Notifications

The application sends the following types of emails:

- Welcome emails for new user registration
- Daily news digest customized by user preferences
- Breaking news alerts for important stories
- Comment notifications when users receive replies
- Weekly newsletter summarizing trending topics
- Account activity notifications for security
- Achievement and milestone emails

## Pages & Features

### Content Management

- Post creation and editing with rich text formatting
- Post deletion with confirmation
- Topic/category creation and management
- Media embedding (images, videos, links)

### User Management

- User profile creation and customization
- Profile picture and bio updates
- Email preference settings
- Account deletion
- Password reset functionality

### Interaction

- Commenting system with threading
- Like/save functionality for posts
- Share options for social media platforms
- Follow topics or other users

## Live Demo

Visit the live version: [FlowNews Web](https://flow-news-resend.vercel.app)

## Getting Started

### Prerequisites

- Node.js 16+
- pnpm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/FlowNews_Resend.git

# Install dependencies
cd FlowNews_Resend
pnpm install

# Set up environment variables
cp .env.example .env
```

### Development

```bash
# Start the development server
pnpm dev
```

## Features

- Real-time news updates
- Personalized news feeds
- Email newsletters
- Cross-device synchronization
- Bookmark and save articles for later reading

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
