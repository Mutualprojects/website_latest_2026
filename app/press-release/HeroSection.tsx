"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import bg_press from "./immerse-yourself-nostalgia-yesteryears-with-generative-portrayal-words-quotwow.jpg"

export default function HeroSection() {
  const [loading, setLoading] = useState(true)

  const [counts, setCounts] = useState({
    publications: 0,
    articles: 0,
    sources: 0,
  })

  const [finalCounts, setFinalCounts] = useState({
    publications: 0,
    articles: 0,
    sources: 0,
  })

  // 🔥 Fetch data (NO UI CHANGE)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://sheetdb.io/api/v1/h6vfyfkd9ovqg")
        const json = await res.json()

        const publications = json?.length || 0
        const articles = json?.length || 0

        const uniqueSources = new Set(
          (json || []).map((item: any) => item.source || item.publication)
        ).size

        setFinalCounts({
          publications,
          articles,
          sources: uniqueSources,
        })
      } catch (err) {
        console.error("API Error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 🔥 Counter Animation (0 → value)
  useEffect(() => {
    if (loading) return

    const duration = 1000
    const steps = 30

    const animate = (key: keyof typeof finalCounts) => {
      let current = 0
      const end = finalCounts[key]
      const increment = end / steps

      const timer = setInterval(() => {
        current += increment

        if (current >= end) {
          current = end
          clearInterval(timer)
        }

        setCounts((prev) => ({
          ...prev,
          [key]: Math.floor(current),
        }))
      }, duration / steps)
    }

    animate("publications")
    animate("articles")
    animate("sources")
  }, [loading, finalCounts])

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${bg_press.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderBottom: "1px solid #dce8f0",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(3px)",
        }}
      />

      {/* Content (UI preserved) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          position: "relative",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "56px 28px 52px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // SAME AS YOUR ORIGINAL
          textAlign: "center",  // SAME AS YOUR ORIGINAL
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            background: "rgba(7,81,138,0.07)",
            border: "1px solid rgba(7,81,138,0.18)",
            borderRadius: "999px",
            padding: "5px 18px",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#07518a",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#07518a",
            }}
          >
            Media Coverage
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(36px, 5.5vw, 72px)",
            fontWeight: 700,
            color: "#0a1f33",
            lineHeight: 1.06,
            letterSpacing: "-0.02em",
            maxWidth: "660px",
          }}
        >
          Press &amp;{" "}
          <span style={{ color: "#07518a" }}>Publication</span> Hub
        </h1>

        {/* Subtitle */}
        <p
          style={{
            marginTop: "18px",
            fontSize: "15px",
            color: "#5a7285",
            lineHeight: 1.75,
            maxWidth: "430px",
          }}
        >
          Explore our coverage across India&apos;s leading print and digital publications.
        </p>

        {/* Stats (UI SAME, only dynamic values) */}
        {!loading && (
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              background: "#f4f8fb",
              border: "1px solid #dce8f0",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {[
              { value: counts.publications, label: "Publications" },
              { value: counts.articles, label: "Articles" },
              { value: counts.sources, label: "Unique Sources" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: "20px 38px",
                  textAlign: "center",
                  borderRight: i < 2 ? "1px solid #dce8f0" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "40px",
                    fontWeight: 700,
                    color: "#07518a",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    marginTop: "6px",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#7a9aae",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}