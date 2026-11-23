import type { MetadataRoute } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { siteOrigin } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: string[] = [];
  function visit(directory: string, segments: string[]) {
    const entries = readdirSync(directory, { withFileTypes: true });
    if (entries.some((entry) => /^page\.(tsx|ts|jsx|js)$/.test(entry.name)))
      routes.push(`/${segments.join("/")}`);
    for (const entry of entries) {
      if (
        !entry.isDirectory() ||
        /^(admin|thank-you|api|form-submit)$/.test(entry.name) ||
        /^[_.@]/.test(entry.name)
      )
        continue;
      if (entry.name.includes("["))
        throw new Error(
          "Add dynamic route content to sitemap generation before publishing.",
        );
      visit(
        join(directory, entry.name),
        entry.name.startsWith("(") ? segments : [...segments, entry.name],
      );
    }
  }
  visit(join(process.cwd(), "src/app"), []);
  return routes.map((path) => ({
    url: new URL(path, siteOrigin).href,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
