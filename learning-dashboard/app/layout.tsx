import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learning Dashboard",
  description: "Next-gen student learning dashboard powered by Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0f] text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
