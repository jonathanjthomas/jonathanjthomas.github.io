import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jonathan J. Thomas | Coming Soon",
  description: "Something big is coming soon...",
  authors: [{ name: "Jonathan J. Thomas" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Space+Grotesk:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-neutral-100 min-h-screen flex flex-col justify-center items-center antialiased select-none">
        {children}
      </body>
    </html>
  );
}
