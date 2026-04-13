import type { Metadata } from "next";
import "./globals.css";
import { Crete_Round, Work_Sans } from "next/font/google";
import { ChildProps } from "@/types";
import { ThemeProvider } from "./(root)/_components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from 'nextjs-toploader'

const workSans = Work_Sans({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-workSans",
});

const creteRound = Crete_Round({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-creteRound",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://q13-blog.ac"),
  authors: [{ name: 'Mirzo Shomuratov', url: 'https://Mirzo.ac' }],
  icons: { icon: '/thirteen.png' },
  title: "q13-blog ",
  description: "You can create your own blog",
  keywords: "blog, nextjs, typescript, react, tailwindcss, blog-q13, blogs, BLOG, q13",
  openGraph: {
    title: "q13-blog",
    description: "You can create your own blog",
    type: "website",
    url: "https://q13-blog.ac",
    siteName: "q13-blog",
    locale: "en_US",
    images: { url: "https://q13-blog.ac/thirteen.png" },
    emails: "accaunoff99@gmail.com",
  }
};

function RootLayout({ children }: ChildProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${creteRound.variable} ${workSans.variable} overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader showSpinner={false} />
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
