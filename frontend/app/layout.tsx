import type { Metadata } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";

import { headers } from 'next/headers' // added
import ContextProvider from './context/index'

export const metadata: Metadata = {
  title: "Predict the Future of Crypto",
  description: "Join now, the leading platform form crypto prediction market. Use your knowledge to for forecast the digital assets and earn reward",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){

  const headersObj = await headers();
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en">
      <body className="antialiased">
        <ContextProvider cookies={cookies}>
          {children}

        </ContextProvider>
      </body>
    </html>
  );
}