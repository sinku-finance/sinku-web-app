"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Percentage, CreditCard, Gift, DollarCircle } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { toolsAnimations } from "./animations";

export function ToolsSection() {
  const t = useTranslations("tools");
  const tServices = useTranslations("services");

  return (
    <motion.section 
      className="w-full min-h-screen bg-surface-cyan flex flex-col justify-center py-12 md:py-16 lg:py-24 text-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px", amount: 0.1 }}
    >
      <div className="px-6 md:px-10 lg:px-12">
        <div className="w-full max-w-[1400px] mx-auto">
          <motion.div
            className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 md:gap-8 mb-12 md:mb-16"
            variants={toolsAnimations.content.variants}
          >
            {/* Left side - small tagline */}
            <motion.div
              className="lg:max-w-[140px]"
              variants={toolsAnimations.tagline.variants}
            >
              <p className="text-neutral-500 max-w-[200px] leading-relaxed font-medium text-sm md:text-base uppercase tracking-wide">
                {t("tagline")}
              </p>
            </motion.div>

            {/* Right side - main content */}
            <motion.div 
              className="w-full lg:w-[600px] max-w-2xl lg:text-left"
              variants={toolsAnimations.mainContent.variants}
            >
              <h2 className="text-3xl md:text-5xl mb-4 md:mb-6 font-bold leading-[1.1]">
                {t("title")}
              </h2>
              <p className="text-sm md:text-base text-neutral-600 mb-5 md:mb-6 leading-relaxed">
                {t("subtitle")}
              </p>
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/download-app">
                  {t("button")}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image below content */}
          <motion.div
            className="relative w-full h-[300px] md:h-[500px] lg:[550px] 2xl:h-[600px] rounded-2xl overflow-hidden"
            variants={toolsAnimations.image.variants}
          >
            <Image
              src="/home/tools-section.webp"
              alt="People using Sinku"
              fill
              quality={100}
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover"
            />
          </motion.div>

          {/* Complete Account Section */}
          <motion.div
            className="rounded-2xl p-8 md:p-12 lg:p-16 mt-12 md:mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left Side - Text Content */}
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 md:mb-6 leading-tight">
                  {tServices("account.title")}
                </h3>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-md">
                  {tServices("account.subtitle")}
                </p>
              </div>

              {/* Right Side - 2x2 Feature Grid */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { icon: Percentage, label: tServices("account.features.noFees") },
                  { icon: CreditCard, label: tServices("account.features.cards") },
                  { icon: Gift, label: tServices("account.features.benefits") },
                  { icon: DollarCircle, label: tServices("account.features.investments") },
                ].map((feature) => (
                  <div
                    key={feature.label}
                    className="bg-white/60 rounded-2xl p-5 md:p-6 flex flex-col items-center text-center gap-3 md:gap-4 hover:bg-white/80 transition-all duration-300 border border-white/40"
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
