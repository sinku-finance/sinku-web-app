"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AppleWallet,
  ScanQrCode,
  GraphUp,
  LockSquare,
  CalendarCheck,
  Contactless,
} from "iconoir-react";
import { cardsAnimations } from "./animations";

export function CardsSection() {
  const t = useTranslations("homeCards");

  return (
    <motion.section 
      className="w-full min-h-screen bg-white flex flex-col justify-center py-12 md:py-16 lg:py-24 text-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px", amount: 0.1 }}
    >
      {/* Header Section with padding */}
      <div className="px-6 md:px-10 lg:px-12">
        <div className="w-full max-w-[1400px] mx-auto">
          <motion.div 
            className="text-center mb-8 md:mb-12 lg:mb-16"
            variants={cardsAnimations.header.variants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-5 leading-tight max-w-4xl mx-auto"
              variants={cardsAnimations.title.variants}
            >
              {t("title")}
            </motion.h2>
            <motion.p
              className="text-sm md:text-base lg:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed"
              variants={cardsAnimations.subtitle.variants}
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Cards Images - Two columns */}
      <div className="px-6 md:px-10 lg:px-12">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Card 1 */}
            <motion.div 
              className="relative w-full h-[400px] md:h-[500px] lg:h-[650px] 2xl:h-[900px] overflow-hidden rounded-2xl"
              variants={cardsAnimations.image.variants}
            >
              <Image
                src="/cards/card-showcase-1.webp"
                alt="Sinku card with phone"
                fill
                quality={100}
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="relative w-full h-[400px] md:h-[500px] lg:h-[650px] 2xl:h-[900px] overflow-hidden rounded-2xl"
              variants={cardsAnimations.image.variants}
            >
              <Image
                src="/cards/card-showcase-2.webp"
                alt="Sinku card stack"
                fill
                quality={100}
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Card Details Section */}
          <motion.div
            className="rounded-2xl bg-gray-50 p-8 md:p-12 lg:p-16 mt-12 md:mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left Side - Text Content */}
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 md:mb-6 leading-tight">
                  {t("details.title")}
                </h3>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-md">
                  {t("details.subtitle")}
                </p>
              </div>

              {/* Right Side - Feature Grid */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {([
                  { icon: AppleWallet, label: t("details.features.applePay") },
                  { icon: ScanQrCode, label: t("details.features.qrCode") },
                  { icon: GraphUp, label: t("details.features.analytics") },
                  { icon: LockSquare, label: t("details.features.blockCard") },
                  { icon: CalendarCheck, label: t("details.features.scheduledPayments") },
                  { icon: Contactless, label: t("details.features.contactless") },
                ] as const).map((feature) => (
                  <div
                    key={feature.label}
                    className="bg-white rounded-2xl p-5 md:p-6 flex flex-col items-center text-center gap-3 md:gap-4 hover:shadow-sm transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary-100 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-700" />
                    </div>
                    <p className="text-sm md:text-base font-medium text-black leading-snug">
                      {feature.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
