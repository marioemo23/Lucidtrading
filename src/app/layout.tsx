import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Lucid Trading - The Best Prop Firm For Futures | Fast Payouts!",
  description:
    "Join the top-rated prop firm for futures. Instant Funding. Same-Day Payouts. No Recurring Fees.",
  icons: {
    icon: "/seo/favicon-32.png",
    apple: "/seo/apple-touch-icon.png",
  },
  openGraph: {
    images: ["/images/logo-sphere.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} dark h-full antialiased`}
    >
      <head>
        {/* Adobe Fonts (Typekit) kit providing "transducer" display font family used site-wide for headings/buttons. */}
        <link rel="stylesheet" href="https://use.typekit.net/pni6fsd.css" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
