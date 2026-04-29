import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vault | Private Gallery",
  description: "A private collection of AI generated images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="app-header glass">
          <h1 className="brand-title">Vault</h1>
          <nav>
            <button className="btn btn-glass">Sign In</button>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
