"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { servicesAnimations } from "./animations";

// Heavy WebGL (three.js) — load client-only, separate chunk.
const CardGradient = dynamic(
  () => import("./card-gradient").then((m) => m.CardGradient),
  { ssr: false },
);

// Each card keeps its own base hue; [color1, color2, color3].
// Soft pastel tones (close to the original card surfaces) with gentle steps —
// gives an even, soft gradient with no harsh light/dark washout.
const CARD_COLORS = {
  green: ["#E0FDEA", "#BBF0D0", "#9BE3BC"],
  purple: ["#EDE8F5", "#DCD0F0", "#C9B8E8"],
  blue: ["#E6F1FB", "#CFE3F6", "#B4D2F0"],
} as const;

// Server-rendered CSS fallback so each card paints as a gradient immediately
// (no flash before the WebGL canvas mounts client-side).
const fallback = (c: readonly [string, string, string]) => ({
  backgroundImage: `linear-gradient(135deg, ${c[0]} 0%, ${c[1]} 55%, ${c[2]} 100%)`,
});

export function ServicesSection() {
  const t = useTranslations("services");

  return (
    <motion.section
      className="w-full bg-white text-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px", amount: 0.1 }}
    >
      <div className="min-h-screen flex flex-col justify-center py-16 md:py-24">
        <div className="px-6 md:px-10 lg:px-12">
          <div className="w-full max-w-[1400px] mx-auto">
        {/* Header Section */}
        <motion.div
          className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 md:gap-8 mb-12 md:mb-24"
          variants={servicesAnimations.header.variants}
        >
          {/* Left side text */}
          <motion.div
            className="lg:max-w-[140px]"
            variants={servicesAnimations.tagline.variants}
          >
            <p className="text-neutral-500 max-w-[200px] leading-relaxed font-medium text-sm md:text-base uppercase tracking-wide">
            {t("tagline")}
            </p>
          </motion.div>

          {/* Right side content */}
          <motion.div
            className="w-full lg:w-[600px] max-w-2xl lg:text-left"
            variants={servicesAnimations.titleSection.variants}
          >
            <h2 className="text-3xl md:text-5xl mb-4 md:mb-6 font-bold leading-[1.1]">
              {t("title")}
            </h2>
            <p className="text-sm md:text-base text-neutral-600 mb-5 md:mb-6 leading-relaxed">
              {t("subtitle")}
            </p>
            <Button variant="primary" className="text-black">
              <Link href="/download-app">
                {t("viewAll")}
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-16"
          variants={servicesAnimations.cardsContainer.variants}
        >
          {/* Debit & Credit Cards Card */}
          <motion.div
            className="group relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[450px] p-6 md:p-8 flex flex-col text-center transition-shadow duration-300 hover:shadow-lg"
            style={fallback(CARD_COLORS.green)}
            variants={servicesAnimations.card.variants}
          >
            <CardGradient colors={CARD_COLORS.green} uTime={0} uSpeed={0.18} />
            <motion.div className="relative z-10 flex flex-col flex-1" variants={servicesAnimations.cardContent.variants}>
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <Image src="/services/international-debit-card.webp" alt="International Debit Cards" width={400} height={400} className="object-contain transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex-shrink-0 pb-3 md:pb-4">
                <h3 className="text-black text-xl md:text-2xl font-bold mb-2 md:mb-3">
                  {t("cards.title")}
                </h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {t("cards.description")}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Personal Savings Account Card */}
          <motion.div
            className="group relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[450px] p-6 md:p-8 flex flex-col text-center transition-shadow duration-300 hover:shadow-lg"
            style={fallback(CARD_COLORS.purple)}
            variants={servicesAnimations.card.variants}
          >
            <CardGradient colors={CARD_COLORS.purple} uTime={7} uSpeed={0.22} />
            <motion.div className="relative z-10 flex flex-col flex-1" variants={servicesAnimations.cardContent.variants}>
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <Image src="/services/send-receive-money.webp" alt="Send & Receive Money" width={400} height={400} className="object-contain transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex-shrink-0 pb-3 md:pb-4">
                <h3 className="text-black text-xl md:text-2xl font-bold mb-2 md:mb-3">
                  {t("savings.title")}
                </h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {t("savings.description")}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Business Banking Card */}
          <motion.div
            className="group relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[450px] p-6 md:p-8 flex flex-col text-center transition-shadow duration-300 hover:shadow-lg"
            style={fallback(CARD_COLORS.blue)}
            variants={servicesAnimations.card.variants}
          >
            <CardGradient colors={CARD_COLORS.blue} uTime={14} uSpeed={0.2} />
            <motion.div className="relative z-10 flex flex-col flex-1" variants={servicesAnimations.cardContent.variants}>
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <Image src="/services/global-transfer.webp" alt="Transfer globally" width={400} height={400} className="object-contain transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex-shrink-0 pb-3 md:pb-4">
                <h3 className="text-black text-xl md:text-2xl font-bold mb-2 md:mb-3">
                  {t("business.title")}
                </h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {t("business.description")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom copy */}
        <motion.p
          className="text-sm md:text-base text-neutral-500 text-center max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t("bottomText")}
        </motion.p>

        <div className="flex w-full border-b border-gray-200 mt-16"/>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
