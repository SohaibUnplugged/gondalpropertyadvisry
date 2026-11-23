import { defineConfig } from "@playwright/test";
import production from "./playwright.config";

// Requires an already-running dev server; never replaces or stops the user's server.
export default defineConfig({
  ...production,
  outputDir: ".artifacts/local-test-results",
  testMatch: "motion-preference.spec.ts",
  webServer: undefined,
  use: { ...production.use, baseURL: "http://localhost:3000" },
});
