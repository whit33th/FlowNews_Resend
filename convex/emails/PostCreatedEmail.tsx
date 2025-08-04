import {
  Button,
  Container,
  Heading,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  pixelBasedPreset,
  Head,
} from "@react-email/components";

interface PostCreatedEmailProps {
  authorName?: string;
  authorEmail: string;
  newsTitle: string;
  newsId: string;
  baseUrl?: string;
}

export const PostCreatedEmail = ({
  authorName = "Author",
  authorEmail,
  newsTitle,
  newsId,
  baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
}: PostCreatedEmailProps) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: {
              black: "#000000",
              neutral: {
                100: "#f5f5f5",
                200: "#e5e5e5",
                600: "#525252",
                700: "#404040",
                800: "#262626",
              },
            },
          },
        },
      }}
    >
      <Head />
      <Preview>
        Your article "{newsTitle}" has been published successfully!
      </Preview>

      <Container className="mx-auto my-0 px-5 py-12 max-w-2xl">
        {}
        <Section className="bg-black text-white py-8 px-6 mb-8">
          <Heading className="text-3xl font-bold text-center m-0">
            🎉 Article Published!
          </Heading>
        </Section>

        {}
        <Section className="bg-white p-6 border border-neutral-200">
          <Text className="text-lg text-neutral-700 leading-relaxed mb-4">
            Hi {authorName},
          </Text>

          <Text className="text-lg text-neutral-700 leading-relaxed mb-6">
            Great news! Your article has been successfully published and is now
            live on our platform.
          </Text>

          {}
          <Section className="bg-neutral-100 p-4 rounded mb-6">
            <Text className="text-sm font-semibold text-neutral-600 uppercase tracking-wide mb-2">
              Published Article
            </Text>
            <Heading className="text-xl font-bold text-black mb-2 leading-tight">
              {newsTitle}
            </Heading>
            <Text className="text-sm text-neutral-600">
              Published on {currentDate}
            </Text>
          </Section>

          <Text className="text-neutral-700 leading-relaxed mb-6">
            Your article is now available to all our readers. We'll notify you
            when it reaches important milestones like 10 views, 50 views, and
            more!
          </Text>

          {}
          <Section className="text-center my-8">
            <Button
              href={`${baseUrl}/news/${newsId}`}
              className="bg-black text-white px-8 py-4 rounded font-semibold text-lg no-underline inline-block"
            >
              View Your Article
            </Button>
          </Section>

          {}
          <Section className="border-t border-neutral-200 pt-6">
            <Heading className="text-lg font-bold text-black mb-4">
              📈 Tips to Boost Engagement
            </Heading>
            <ul className="text-neutral-700 leading-relaxed">
              <li className="mb-2">• Share your article on social media</li>
              <li className="mb-2">• Engage with readers who comment</li>
              <li className="mb-2">
                • Write more articles to build your audience
              </li>
              <li>• Use relevant topics and mentions to reach more readers</li>
            </ul>
          </Section>
        </Section>

        {}
        <Section className="text-center mt-8">
          <Text className="text-sm text-neutral-600 mb-4">
            Keep writing amazing content! Your readers are waiting for your next
            article.
          </Text>

          <Text className="text-xs text-neutral-600">
            This email was sent to {authorEmail} because you published an
            article on our platform.
          </Text>

          <Link
            href={`${baseUrl}/profile`}
            className="text-xs text-neutral-600 underline"
          >
            Manage your account
          </Link>
        </Section>
      </Container>
    </Tailwind>
  );
};

export default PostCreatedEmail;
