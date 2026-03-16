import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duck Design System",
  description:
    "Figma Variables → Tokens Studio → Style Dictionary → Tailwind + shadcn/ui + Motion + dnd-kit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
