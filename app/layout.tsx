import type { Metadata } from "next";
import { Sora, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { SITE_NAME, absoluteUrl, getSiteUrl } from "@/lib/site-data";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });
const libre = Libre_Baskerville({ variable: "--font-libre", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: `${SITE_NAME} | Emergency Roof Leak & Storm Damage`, template: `%s | ${SITE_NAME}` },
  description:
    "Emergency roof leak repair, storm damage response, and urgent roofing pages across Canadian cities with direct-call support.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | Emergency Roof Leak & Storm Damage`,
    description: "Trusted emergency roofing service pages with fast-response call options and local coverage.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${libre.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: '(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.defer=!0;a.src=document.location.protocol+"//dist.routingapi.com/jsapi/v1/retreaver.min.js";a.onload=a.onreadystatechange=function(){Retreaver.configure({host:"api.routingapi.com",prefix:"https:"==document.location.protocol?"https":"http"});(new Retreaver.Campaign({campaign_key:"ff97b1af347572af5363ff0efe41842d"})).auto_replace_numbers()};(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(a)})();',
          }}
        />
      </head>
      <body>
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
