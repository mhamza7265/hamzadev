export {};

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      eventName: string,
      parameters?: Record<string, unknown>,
    ) => void;
  }
}
