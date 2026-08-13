import {
  Body,
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

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactEmail = ({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New message from {name}</Preview>
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
            <Text style={tagline}>NEW PORTFOLIO MESSAGE</Text>
            <Heading style={heading}>{subject}</Heading>
          </Section>

          <Hr style={divider} />

          {/* Details */}
          <Section style={detailsSection}>
            <Text style={detailText}>
              <strong style={boldText}>From:</strong> {name}
            </Text>
            <Text style={detailText}>
              <strong style={boldText}>Reply to:</strong>{" "}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
          </Section>

          {/* Message Box */}
          <Section style={messageBox}>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Text style={footer}>
            Sent via contact form on{" "}
            <Link href="https://hamzahanif.dev" style={footerLink}>
              hamzahanif.dev
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Inline styles strictly force centering & width in Gmail
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
  color: " #52525b",
  margin: "0 0 6px 0",
};

const boldText: React.CSSProperties = {
  color: "#09090b",
  fontWeight: "600",
};

const link: React.CSSProperties = {
  color: "#2563eb",
  textDecoration: "underline",
};

const messageBox: React.CSSProperties = {
  backgroundColor: "#fafafa",
  border: "1px solid #e4e4e7",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "20px",
};

const messageText: React.CSSProperties = {
  fontSize: "14px",
  color: "#27272a",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap",
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
  color: "#18181b", // Clean dark text color
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  margin: "0",
  letterSpacing: "-0.02em",
  textAlign: "center",
};

const bracketStyle: React.CSSProperties = {
  color: "#a1a1aa", // Muted gray for the tags < />
};

const brandStyle: React.CSSProperties = {
  color: "#2563eb", // Your accent/brand color (adjust hex code as needed)
};

export default ContactEmail;
