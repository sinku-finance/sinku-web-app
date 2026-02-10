"use client";

import { useTranslations } from "next-intl";
import { AppStoreButton } from "@/components/ui/app-store-button";
import Image from "next/image";
import { motion } from "framer-motion";
import { appAnimations } from "./animations";

export function AppSection() {
  const t = useTranslations("app");

  return (
    <motion.section 
      className="relative w-full min-h-screen bg-white flex flex-col justify-center py-12 md:py-16 lg:py-24 pb-0 text-black overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px", amount: 0.1 }}
    >
      <div className="px-6 md:px-10 lg:px-12 mb-12 md:mb-16 lg:mb-24">
        <div className="w-full max-w-[1400px] mx-auto">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start"
            variants={appAnimations.content.variants}
          >
            {/* Left side - Content */}
            <div className="flex flex-col">
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight"
                variants={appAnimations.title.variants}
              >
                {t("title")}
              </motion.h2>
              <motion.p 
                className="text-sm md:text-base lg:text-lg text-neutral-700 mb-6 md:mb-8 leading-relaxed max-w-xl"
                variants={appAnimations.subtitle.variants}
              >
                {t("subtitle")}
              </motion.p>

              {/* QR Code */}
              <motion.div 
                className="flex items-center gap-3 mb-6 md:mb-8"
                variants={appAnimations.qrCode.variants}
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/qrcode.svg"
                    alt="QR Code to download Plexos app"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-xs md:text-sm text-neutral-600 max-w-[120px]">
                  {t("qrText")}
                </p>
              </motion.div>

              {/* App Store Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4"
                variants={appAnimations.buttons.variants}
              >
                <AppStoreButton 
                  store="apple" 
                  href="https://apps.apple.com" 
                  className="min-w-[160px] sm:min-w-[180px] h-[50px] md:h-[55px] bg-black text-white border-black hover:bg-gray-900"
                />
                <AppStoreButton 
                  store="google" 
                  href="https://play.google.com" 
                  className="min-w-[160px] sm:min-w-[180px] h-[50px] md:h-[55px] bg-black text-white border-black hover:bg-gray-900"
                />
              </motion.div>
            </div>

            {/* Right side - People background image */}
            <motion.div 
              className="relative w-full h-[350px] md:h-[500px] lg:h-[600px]"
              variants={appAnimations.image.variants}
            >
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <Image
                  src="/home/app-persons.webp"
                  alt="People using Plexos app"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* iPhone mockup - positioned at absolute section bottom */}
      <motion.div 
        className="absolute bottom-[-20px] md:bottom-[-30px] lg:bottom-[-50px] right-[20%] sm:right-[25%] lg:right-[35%] w-[200px] h-[400px] md:w-[260px] md:h-[520px] lg:w-[320px] lg:h-[640px] z-10"
        variants={appAnimations.iphone.variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px", amount: 0.1 }}
      >
        <Image
          src="/home/app-mockup.webp"
          alt="Plexos app interface"
          fill
          className="object-contain object-bottom drop-shadow-2xl"
        />
      </motion.div>
    </motion.section>
  );
}
