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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress?: number;
}

interface UserStats {
  articlesRead: number;
  dayStreak: number;
  favoriteTopic?: string;
}

interface AchievementUnlockEmailProps {
  userName?: string;
  userEmail: string;
  achievement: Achievement;
  userStats?: UserStats;
  baseUrl?: string;
}

export const AchievementUnlockEmail = ({
  userName = "Dear Reader",
  userEmail,
  achievement,
  userStats,
  baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
}: AchievementUnlockEmailProps) => {
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
      <Preview>🏆 Achievement Unlocked: {achievement.title}</Preview>
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
              THE DAILY ACHIEVEMENT
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
              SPECIAL ACHIEVEMENT EDITION
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
              BREAKING: {userName.toUpperCase()} UNLOCKS
              <br />"{achievement.title.toUpperCase()}" ACHIEVEMENT
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
              By FlowNews Achievement Reporter
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
              In a remarkable display of dedication to staying informed, reader{" "}
              {userName} has successfully achieved the coveted "
              {achievement.title}" milestone. This achievement represents a
              significant step in their ongoing journey toward becoming a
              well-informed citizen.
            </Text>
          </div>
        </Section>

        {}
        <Section
          className="border-b border-gray-300"
          style={{
            borderBottom: "1px solid #cccccc",
          }}
        >
          <div style={{ padding: "40px 30px" }}>
            <Section
              className="text-center my-4 bg-gray-50 border border-gray-300"
              style={{
                textAlign: "center",
                margin: "15px 0",
                backgroundColor: "#f9f9f9",
                border: "3px solid #000000",
              }}
            >
              <div style={{ padding: "30px" }}>
                <Text
                  className="text-4xl mb-3"
                  style={{
                    fontSize: "48px",
                    margin: "0 0 15px 0",
                  }}
                >
                  {achievement.icon}
                </Text>
                <Heading
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "0 0 15px 0",
                    color: "#000000",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {achievement.title}
                </Heading>
                <Text
                  className="text-base"
                  style={{
                    fontSize: "16px",
                    color: "#333333",
                    margin: "0",
                    lineHeight: "1.4",
                  }}
                >
                  {achievement.description}
                </Text>
              </div>
            </Section>
          </div>
        </Section>

        {}
        {userStats && (
          <Section
            className="border-b border-gray-300"
            style={{
              borderBottom: "1px solid #cccccc",
            }}
          >
            <div style={{ padding: "40px 30px" }}>
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
                READER STATISTICS
              </Text>
              <Section
                className="my-4 bg-gray-50 border border-gray-300"
                style={{
                  margin: "15px 0",
                  backgroundColor: "#f9f9f9",
                  border: "2px solid #000000",
                }}
              >
                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        margin: "10px",
                        border: "1px solid #000000",
                        backgroundColor: "#f9f9f9",
                        minWidth: "150px",
                      }}
                    >
                      <Text
                        className="text-xs font-bold mb-1"
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          margin: "0 0 5px 0",
                          color: "#666666",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        TOTAL ARTICLES READ
                      </Text>
                      <Text
                        className="text-xl font-bold"
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          margin: "0",
                          color: "#000000",
                        }}
                      >
                        {userStats.articlesRead}
                      </Text>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        margin: "10px",
                        border: "1px solid #000000",
                        backgroundColor: "#f9f9f9",
                        minWidth: "150px",
                      }}
                    >
                      <Text
                        className="text-xs font-bold mb-1"
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          margin: "0 0 5px 0",
                          color: "#666666",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        CURRENT READING STREAK
                      </Text>
                      <Text
                        className="text-xl font-bold"
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          margin: "0",
                          color: "#000000",
                        }}
                      >
                        {userStats.dayStreak} DAYS
                      </Text>
                    </div>
                    {userStats.favoriteTopic && (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          margin: "10px",
                          border: "1px solid #000000",
                          backgroundColor: "#f9f9f9",
                          minWidth: "150px",
                        }}
                      >
                        <Text
                          className="text-xs font-bold mb-1"
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            margin: "0 0 5px 0",
                            color: "#666666",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          PREFERRED TOPIC
                        </Text>
                        <Text
                          className="text-xl font-bold"
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            margin: "0",
                            color: "#000000",
                          }}
                        >
                          {userStats.favoriteTopic.toUpperCase()}
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              </Section>
            </div>
          </Section>
        )}

        {}
        <Section
          className="border-b border-gray-300"
          style={{
            borderBottom: "1px solid #cccccc",
          }}
        >
          <div style={{ padding: "40px 30px" }}>
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
              "This achievement reflects the growing trend of readers engaging
              more deeply with quality journalism," commented our News Analytics
              Department. "Readers like {userName}
              are setting an example for the community."
            </Text>
          </div>
        </Section>

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
              <div style={{ padding: "20px", textAlign: "center" }}>
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
                  CONTINUE YOUR JOURNEY
                </Text>
                <Text
                  className="text-sm mb-4"
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.5",
                    color: "#000000",
                    margin: "0 0 15px 0",
                    textAlign: "center",
                    marginTop: "0",
                    marginRight: "0",
                    marginBottom: "15px",
                    marginLeft: "0",
                  }}
                >
                  Visit your profile to see all achievements and track your
                  progress.
                </Text>
                <Button
                  href={`${baseUrl}/profile`}
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
                  VIEW ACHIEVEMENTS
                </Button>
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
            The Daily Achievement • Published by FlowNews • Achievement
            Recognition System
            <br />
            Delivered to:{" "}
            <Link
              href={`mailto:${userEmail}`}
              className="text-ccccc underline"
              style={{ color: "#cccccc", textDecoration: "underline" }}
            >
              {userEmail}
            </Link>
          </Text>
          <Link
            href={`mailto:unsubscribe@${
              new URL(baseUrl).hostname
            }?subject=Unsubscribe ${userEmail}`}
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
