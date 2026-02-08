"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "iconoir-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { servicesAnimations } from "./animations";

export function ServicesSection() {
  const t = useTranslations("services");
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < 2 ? prev + 1 : prev));
  };

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
            <p className="text-neutral-700 max-w-[200px] leading-relaxed font-semibold text-base md:text-lg">
            {t("tagline")}
            </p>
          </motion.div>

          {/* Right side content */}
          <motion.div 
            className="w-full lg:w-[600px] max-w-2xl lg:text-left"
            variants={servicesAnimations.titleSection.variants}
          >
            <h2 className="text-3xl md:text-5xl mb-4 md:mb-6 font-bold leading-[1.15]">
              {t("title")}
            </h2>
            <p className="text-sm md:text-base mb-4 md:mb-5">
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
            className="rounded-lg overflow-hidden h-[450px] md:min-h-[420px] p-6 md:p-8 flex flex-col text-center bg-surface-green"
            variants={servicesAnimations.card.variants}
          >
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <Image src="/services/international-debit-card.webp" alt="International Debit Cards" width={400} height={400} className="object-contain" />
            </div>
            <div className="flex-shrink-0 pb-3 md:pb-4">
              <h3 className="text-black text-xl md:text-2xl font-bold mb-2 md:mb-3">
                {t("cards.title")}
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-snug">
                {t("cards.description")}
              </p>
            </div>
          </motion.div>

          {/* Personal Savings Account Card */}
          <motion.div
            className="rounded-lg overflow-hidden h-[450px] md:min-h-[420px] p-6 md:p-8 flex flex-col text-center bg-surface-purple"
            variants={servicesAnimations.card.variants}
          >
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <Image src="/services/send-receive-money.webp" alt="Send & Receive Money" width={400} height={400} className="object-contain" />
            </div>
            <div className="flex-shrink-0 pb-3 md:pb-4">
              <h3 className="text-black text-xl md:text-2xl font-bold mb-2 md:mb-3">
                {t("savings.title")}
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-snug">
                {t("savings.description")}
              </p>
            </div>
          </motion.div>

          {/* Business Banking Card */}
          <motion.div
            className="rounded-lg overflow-hidden h-[450px] md:min-h-[420px] p-6 md:p-8 flex flex-col text-center bg-surface-blue"
            variants={servicesAnimations.card.variants}
          >
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <Image src="/services/global-transfer.webp" alt="Transfer globally" width={400} height={400} className="object-contain" />
            </div>
            <div className="flex-shrink-0 pb-3 md:pb-4">
              <h3 className="text-black text-xl md:text-2xl font-bold mb-2 md:mb-3">
                {t("business.title")}
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-snug">
                {t("business.description")}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom copy */}
        <motion.p
          className="text-sm md:text-base text-neutral-600 text-center max-w-2xl mx-auto leading-relaxed"
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
