import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import { productTitle } from "@/constant";
import Script from "next/script";
import ClientWrapper from "@/components/client-wrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: productTitle,
  description: "Zig Zag Made",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <Script strategy="beforeInteractive" id="meta-pixel">
          {`
          !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
 fbq('init', '1229941751215934'); 
fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=1229941751215934&ev=PageView
&noscript=1"
          />
        </noscript>
        <main className="flex flex-col w-full max-w-xl mx-auto">
          <ClientWrapper>
            <Header />
          </ClientWrapper>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
