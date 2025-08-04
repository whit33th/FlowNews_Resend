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

interface NewsItem {
  _id: string;
  title: string;
  summary?: string;
  topics: string[];
  author?: string;
  views: number;
  averageRating?: number;
  totalRatings?: number;
}

interface WeeklyDigestEmailProps {
  userName?: string;
  userEmail: string;
  newsItems: NewsItem[];
}

export const WeeklyDigestEmail = ({
  userName = "Dear Reader",
  userEmail,
  newsItems,
}: WeeklyDigestEmailProps) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const nextWeekDate = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
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
      <Head />
      <Container
        className="mx-auto max-w-[700px] bg-white border-[3px] border-black"
        style={{
          margin: "0 auto",
          border: "3px solid #000000",
        }}
      >
        {}
        <Section
          className="bg-black text-white text-center"
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          <div style={{ padding: "30px 20px" }}>
            <Text
              className="text-4xl font-bold mb-2"
              style={{
                fontSize: "32px",
                lineHeight: "24px",
                fontWeight: "bold",
                margin: "0",
                letterSpacing: "3px",
                color: "#ffffff",
                marginTop: "30px",
                marginBottom: "30px",
                marginLeft: "0",
                marginRight: "0",
              }}
            >
              THE WEEKLY HERALD
            </Text>
            <Text
              className="text-base mb-2"
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                margin: "10px 0",
                color: "#ffffff",
                marginTop: "10px",
                marginRight: "0",
                marginBottom: "10px",
                marginLeft: "0",
              }}
            >
              ═══════════════════════════════════════
            </Text>
            <Text
              className="text-base mb-1 italic"
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                margin: "10px 0 5px 0",
                color: "#cccccc",
                fontStyle: "italic",
                marginTop: "10px",
                marginRight: "0",
                marginBottom: "5px",
                marginLeft: "0",
              }}
            >
              {currentDate}
            </Text>
            <Text
              className="text-sm"
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                margin: "5px 0 0 0",
                color: "#cccccc",
                letterSpacing: "2px",
                marginTop: "10px",
                marginRight: "0",
                marginBottom: "10px",
                marginLeft: "0",
              }}
            >
              WEEKLY DIGEST EDITION
            </Text>
          </div>
        </Section>

        {}
        <Section
          className="text-center border-b-[3px] border-black"
          style={{
            textAlign: "center",
            borderBottom: "3px solid #000000",
          }}
        >
          <div style={{ padding: "40px 20px 30px 20px" }}>
            <Heading
              className="text-3xl font-bold mb-4"
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                margin: "0 0 15px 0",
                color: "#000000",
                lineHeight: "1.2",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              PERSONALIZED NEWS DIGEST
              <br />
              FOR {userName.toUpperCase()}
            </Heading>
            <Text
              className="text-sm italic"
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                color: "#666666",
                margin: "0",
                fontStyle: "italic",
                marginTop: "0",
                marginBottom: "0",
                marginLeft: "0",
                marginRight: "0",
              }}
            >
              Curated by FlowNews Editorial Team
            </Text>
          </div>
        </Section>

        {}
        <Section
          className="bg-gray-100 border-b border-gray-300"
          style={{
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #cccccc",
          }}
        >
          <div style={{ padding: "35px 30px" }}>
            <Text
              className="text-base"
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#000000",
                margin: "0",
                textAlign: "justify",
                marginTop: "0",
                marginBottom: "0",
                marginLeft: "0",
                marginRight: "0",
              }}
            >
              Dear {userName}, welcome to this week's carefully curated
              selection of news stories. Our editorial team has selected these{" "}
              {newsItems.length} articles based on your reading preferences and
              current events that matter most to informed citizens like
              yourself.
            </Text>
          </div>
        </Section>

        {}
        {newsItems.map((news, index) => (
          <Section
            key={news._id}
            className="border-b border-gray-300"
            style={{
              borderBottom: "1px solid #cccccc",
            }}
          >
            <div style={{ padding: "40px 30px" }}>
              {}
              <Text
                className="text-xs font-bold mb-3"
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#666666",
                  margin: "0 0 10px 0",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                STORY #{String(index + 1).padStart(2, "0")}
              </Text>

              {}
              <Heading
                className="text-2xl font-bold mb-4"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: "0 0 15px 0",
                  color: "#000000",
                  lineHeight: "1.3",
                }}
              >
                {news.title}
              </Heading>

              {}
              <Section
                className="my-4 py-3 border-t border-b border-gray-200"
                style={{
                  margin: "15px 0",
                  padding: "10px 0",
                  borderTop: "1px solid #eeeeee",
                  borderBottom: "1px solid #eeeeee",
                }}
              >
                <Text
                  className="text-xs mr-4"
                  style={{
                    fontSize: "12px",
                    color: "#666666",
                    margin: "0 15px 0 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  By: {news.author || "Staff Writer"}
                </Text>
                <Text
                  className="text-xs"
                  style={{
                    fontSize: "12px",
                    color: "#666666",
                    margin: "0 15px 0 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Views: {news.views}
                </Text>
              </Section>

              {}
              <Text
                className="text-base mb-4"
                style={{
                  fontSize: "16px",
                  lineHeight: "1.6",
                  color: "#000000",
                  margin: "15px 0",
                  textAlign: "justify",
                  marginTop: "15px",
                  marginRight: "0",
                  marginBottom: "15px",
                  marginLeft: "0",
                }}
              >
                {news.summary ||
                  "Comprehensive analysis of current events and their implications for informed citizens."}
              </Text>

              {}
              <Section
                className="my-4 bg-gray-50 border border-gray-300"
                style={{
                  margin: "15px 0",
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #dddddd",
                }}
              >
                <div style={{ padding: "15px" }}>
                  <Text
                    className="text-xs font-bold mb-1"
                    style={{
                      fontSize: "12px",
                      lineHeight: "24px",
                      fontWeight: "bold",
                      color: "#000000",
                      margin: "0 0 5px 0",
                      letterSpacing: "1px",
                      marginTop: "0",
                      marginRight: "0",
                      marginBottom: "5px",
                      marginLeft: "0",
                    }}
                  >
                    COVERAGE:
                  </Text>
                  <Text
                    className="text-xs"
                    style={{
                      fontSize: "12px",
                      lineHeight: "24px",
                      color: "#666666",
                      margin: "0",
                      letterSpacing: "0.5px",
                      marginTop: "0",
                      marginBottom: "0",
                      marginLeft: "0",
                      marginRight: "0",
                    }}
                  >
                    {news.topics.join(", ").toUpperCase()}
                  </Text>
                </div>
              </Section>

              {}
              <Section
                className="text-center my-5"
                style={{
                  textAlign: "center",
                  margin: "20px 0",
                }}
              >
                <Button
                  href={`https://yournewssite.com/article/${news._id}`}
                  className="bg-black text-white px-6 py-3 font-bold uppercase text-sm border-2 border-black"
                  style={{
                    lineHeight: "100%",
                    textDecoration: "none",
                    display: "inline-block",
                    maxWidth: "100%",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    border: "2px solid #000000",
                    borderRadius: "0",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "12px 25px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    paddingTop: "12px",
                    paddingRight: "25px",
                    paddingBottom: "12px",
                    paddingLeft: "25px",
                  }}
                >
                  READ FULL STORY →
                </Button>
              </Section>

              {}
              {index < newsItems.length - 1 && (
                <Section
                  className="text-center my-8"
                  style={{
                    textAlign: "center",
                    margin: "30px 0",
                  }}
                >
                  <Text
                    className="text-base"
                    style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#cccccc",
                      margin: "0",
                      letterSpacing: "2px",
                      marginTop: "0",
                      marginBottom: "0",
                      marginLeft: "0",
                      marginRight: "0",
                    }}
                  >
                    • • • • • • • • • • • • • • • • • • • • •
                  </Text>
                </Section>
              )}
            </div>
          </Section>
        ))}

        {}
        <Section
          className="bg-gray-100 border-t-2 border-black"
          style={{
            backgroundColor: "#f5f5f5",
            borderTop: "2px solid #000000",
          }}
        >
          <div style={{ padding: "40px 30px" }}>
            <Section
              className="border border-black bg-white"
              style={{
                border: "1px solid #000000",
                backgroundColor: "#ffffff",
              }}
            >
              <div style={{ padding: "20px" }}>
                <Text
                  className="text-base font-bold mb-4 text-center uppercase"
                  style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: "bold",
                    margin: "0 0 15px 0",
                    color: "#000000",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    textAlign: "center",
                    marginTop: "0",
                    marginRight: "0",
                    marginBottom: "15px",
                    marginLeft: "0",
                  }}
                >
                  EDITOR'S NOTE
                </Text>
                <Text
                  className="text-sm mb-4"
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.5",
                    color: "#000000",
                    margin: "0 0 15px 0",
                    textAlign: "justify",
                    marginTop: "0",
                    marginRight: "0",
                    marginBottom: "15px",
                    marginLeft: "0",
                  }}
                >
                  This digest contains {newsItems.length} carefully selected
                  stories from our newsroom. We believe these articles provide
                  essential insights into current events and trends that shape
                  our world. Stay informed, stay engaged.
                </Text>
                <Text
                  className="text-sm italic text-right"
                  style={{
                    fontSize: "14px",
                    lineHeight: "24px",
                    color: "#666666",
                    margin: "0",
                    textAlign: "right",
                    fontStyle: "italic",
                    marginTop: "0",
                    marginBottom: "0",
                    marginLeft: "0",
                    marginRight: "0",
                  }}
                >
                  — The Editorial Board
                </Text>
              </div>
            </Section>
          </div>
        </Section>

        {}
        <Section
          className="p-5 text-center bg-black text-white"
          style={{
            padding: "30px 20px",
            textAlign: "center",
            backgroundColor: "#000000",
            color: "#ffffff",
          }}
        >
          <Text
            className="text-xs mb-4"
            style={{
              fontSize: "12px",
              lineHeight: "1.4",
              color: "#cccccc",
              margin: "0 0 15px 0",
              marginTop: "20px",
              marginRight: "0",
              marginBottom: "20px",
              marginLeft: "0",
            }}
          >
            The Weekly Herald • Published Weekly • Delivered to{" "}
            <Link
              href={`mailto:${userEmail}`}
              className="text-ccccc underline"
              style={{ color: "#cccccc", textDecoration: "underline" }}
            >
              {userEmail}
            </Link>
            <br />
            Next Edition: {nextWeekDate}
          </Text>
          <Link
            href={`mailto:unsubscribe@yournewssite.com?subject=Unsubscribe ${userEmail}`}
            className="text-xs underline uppercase"
            style={{
              color: "#cccccc",
              textDecoration: "underline",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            UNSUBSCRIBE
          </Link>
        </Section>
      </Container>
    </Tailwind>
  );
};
