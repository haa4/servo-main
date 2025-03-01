//src/app/layout.tsx

import "@/scss/tokens/index.scss";
import "@/scss/styles/index.scss";

import type { Metadata } from "next";
import classNames from "classnames";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RouteGuard } from "@/components/RouteGuard";
import { home, baseURL, effects, style } from "@/app/resources";

import {Geist, Geist_Mono, Inter, Source_Code_Pro} from "next/font/google";
import "./globals.css";
import {Flex} from "@/UI/Flex/Flex";
import {ToastProvider} from "@/UI/ToastProvider/ToastProvider";
import {Column} from "@/UI/Column/Column";
import { Background } from "@/UI/Background/Background.tsx";
import React from "react";
import DarkReaderLock from "@/components/DarkReaderLock";

const primary = Inter({
    variable: "--font-primary",
    subsets: ["latin"],
    display: "swap",
});

type FontConfig = {
    variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
 */

const code = Source_Code_Pro({
    variable: "--font-code",
    subsets: ["latin"],
    display: "swap",
});


export async function generateMetadata() {
    return {
        metadataBase: new URL(`https://${baseURL}`),
        title: home.title,
        description: home.description,
        openGraph: {
            title: `${home.title}`,
            description: `${home.description}`,
            url: baseURL,
            siteName: `${baseURL}`,
            locale: "en_US",
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Flex
          as="html"
          lang="en"
          background="brand-medium"
          data-neutral={style.neutral}
          data-brand={style.brand}
          data-accent={style.accent}
          data-solid={style.solid}
          data-solid-style={style.solidStyle}
          data-theme={style.theme}
          data-border={style.border}
          data-surface={style.surface}
          data-transition={style.transition}
          className={classNames(
              primary.variable,
              secondary ? secondary.variable : "",
              tertiary ? tertiary.variable : "",
              code.variable,
          )}
      >
          <ToastProvider>
              <Column style={{ minHeight: "100vh" }} as="body" fillWidth margin="0" padding="0">
                  <Background
                      mask={{
                          cursor: true, // Enable cursor-based mask
                          x: effects.mask.x,
                          y: effects.mask.y,
                          radius: 50, // Larger radius for bigger reveal area
                      }}
                      gradient={{
                          display: true,
                          colors: ["#FF671F", "#FFFFFF", "#046A38"], // Indian flag colors
                          direction: "top-to-bottom",
                          tilt: 0,
                          ratios: [0, 0.5, 1], // Position white in the middle
                          x: effects.gradient.x,
                          y: effects.gradient.y,
                          width: effects.gradient.width,
                          height: effects.gradient.height,
                          opacity: 50, // Adjust opacity as needed
                      }}
                      dots={{
                          display: true,
                          color: "neutral-strong", // Dots color
                          size: "16" as any, // Smaller dots for better pattern
                          opacity: 10 as any, // Light dots
                          revealOnHover: true, // Enable the hover reveal effect
                      }}
                      grid={{
                          display: false, // Turn off grid for cleaner look
                      }}
                      lines={{
                          display: false, // Turn off lines for cleaner look
                      }}
                  />
                  <Flex fillWidth minHeight="16"></Flex>
                  <Header />
                  <Flex
                      position="relative"
                      zIndex={0}
                      fillWidth
                      paddingY="l"
                      paddingX="l"
                      horizontal="center"
                      flex={1}
                  >
                      <Flex horizontal="center" fillWidth minHeight="0">
                          <DarkReaderLock>{children}</DarkReaderLock>
                      </Flex>
                  </Flex>
                  <Footer />
              </Column>
          </ToastProvider>
      </Flex>
  );
}
