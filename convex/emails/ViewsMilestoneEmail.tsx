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

interface ViewsMilestoneEmailProps {
  authorName?: string;
  authorEmail: string;
  newsTitle: string;
  newsId: string;
  views: number;
}

export const ViewsMilestoneEmail = ({
  authorName = "Author",
  authorEmail,
  newsTitle,
  newsId,
  views,
}: ViewsMilestoneEmailProps) => {
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
              green: {
                500: "#10b981",
                600: "#059669",
              },
            },
          },
        },
      }}
    >
      <Head />
      <Preview>{`🎉 Your article "${newsTitle}" has reached ${views} views!`}</Preview>

      <Container className="mx-auto my-0 px-5 py-12 max-w-2xl">
        {}
        <Section className="bg-black text-white py-8 px-6 mb-8">
          <Heading className="text-3xl font-bold text-center m-0">
            🎉 Milestone Reached!
          </Heading>
          <Text className="text-xl text-center mt-2 mb-0">
            {views} Views & Counting
          </Text>
        </Section>

        {}
        <Section className="bg-white p-6 border border-neutral-200">
          <Text className="text-lg text-neutral-700 leading-relaxed mb-4">
            Hi {authorName},
          </Text>

          <Text className="text-lg text-neutral-700 leading-relaxed mb-6">
            Congratulations! Your article has just reached an important
            milestone. People are reading and engaging with your content!
          </Text>

          {}
          <Section className="bg-neutral-100 p-6 rounded mb-6 text-center">
            <Heading className="text-4xl font-bold text-black mb-2">
              {views}
            </Heading>
            <Text className="text-lg font-semibold text-neutral-700 mb-4">
              Total Views
            </Text>
            <Text className="text-sm text-neutral-600">
              Milestone reached on {currentDate}
            </Text>
          </Section>

          {}
          <Section className="border border-neutral-200 p-4 rounded mb-6">
            <Text className="text-sm font-semibold text-neutral-600 uppercase tracking-wide mb-2">
              Your Article
            </Text>
            <Heading className="text-xl font-bold text-black mb-2 leading-tight">
              {newsTitle}
            </Heading>
          </Section>

          <Text className="text-neutral-700 leading-relaxed mb-6">
            This is just the beginning! Keep creating great content, and you'll
            see even more engagement. Your readers appreciate quality content
            like yours.
          </Text>

          {}
          <Section className="text-center my-8">
            <Button
              href={`${
                process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
              }/news/${newsId}`}
              className="bg-black text-white px-8 py-4 rounded font-semibold text-lg no-underline inline-block"
            >
              View Article Analytics
            </Button>
          </Section>

          {}
          <Section className="border-t border-neutral-200 pt-6">
            <Heading className="text-lg font-bold text-black mb-4">
              🚀 What's Next?
            </Heading>
            <Text className="text-neutral-700 leading-relaxed mb-4">
              Here are some ways to keep the momentum going:
            </Text>
            <ul className="text-neutral-700 leading-relaxed">
              <li className="mb-2">
                • Respond to reader comments and feedback
              </li>
              <li className="mb-2">
                • Share your article on social media platforms
              </li>
              <li className="mb-2">
                • Write a follow-up article on related topics
              </li>
              <li>• Engage with other authors in your topic areas</li>
            </ul>
          </Section>

          {}
          <Section className="text-center bg-neutral-100 p-6 rounded mt-6">
            <Text className="text-2xl mb-2">🏆</Text>
            <Text className="font-bold text-neutral-700">
              Achievement Unlocked: {views} Views Milestone
            </Text>
          </Section>
        </Section>

        {}
        <Section className="text-center mt-8">
          <Text className="text-sm text-neutral-600 mb-4">
            Keep up the excellent work! We can't wait to see what you write
            next.
          </Text>

          <Text className="text-xs text-neutral-600">
            This email was sent to {authorEmail} because your article reached{" "}
            {views} views.
          </Text>

          <Link
            href={`${
              process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
            }/profile`}
            className="text-xs text-neutral-600 underline"
          >
            View your profile
          </Link>
        </Section>
      </Container>
    </Tailwind>
  );
};

export default ViewsMilestoneEmail;
