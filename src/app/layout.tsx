import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Icon } from "@/components/icon";
import { site } from "@/lib/site";
import "./globals.css";

const geist = localFont({
  src: "./fonts/geist-latin.ttf",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
});
export const metadata: Metadata = {
  applicationName: site.name,
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <a
          className="floating-whatsapp"
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Usman on WhatsApp"
        >
          <Icon name="chat" />
        </a>
      </body>
    </html>
  );
}
