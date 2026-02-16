"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image, { StaticImageData } from "next/image"
import { cn } from "@/lib/utils"

interface Feature {
  step: string
  title?: string
  content: string
  image: string | StaticImageData   // ✅ NOW works with imports or URLs
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
}

export function FeatureSteps({
  features,
  className,
  title = "How to Get Started",
  autoPlayInterval = 3000,
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentFeature((prevStep) => (prevStep + 1) % features.length)
          return 0
        }
        return prev + 100 / (autoPlayInterval / 100)
      })
    }, 100)

    return () => clearInterval(timer)
  }, [features.length, autoPlayInterval])

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center text-[#07518A]">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">

          {/* LEFT — STEPS */}
          <div className="order-2 md:order-1 space-y-28">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white shadow",
                    index === currentFeature && "scale-110"
                  )}
                >
                  {index <= currentFeature ? (
                    <span className="text-lg font-bold text-[#07518A]">✓</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#07518A]">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT — IMAGE SLIDESHOW */}
          <div
            className={cn(
              "order-1 md:order-2 relative w-full aspect-[16/16] overflow-hidden rounded-xl shadow-lg"
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.step}
                        fill
                        priority
                        className="object-cover"
                      />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
