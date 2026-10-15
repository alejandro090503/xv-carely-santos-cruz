import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Courier_Prime } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const typewriter = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-typewriter",
  display: "swap",
});

const SITE_URL = "https://xv-carely-santos-cruz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Carely · Mis XV Años · 7 Noviembre 2026",
  description:
    "Invitación digital a los XV Años de Carely Santos Cruz · 7 de Noviembre de 2026 · Cuernavaca, Morelos.",
  openGraph: {
    title: "Carely · Mis XV Años",
    description: "7 de Noviembre de 2026 · Cuernavaca, Morelos.",
    type: "website",
    url: SITE_URL,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Carely · Mis XV Años" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carely · Mis XV Años",
    description: "7 de Noviembre de 2026 · Cuernavaca, Morelos.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${greatVibes.variable} ${cormorant.variable} ${typewriter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
