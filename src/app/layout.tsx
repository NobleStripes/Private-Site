import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import "./globals.css";
import AuthButton from "./AuthButton";

export const metadata: Metadata = {
  title: "Vault | Private Gallery",
  description: "A private collection of AI generated images",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <header className="app-header glass">
          <h1 className="brand-title">Vault</h1>
          <nav>
            <AuthButton session={session} />
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
