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
  Html,
  Body,
  Img,
} from "@react-email/components";

interface NewsItem {
  _id: string;
  title: string;
  text: string;
  summary?: string;
  topics: string[];
  author?: string;
  views: number;
  averageRating?: number;
  totalRatings?: number;
  isPremium?: boolean;
  image?: string;
  _creationTime: number;
}

interface SharedArticleEmailProps {
  recipientEmail: string;
  sharedByUser: string;
  sharedByEmail?: string;
  newsItem: NewsItem;
  baseUrl?: string;
}

export const SharedArticleEmail = ({
  recipientEmail,
  sharedByUser,
  sharedByEmail,
  newsItem,
  baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
}: SharedArticleEmailProps) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleDate = new Date(newsItem._creationTime).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const truncatedText =
    newsItem.text.length > 600
      ? newsItem.text.substring(0, 600) + "..."
      : newsItem.text;

  const articleUrl = `${baseUrl}/news/${newsItem._id}`;

  return (
    <Html>
      <Head />
      <Preview>
        {sharedByUser} shared an article with you: {newsItem.title}
      </Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              fontFamily: {
                serif: ["Georgia", "Times New Roman", "Times", "serif"],
                sans: ["Arial", "Helvetica", "sans-serif"],
              },
              colors: {
                newspaper: {
                  black: "#000000",
                  gray: "#666666",
                  lightGray: "#cccccc",
                  silver: "#888888",
                  light: "#f5f5f5",
                  cream: "#ffffff",
                  accent: "#000000",
                },
              },
            },
          },
        }}
      >
        <Body className="bg-newspaper-light font-serif">
          <Container
            className="mx-auto max-w-[700px] bg-white border-[3px] border-black"
            style={{
              margin: "0 auto",
              border: "3px solid #000000",
            }}
          >
            <Section
              className="bg-newspaper-black text-white p-6 border-b-[2px] border-black"
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                borderBottom: "2px solid #000000",
              }}
            >
              <div className="text-center">
                <Heading
                  className="text-3xl font-bold font-serif m-0 mb-2"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "28px",
                    fontWeight: "bold",
                    margin: "0 0 8px 0",
                    letterSpacing: "1px",
                  }}
                >
                  ★ SHARED ARTICLE ★
                </Heading>
                <Text
                  className="text-newspaper-lightGray text-sm mb-0"
                  style={{
                    color: "#cccccc",
                    fontSize: "12px",
                    margin: "0",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {currentDate}
                </Text>
              </div>
            </Section>

            <Section
              className="bg-newspaper-light border-b-[1px] border-newspaper-lightGray p-4"
              style={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid #cccccc",
                padding: "16px",
              }}
            >
              <Text
                className="text-newspaper-black text-center font-serif m-0"
                style={{
                  color: "#000000",
                  fontFamily: "Georgia, serif",
                  fontSize: "16px",
                  textAlign: "center",
                  margin: "0",
                  fontWeight: "bold",
                }}
              >
                📧 <strong>{sharedByUser}</strong> thought you might find this
                article interesting
                {sharedByEmail && (
                  <span
                    className="text-newspaper-gray block text-sm mt-1"
                    style={{
                      color: "#666666",
                      display: "block",
                      fontSize: "14px",
                      marginTop: "4px",
                      fontWeight: "normal",
                    }}
                  >
                    ({sharedByEmail})
                  </span>
                )}
              </Text>
            </Section>

            <Section
              className="bg-white p-6 border-b-[1px] border-newspaper-lightGray"
              style={{
                backgroundColor: "#ffffff",
                padding: "24px",
                borderBottom: "1px solid #cccccc",
              }}
            >
              {newsItem.isPremium && (
                <div
                  className="inline-block bg-newspaper-black text-white border-[2px] border-black px-3 py-1 mb-4"
                  style={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    border: "2px solid #000000",
                    padding: "4px 12px",
                    marginBottom: "16px",
                    display: "inline-block",
                  }}
                >
                  <Text
                    className="text-xs font-bold font-serif m-0"
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      fontFamily: "Georgia, serif",
                      margin: "0",
                      letterSpacing: "1px",
                    }}
                  >
                    ★ PREMIUM CONTENT ★
                  </Text>
                </div>
              )}

              <Heading
                className="text-2xl font-bold font-serif text-newspaper-black mb-4 leading-tight border-b-[3px] border-black pb-2"
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#000000",
                  marginBottom: "16px",
                  lineHeight: "1.2",
                  borderBottom: "3px solid #000000",
                  paddingBottom: "8px",
                  letterSpacing: "0.5px",
                }}
              >
                {newsItem.title}
              </Heading>

              <div
                className="border-[1px] border-newspaper-lightGray bg-newspaper-light p-3 mb-4"
                style={{
                  border: "1px solid #cccccc",
                  backgroundColor: "#f5f5f5",
                  padding: "12px",
                  marginBottom: "16px",
                }}
              >
                <div className="flex flex-wrap gap-4 text-sm text-newspaper-gray">
                  <Text
                    className="m-0 font-serif"
                    style={{
                      margin: "0",
                      fontFamily: "Georgia, serif",
                      fontSize: "12px",
                      color: "#666666",
                    }}
                  >
                    📅 {articleDate}
                  </Text>
                  {newsItem.author && (
                    <Text
                      className="m-0 font-serif"
                      style={{
                        margin: "0",
                        fontFamily: "Georgia, serif",
                        fontSize: "12px",
                        color: "#666666",
                      }}
                    >
                      ✍️ {newsItem.author}
                    </Text>
                  )}
                  <Text
                    className="m-0 font-serif"
                    style={{
                      margin: "0",
                      fontFamily: "Georgia, serif",
                      fontSize: "12px",
                      color: "#666666",
                    }}
                  >
                    👁️ {newsItem.views} views
                  </Text>
                  {newsItem.averageRating && (
                    <Text
                      className="m-0 font-serif"
                      style={{
                        margin: "0",
                        fontFamily: "Georgia, serif",
                        fontSize: "12px",
                        color: "#666666",
                      }}
                    >
                      ⭐ {newsItem.averageRating.toFixed(1)} (
                      {newsItem.totalRatings || 0} ratings)
                    </Text>
                  )}
                </div>
              </div>

              {newsItem.topics && newsItem.topics.length > 0 && (
                <div className="mb-4">
                  {newsItem.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="inline-block bg-newspaper-black text-white text-xs font-bold font-serif px-3 py-1 mr-2 mb-2 border-[1px] border-black"
                      style={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        fontSize: "10px",
                        fontWeight: "bold",
                        fontFamily: "Georgia, serif",
                        padding: "4px 12px",
                        marginRight: "8px",
                        marginBottom: "8px",
                        border: "1px solid #000000",
                        display: "inline-block",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {topic.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}

              {newsItem.image && (
                <div
                  className="mb-4 border-[2px] border-black"
                  style={{
                    marginBottom: "16px",
                    border: "2px solid #000000",
                  }}
                >
                  <Img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-48 object-cover"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      filter: "grayscale(100%)",
                    }}
                  />
                </div>
              )}

              {newsItem.summary && (
                <Section
                  className="bg-newspaper-light border-[1px] border-newspaper-lightGray p-4 mb-4"
                  style={{
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #cccccc",
                    padding: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <Heading
                    className="text-lg font-bold font-serif text-newspaper-black mb-2 border-b-[1px] border-black pb-1"
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#000000",
                      marginBottom: "8px",
                      borderBottom: "1px solid #000000",
                      paddingBottom: "4px",
                    }}
                  >
                    SUMMARY
                  </Heading>
                  <Text
                    className="text-newspaper-black leading-relaxed font-serif m-0"
                    style={{
                      color: "#000000",
                      lineHeight: "1.6",
                      fontFamily: "Georgia, serif",
                      fontSize: "14px",
                      margin: "0",
                    }}
                  >
                    {newsItem.summary}
                  </Text>
                </Section>
              )}

              <Section className="mb-6">
                <Text
                  className="text-newspaper-black leading-relaxed font-serif text-base"
                  style={{
                    color: "#000000",
                    lineHeight: "1.7",
                    fontFamily: "Georgia, serif",
                    fontSize: "15px",
                    textAlign: "justify",
                  }}
                >
                  {truncatedText}
                </Text>
                {newsItem.text.length > 600 && (
                  <Text
                    className="text-newspaper-gray font-serif text-sm mt-2 m-0 italic"
                    style={{
                      color: "#666666",
                      fontFamily: "Georgia, serif",
                      fontSize: "12px",
                      marginTop: "8px",
                      margin: "0",
                      fontStyle: "italic",
                    }}
                  >
                    [Content preview truncated... Click to read full article]
                  </Text>
                )}
              </Section>

              <Section className="text-center">
                <Button
                  href={articleUrl}
                  className="bg-newspaper-black text-white font-bold font-serif py-3 px-8 border-[2px] border-black text-base"
                  style={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontFamily: "Georgia, serif",
                    padding: "12px 32px",
                    border: "2px solid #000000",
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "inline-block",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  ★ READ FULL ARTICLE ★
                </Button>
              </Section>
            </Section>

            <Section
              className="bg-newspaper-black text-white p-6"
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "24px",
              }}
            >
              <Text
                className="text-center font-serif m-0"
                style={{
                  textAlign: "center",
                  fontFamily: "Georgia, serif",
                  fontSize: "14px",
                  margin: "0",
                  lineHeight: "1.5",
                }}
              >
                This article was shared with you by{" "}
                <strong>{sharedByUser}</strong>
                <br />
                <Link
                  href={articleUrl}
                  className="text-newspaper-lightGray"
                  style={{
                    color: "#cccccc",
                    textDecoration: "underline",
                  }}
                >
                  → View Original Article ←
                </Link>
              </Text>

              <div
                className="border-t-[1px] border-newspaper-gray mt-4 pt-4"
                style={{
                  borderTop: "1px solid #666666",
                  marginTop: "16px",
                  paddingTop: "16px",
                }}
              >
                <Text
                  className="text-center font-serif text-xs m-0"
                  style={{
                    textAlign: "center",
                    fontFamily: "Georgia, serif",
                    fontSize: "11px",
                    margin: "0",
                    color: "#cccccc",
                    letterSpacing: "0.5px",
                  }}
                >
                  ★ NEWSLETTER PLATFORM ★
                  <br />
                  {currentDate.toUpperCase()}
                  <br />
                  <Link
                    href={baseUrl}
                    className="text-newspaper-lightGray"
                    style={{
                      color: "#cccccc",
                      textDecoration: "underline",
                    }}
                  >
                    Visit Our Website
                  </Link>
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
