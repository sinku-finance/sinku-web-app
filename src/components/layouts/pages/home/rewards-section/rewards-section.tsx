"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { rewardsAnimations } from "./animations";

export function RewardsSection() {
  const t = useTranslations("rewards");

  return (
    <motion.section 
      className="w-full min-h-screen bg-surface-lavender flex flex-col justify-center py-12 md:py-16 lg:py-24 text-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px", amount: 0.1 }}
    >
      <div className="px-6 md:px-10 lg:px-12">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Text content centered at top */}
          <motion.div 
            className="text-center mb-8 md:mb-12 lg:mb-16"
            variants={rewardsAnimations.textContent.variants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-5 leading-tight max-w-4xl mx-auto"
              variants={rewardsAnimations.title.variants}
            >
              {t("title")}
            </motion.h2>
            <motion.p
              className="text-sm md:text-base text-neutral-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={rewardsAnimations.subtitle.variants}
            >
              {t("subtitle")}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center"
              variants={rewardsAnimations.buttons.variants}
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/download-app">
                  {t("primaryButton")}
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent w-full sm:w-auto"
              >
                <Link href="/download-app">
                  {t("secondaryButton")}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Images grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
            variants={rewardsAnimations.imagesGrid.variants}
          >
            {/* Couple with card image - takes 2 columns */}
            <motion.div
              className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden lg:col-span-2"
              variants={rewardsAnimations.image.variants}
            >
              <Image
                src="/cards/couple-with-card.webp"
                alt="Couple using Sinku card"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Card image - takes 1 column */}
            <motion.div
              className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
              variants={rewardsAnimations.image.variants}
            >
              <Image
                src="/cards/card-product.webp"
                alt="Sinku card"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Bottom copy */}
          <motion.p
            className="text-sm md:text-base text-neutral-600 text-center max-w-2xl mx-auto leading-relaxed mt-10 md:mt-14"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("bottomText")}
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
