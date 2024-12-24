import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SoulreachResetPasswordEmailProps {
  userFirstname?: string;
  resetCode?: string;
}

export const SoulreachResetPasswordEmail = ({
  resetCode,
}: SoulreachResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Soulreach reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            style={soulreachLogo}
            src={
              "https://res.cloudinary.com/dr2jx6j6m/image/upload/v1722345467/soulreach-image_nygkz0.jpg"
            }
            alt="Soulreach"
          />
          <Section>
            <Text style={text}>Hi,</Text>
            <Text style={text}>
              Someone recently requested a password change for your Soulreach
              account. If this was you, use the code below:
            </Text>
            <Section style={verificationSection}>
              <Text style={verifyText}>Verification code</Text>

              <Text style={codeText}>{resetCode}</Text>
              <Text style={validityText}>
                (This code is valid for 10 minutes)
              </Text>
            </Section>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone. See our Help Center for{" "}
              <Link style={anchor} href="https://liquidhack.co.ke">
                more security tips.
              </Link>
            </Text>
            <Text style={text}>Happy shopping!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

SoulreachResetPasswordEmail.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "https://liquidhack.co.ke",
} as SoulreachResetPasswordEmailProps;

export default SoulreachResetPasswordEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const soulreachLogo = {
  width: "20%",
  height: "20%",
};
const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};
const verificationSection = {
  backgroundColor: "#f4f4f4",
  padding: "20px",
  borderRadius: "4px",
  margin: "20px 0",
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

const button = {
  backgroundColor: "#000000",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
