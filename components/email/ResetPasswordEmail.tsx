import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  resetLink: string;
  name: string;
}

export const ResetPasswordEmail = ({
  resetLink,
  name,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={{ marginBottom: "20px", width: "100%" }}>
            <Text style={logoTextStyle}>
              <span style={bracketStyle}>&lt;</span>
              Hamza
              <span style={brandStyle}>.dev</span>
              <span style={bracketStyle}> /&gt;</span>
            </Text>
          </Section>

          <Section style={headerSection}>
            <Text style={tagline}>ACCOUNT SECURITY</Text>
            <Heading style={heading}>Reset Your Password</Heading>
          </Section>

          <Hr style={divider} />

          {/* Details */}
          <Section style={detailsSection}>
            <Text style={detailText}>
              {name}, We received a request to reset the password for your
              account. Click the button below to proceed.
            </Text>
          </Section>

          {/* CTA Button */}
          <Section style={buttonContainer}>
            <Button style={button} href={resetLink}>
              Reset Password
            </Button>
          </Section>

          {/* Fallback Link Box */}
          <Section style={messageBox}>
            <Text style={fallbackText}>
              {
                "If the button above doesn't work, copy and paste this link into your browser:"
              }
            </Text>
            <Text style={linkText}>
              <Link href={resetLink} style={link}>
                {resetLink}
              </Link>
            </Text>
          </Section>

          <Text style={warningText}>The link is valid for 15 minutes.</Text>

          <Text style={warningText}>
            If you did not request a password reset, you can safely ignore this
            email. Your password will remain unchanged.
          </Text>

          <Hr style={divider} />

          {/* Footer */}
          <Text style={footer}>
            Sent from{" "}
            <Link href="https://hamzahanif.dev" style={footerLink}>
              hamzahanif.dev
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Inline styles
const main: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: "40px 10px",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #d4d4d8",
  borderRadius: "12px",
  width: "480px",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "32px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const headerSection: React.CSSProperties = {
  marginBottom: "16px",
};

const tagline: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.08em",
  color: "#71717a",
  margin: "0 0 6px 0",
};

const heading: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#09090b",
  margin: "0",
};

const divider: React.CSSProperties = {
  borderColor: "#e4e4e7",
  margin: "20px 0",
};

const detailsSection: React.CSSProperties = {
  marginBottom: "20px",
};

const detailText: React.CSSProperties = {
  fontSize: "14px",
  color: "#52525b",
  lineHeight: "1.5",
  margin: "0",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "20px",
};

const button: React.CSSProperties = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const messageBox: React.CSSProperties = {
  backgroundColor: "#fafafa",
  border: "1px solid #e4e4e7",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "20px",
};

const fallbackText: React.CSSProperties = {
  fontSize: "12px",
  color: "#71717a",
  margin: "0 0 8px 0",
};

const linkText: React.CSSProperties = {
  fontSize: "13px",
  margin: "0",
  wordBreak: "break-all" as const,
};

const link: React.CSSProperties = {
  color: "#2563eb",
  textDecoration: "underline",
};

const warningText: React.CSSProperties = {
  fontSize: "12px",
  color: "#a1a1aa",
  lineHeight: "1.4",
  margin: "0",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#a1a1aa",
  textAlign: "center" as const,
  margin: "0",
};

const footerLink: React.CSSProperties = {
  color: "#71717a",
  textDecoration: "underline",
};

const logoTextStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#18181b",
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  margin: "0",
  letterSpacing: "-0.02em",
  textAlign: "center" as const,
};

const bracketStyle: React.CSSProperties = {
  color: "#a1a1aa",
};

const brandStyle: React.CSSProperties = {
  color: "#2563eb",
};

export default ResetPasswordEmail;
