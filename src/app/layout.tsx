import type { Metadata } from "next";
import { Header } from "@/components/header";
import { BrandMark, Icon } from "@/components/icon";
import { navigation, site } from "@/lib/site";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: site.name,
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <footer className="footer">
          <div className="footer-top">
            <Link href="/" className="brand">
              <BrandMark />
              <span>
                GONDAL<small>PROPERTY ADVISORY</small>
              </span>
            </Link>
            <p>
              A considered approach.
              <br />A confident next move.
            </p>
            <nav aria-label="Footer navigation">
              {navigation.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© {site.name}.</span>
            <span>Property decisions deserve a personal conversation.</span>
            <Link href="/#main">Back to top</Link>
          </div>
        </footer>
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
