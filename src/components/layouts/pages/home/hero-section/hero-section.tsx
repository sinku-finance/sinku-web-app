"use client";

import { Header } from "@/components/layouts/header/header";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { heroAnimations } from "./animations";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section 
      className="relative min-h-[100vh] w-full flex flex-col overflow-hidden"
      style={{ 
        backgroundImage: "url('/banners/home-mobile.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        WebkitTextSizeAdjust: "100%"
      }}
    >
      <style jsx>{`
        @media (min-width: 768px) {
          section {
            background-image: url('/banners/home-desktop.png') !important;
            background-position: right center !important;
            background-size: cover !important;
          }
        }
      `}</style>
      <Header />
      
      {/* Hero Content */}
      <div className="flex-1 flex items-start md:items-center justify-center px-6 md:px-10 lg:px-12">
        <div className="w-full max-w-[1400px] mx-auto">
          <motion.div 
            className="max-w-2xl lg:max-w-3xl text-center md:text-left mt-32 md:mt-0"
            {...heroAnimations.container}
            variants={heroAnimations.contentWrapper.variants}
          >
            <motion.h1 
              className="font-bold mb-6 text-white"
              style={{
                fontSize: "clamp(3rem, 10vw, 6rem)",
                lineHeight: "1.1",
                WebkitTextSizeAdjust: "100%"
              }}
              variants={heroAnimations.title.variants}
            >
              {t("title")}
            </motion.h1>
            
            <motion.p 
              className="mb-8 max-w-xl text-white mx-auto md:mx-0"
              style={{
                fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                lineHeight: "1.6",
                WebkitTextSizeAdjust: "100%"
              }}
              variants={heroAnimations.subtitle.variants}
            >
              {t("subtitle")}
            </motion.p>
            
            <motion.div 
              className="flex flex-row justify-center md:justify-start gap-3"
              variants={heroAnimations.buttons.variants}
            >
							<AppStoreButton 
                store="apple" 
                href="https://apps.apple.com" 
                className="min-w-[160px] md:min-w-[200px] h-[48px] md:h-[55px] bg-white text-black border-white hover:bg-gray-100"
              />
							<AppStoreButton 
                store="google" 
                href="https://play.google.com" 
                className="min-w-[160px] md:min-w-[200px] h-[48px] md:h-[55px] bg-white text-black border-white hover:bg-gray-100" 
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
