"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { trackAppEvent } from "@/lib/analytics";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    trackAppEvent({
      event: "page_view",
      path: pathname,
      title: document.title,
      referrer: document.referrer || undefined,
    });
  }, [pathname]);

  return null;
}
