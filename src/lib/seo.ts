import type { Metadata } from "next";
import { site } from "./site";
const origin = new URL(process.env.SITE_URL || "http://localhost:3000");
if (
  !["http:", "https:"].includes(origin.protocol) ||
  origin.username ||
  origin.password ||
  origin.pathname !== "/" ||
  origin.search ||
  origin.hash
)
  throw new Error(
    "SITE_URL must be an HTTP(S) origin without credentials, paths, or queries.",
  );
if (
  !["localhost", "127.0.0.1"].includes(origin.hostname) &&
  origin.protocol !== "https:"
)
  throw new Error("Public SITE_URL must use HTTPS.");
export const siteOrigin = origin.origin;
export function pageMetadata({
  title,
  description,
  path = "/",
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
}): Metadata {
  if (
    title.length < 50 ||
    title.length > 60 ||
    description.length < 140 ||
    description.length > 160
  )
    throw new Error("Metadata does not meet required lengths.");
  if (!path.startsWith("/") || path.startsWith("//"))
    throw new Error("Canonical path must be a local absolute path.");
  const url = new URL(path, origin).href;
  if (
    new URL(url).origin !== origin.origin ||
    new URL(url).search ||
    new URL(url).hash
  ) {
    throw new Error(
      "Canonical paths must stay on this site and exclude queries or fragments.",
    );
  }
  return {
    metadataBase: origin,
    title,
    description,
    alternates: { canonical: url },
    robots: { index: !noindex, follow: !noindex },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_PK",
      images: [
        {
          url: "/images/gondal/social-banner.jpg",
          alt: "Usman Ali | Gondal Property Advisory",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/gondal/social-banner.jpg"],
    },
  };
}
export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
