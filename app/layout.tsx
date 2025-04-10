import type { Metadata } from "next";
import "./globals.css";
import {Crete_Round, Work_Sans} from "next/font/google";
import { ChildProps } from "@/types";
import { ThemeProvider } from "./(root)/_components/providers/theme-provider";

export const workSans = Work_Sans({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-workSans',
})

export const creteRound = Crete_Round({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-creteRound',
})

export const metadata: Metadata = {
  title: "empty-blog ",
  description: "You can create your own blog",
};

 function RootLayout({children,}:ChildProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${creteRound.variable} ${workSans.variable} overflow-x-hidden`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>

    </html>
  );
}
export default RootLayout;