import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/form-submit", "/thank-you"],
    },
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
