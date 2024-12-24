import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SoulreachVerifyEmailProps {
  verificationCode?: string;
}

export default function SoulreachVerifyEmail({
  verificationCode,
}: SoulreachVerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Soulreach Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                style={image}
                src={
                  "https://res.cloudinary.com/dr2jx6j6m/image/upload/v1722345467/soulreach-image_nygkz0.jpg"
                }
                width="75"
                height="75"
                alt="Soulreach's Logo"
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                Thanks for creating your Soulreach account. We want to make sure
                it's really you. Please enter the following verification code
                when prompted.
              </Text>
              <Section style={verificationSection}>
                <Text style={verifyText}>Verification code</Text>

                <Text style={codeText}>{verificationCode}</Text>
                <Text style={validityText}>
                  (This code is valid for 10 minutes)
                </Text>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                Soulreach will never email you and ask you to disclose or verify
                your password, credit card, or banking account number.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            This message was produced and distributed by Soulreach, Inc., The
            Karen Stables, P.O Box 51379-00100. © 2024 All rights reserved.
            Soulreach is a registered trademark of{" "}
            <Link href="https://liquidhack.co.ke" target="_blank" style={link}>
              liquidhack.co.ke
            </Link>
            , Inc. View our{" "}
            <Link href="https://liquidhack.co.ke" target="_blank" style={link}>
              privacy policy
            </Link>
            .
            <br />
            For support, contact us at: Phone: +254 716 355 644 <br />
            Email:{" "}
            <Link href="mailto:support@liquidhack.co.ke" style={link}>
              soulreach@podium.beauty
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#000",
  padding: "20px 0",
  textAlign: "center" as const,
  verticalAlign: "middle",
  display: "block",
};
const image = {
  width: "20%",
  height: "20%",
  margin: "auto",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const verificationSection = {
  backgroundColor: "#f4f4f4",
  padding: "20px",
  borderRadius: "4px",
  margin: "20px 0",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
