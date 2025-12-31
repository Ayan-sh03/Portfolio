import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./Components/ThemeProvider";

export const metadata: Metadata = {
  title: "Ayan Sheikh | Portfolio",
  description: "Software Developer Portfolio - Crafted with monospace aesthetics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-mono">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
