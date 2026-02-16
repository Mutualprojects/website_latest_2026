"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Form, Input, message } from "antd";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Home,
  UserRound,
  Shield,
  Lock,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import Turnstile from "react-turnstile";
import Image from "next/image";
import logoImage from "../images/sollutionimages/logos/highbtlogo-tm-1.png";

const BRAND = "#07518a";

/** Office address type */
interface OfficeAddress {
  city: string;
  address: string;
  isHeadOffice?: boolean;
}

const getMapUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

/** Head office (single) */
const HEAD_OFFICE: OfficeAddress = {
  city: "Hyderabad",
  address: "5th Floor, 7-1-621/259, Sahithi Arcade, Beside S R Nagar Police Station, S R Nagar, Hyderabad, Telangana 500038",
  isHeadOffice: true,
};

/** Branch offices for contact page */
const BRANCH_OFFICES: OfficeAddress[] = [
  { city: "Delhi", address: "201 A Block, Naurang House, Connaught Lane, K G Marg, New Delhi, Delhi 110001" },
  { city: "Bengaluru", address: "1st Floor, A52, RPR Complex, Kamadenu Nagar, Bengaluru, Karnataka 560016" },
  { city: "Lucknow", address: "H No. 554-GA/277, Alambagh Road, Guru Nanak Nagar, Lucknow, Uttar Pradesh 226005" },
  { city: "Chennai", address: "2nd Floor, New Door No. 32, Old Door No. 117, Plot No. C 10, Ravilla Towers, W Block, 3rd Avenue, Anna Nagar, Chennai, Tamil Nadu 600040" },
  { city: "Navi Mumbai", address: "13th Floor, Plot No. 12, Sector 10, CBD Belapur, Navi Mumbai, Thane, Maharashtra 400614" },
  { city: "Patna", address: "Khesra No. 173, 1174/569, C-249, Ward No. 23, S P Sinha Path, East Boring Canal Road, Kotwali, Patna, Bihar 800001" },
  { city: "Kolkata", address: "Floor No. 5, H No. 83, S P Mukherjee Road, Devi Market, Kolkata, West Bengal 700026" },
  { city: "Guwahati", address: "Udayan Vihar, Dalbari, Bishnu Rabha Byelane, Guwahati, Kamrup Metropolitan, Assam 781171" },
  { city: "Palampur", address: "Palampur Tehsil, Near Income Tax Office, Behind Toy Store, Palampur, Kangra, Himachal Pradesh 176061" },
  { city: "Bhopal", address: "LIG-G-01, Bawadia Kala, Fortune Glory Ext 2, Rohit Nagar, Bhopal, Madhya Pradesh 462026" },
  { city: "Kurnool", address: "45/204-A1-3, Near KNR High School, Venkata Ramana Colony Road, Ashok Nagar, Kurnool, Andhra Pradesh 518005" },
  { city: "Chandigarh", address: "WorkYard Coworking Spaces, Phase-2, Plot No. 337, Industrial & Business Park, Chandigarh 160002" },
];

/** All offices for nationwide presence (head + branches) */
const ALL_OFFICES: OfficeAddress[] = [HEAD_OFFICE, ...BRANCH_OFFICES];

// Cloudflare Turnstile sitekey (public key)
const TURNSTILE_SITE_KEY = "0x4AAAAAACNkR2ryvzP3rHKe";

/* ===== Motion helpers ===== */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 },
};

const stagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: { opacity: 0 },
};

const btnWhile = {
  whileHover: { scale: 1.03, y: -1 },
  whileTap: { scale: 0.98, y: 0 },
};

const pulseAnimation = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

// Type for contact form values
interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  company_website?: string; // Honeypot field
}

const ContactFormBrand: React.FC = () => {
  const [form] = Form.useForm<ContactFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileKey, setTurnstileKey] = useState<number>(Date.now());
  const [captchaError, setCaptchaError] = useState<boolean>(false);
  const [turnstileLoading, setTurnstileLoading] = useState<boolean>(true);
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState<ContactFormValues | null>(null);

  const turnstileRef = useRef<any>(null);
  const router = useRouter();

  // Handle Turnstile widget load
  const handleTurnstileLoad = (widgetId: string) => {
    setTurnstileWidgetId(widgetId);
    setTurnstileLoading(false);
    console.log("Turnstile widget loaded:", widgetId);
  };

  // Handle Turnstile verification
  const handleTurnstileVerify = (token: string) => {
    console.log("Turnstile verified, token:", token ? "Received" : "Empty");
    setTurnstileToken(token);
    setCaptchaError(false);

    if (token) {
      message.success({
        content: "✓ Security verification complete",
        duration: 2,
        style: { marginTop: "20px" },
      });
    }
  };

  // Handle Turnstile error
  const handleTurnstileError = () => {
    console.error("Turnstile error occurred");
    setTurnstileToken("");
    setCaptchaError(true);
    message.error({
      content: "❌ Security verification failed. Please try again.",
      duration: 3,
    });

    // Auto-retry after error
    setTimeout(() => {
      if (turnstileRef.current) {
        turnstileRef.current.reset();
      }
    }, 1000);
  };

  // Handle Turnstile expire
  const handleTurnstileExpire = () => {
    console.log("Turnstile token expired");
    setTurnstileToken("");
    setCaptchaError(true);
    message.warning({
      content: "⚠️ Security verification expired. Please verify again.",
      duration: 3,
    });
  };

  // Reset Turnstile - without using ref
  const resetTurnstile = () => {
    setTurnstileToken("");
    setTurnstileKey(Date.now());
    setCaptchaError(false);
    setTurnstileLoading(true);
    // Force remount by updating key instead of using ref
  };

  // Handle form submission
  const onFinish = async (values: ContactFormValues) => {
    console.log("Form submitted with values:", values);
    console.log("Turnstile token present:", !!turnstileToken);

    if (values.company_website) {
      console.warn("Bot detected via honeypot");
      return; // silently stop submission
    }

    // Validate Turnstile token
    if (!turnstileToken) {
      setCaptchaError(true);
      message.error({
        content: "❌ Please complete the security verification!",
        duration: 3,
      });

      // Scroll to Turnstile widget
      setTimeout(() => {
        const turnstileElement = document.querySelector(".turnstile-widget");
        if (turnstileElement) {
          turnstileElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });

          // Add visual highlight
          turnstileElement.setAttribute(
            "style",
            "box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.5); border-radius: 4px;"
          );
          setTimeout(() => {
            turnstileElement.setAttribute("style", "");
          }, 1500);
        }
      }, 100);

      return;
    }

    // Store form data for potential retry
    setFormData(values);

    // Start loading
    setLoading(true);
    setCaptchaError(false);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        phone: values.phone,
        message: values.message,
        subject: "Website Contact Form Submission",
        captcha_verified: "YES",
        captcha_token: turnstileToken.substring(0, 20) + "...", // Send partial token for reference
        submission_time: new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "long",
        }),
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        page_url: typeof window !== "undefined" ? window.location.href : "",
      };

      console.log("Sending email with params:", templateParams);

      // Send email via EmailJS
      const result = await emailjs.send(
        "service_octtqss", // Service ID
        "template_h9493t4", // Template ID
        templateParams,
        "58795tHcPT-Gj8W3F" // Public Key
      );

      console.log("EmailJS success:", result);

      // Success handling
      setSubmitted(true);
      message.success({
        content: (
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={20} />
            <span className="font-semibold">Message sent successfully!</span>
          </div>
        ),
        duration: 5,
      });

      // Reset form and Turnstile
      form.resetFields();
      resetTurnstile();
    } catch (error: unknown) {
      console.error("EmailJS error:", error);

      let errorMessage = "Failed to send message. Please try again.";

      if (error && typeof error === "object" && "text" in error) {
        const err = error as { text: string };
        try {
          const errorData = JSON.parse(err.text);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = err.text;
        }
      }

      message.error({
        content: (
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-semibold">
              ❌ {errorMessage}
            </span>
          </div>
        ),
        duration: 5,
      });

      // Reset Turnstile on error
      resetTurnstile();
    } finally {
      setLoading(false);
    }
  };

  // Handle retry submission (if form data exists)
  const handleRetrySubmit = () => {
    if (formData) {
      onFinish(formData);
    }
  };

  // Handle send another message
  const handleSendAnother = () => {
    setSubmitted(false);
    setFormData(null);
    resetTurnstile();
  };

  // Add effect to handle initial Turnstile load timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (turnstileLoading) {
        console.log("Turnstile loading timeout - resetting");
        resetTurnstile();
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timer);
  }, [turnstileLoading]);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: `conic-gradient(from 0deg, ${BRAND}, transparent 50%)`,
            filter: "blur(40px)",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 opacity-10"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: `conic-gradient(from 180deg, ${BRAND}, transparent 50%)`,
            filter: "blur(40px)",
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          /* ================ CONTACT FORM ================ */
          <motion.div
            key="contact-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0 mb-16">
              {/* Left Panel - Contact info (white) */}
              <motion.div
                variants={stagger}
                initial="initial"
                animate="animate"
                className="bg-white p-8 md:p-10 lg:p-12 flex flex-col justify-center rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none shadow-lg"
              >
                <p
                  className="text-sm font-semibold tracking-widest uppercase mb-2"
                  style={{ color: BRAND }}
                >
                  — Contact us today!
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Take the first step
                </h1>
                <p className="text-gray-600 mb-8 max-w-lg">
                  Ready to transform your digital presence? Get in touch with our team and let&apos;s build something amazing together.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND}18` }}>
                      <MapPin size={20} style={{ color: BRAND }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Head office</h4>
                      <p className="text-gray-600 text-sm mt-1">{HEAD_OFFICE.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND}18` }}>
                      <Mail size={20} style={{ color: BRAND }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Mail us for information</h4>
                      <a href="mailto:info@brihaspathi.com" className="text-gray-600 hover:underline mt-1 inline-block">info@brihaspathi.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND}18` }}>
                      <Phone size={20} style={{ color: BRAND }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Helpline number</h4>
                      <a href="tel:+919885888835" className="text-gray-600 hover:underline mt-1 inline-block">+91 98858 88835</a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Panel - Form on brand background */}
              <motion.div
                variants={fadeUp(0.2)}
                initial="initial"
                animate="animate"
                className="p-8 md:p-10 lg:p-12 flex flex-col justify-center rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none shadow-xl"
                style={{ background: `linear-gradient(135deg, ${BRAND}, #0a5a9c)` }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  Send us a message
                </h2>
                <p className="text-white/90 text-sm mb-6">
                  Help us to know you better. Fill in the details and our team will contact you shortly.
                </p>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  requiredMark={false}
                  className="space-y-5"
                >
                  {/* Honeypot Field - Hidden from users */}
                  <Form.Item
                    name="company_website"
                    style={{ display: "none" }}
                  >
                    <Input autoComplete="off" tabIndex={-1} />
                  </Form.Item>

                  {/* Name Field */}
                  <Form.Item
                    label={
                      <span className="font-medium text-white">
                        Full Name <span className="text-red-300">*</span>
                      </span>
                    }
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your name",
                      },
                      {
                        min: 2,
                        message: "Name must be at least 2 characters",
                      },
                      {
                        max: 100,
                        message: "Name must be less than 100 characters",
                      },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter your full name"
                      className="rounded-lg border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 transition-all"
                      style={{
                        height: "48px",
                        fontSize: "16px",
                      }}
                    />
                  </Form.Item>

                  {/* Email Field */}
                  <Form.Item
                    label={
                      <span className="font-medium text-white">
                        Email Address <span className="text-red-300">*</span>
                      </span>
                    }
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your email address",
                      },
                      {
                        type: "email",
                        message: "Please enter a valid email address",
                      },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Input
                      size="large"
                      placeholder="you@example.com"
                      className="rounded-lg border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 transition-all"
                      style={{
                        height: "48px",
                        fontSize: "16px",
                      }}
                    />
                  </Form.Item>

                  {/* Phone Field */}
                  <Form.Item
                    label={
                      <span className="font-medium text-white">
                        Phone Number <span className="text-red-300">*</span>
                      </span>
                    }
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number",
                      },
                      {
                        pattern: /^[6-9]\d{9}$/,
                        message:
                          "Please enter a valid 10-digit Indian phone number",
                      },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Input
                      size="large"
                      placeholder="+91 98765 43210"
                      className="rounded-lg border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 transition-all"
                      style={{
                        height: "48px",
                        fontSize: "16px",
                      }}
                    />
                  </Form.Item>

                  {/* Message Field */}
                  <Form.Item
                    label={
                      <span className="font-medium text-white">
                        Your Message <span className="text-red-300">*</span>
                      </span>
                    }
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your message",
                      },
                      {
                        min: 10,
                        message: "Message must be at least 10 characters",
                      },
                      {
                        max: 1000,
                        message: "Message must be less than 1000 characters",
                      },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Tell us about your project, requirements, or any questions you have..."
                      className="rounded-lg border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 transition-all resize-none"
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.5",
                      }}
                    />
                  </Form.Item>

                  {/* Cloudflare Turnstile Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Lock size={16} className="text-white" />
                          <span className="font-medium text-white">
                            Security Verification
                          </span>
                          <span className="text-red-300">*</span>
                        </div>

                        {turnstileToken && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1 text-sm bg-green-50 px-2 py-1 rounded-full"
                          >
                            <CheckCircle size={14} className="text-green-600" />
                            <span className="text-green-700">Verified</span>
                          </motion.div>
                        )}
                      </div>

                      <div
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          captchaError
                            ? "border-red-300 bg-red-50"
                            : turnstileToken
                            ? "border-green-300 bg-green-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        {/* Turnstile Loading State */}
                        {turnstileLoading && !turnstileToken && (
                          <div className="flex flex-col items-center justify-center py-8">
                            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                            <p className="text-gray-500 text-sm">
                              Loading security verification...
                            </p>
                          </div>
                        )}

                        {/* Turnstile Widget - without ref prop */}
                        <div className="flex justify-center">
                          <Turnstile
                            key={turnstileKey}
                            sitekey={TURNSTILE_SITE_KEY}
                            onVerify={handleTurnstileVerify}
                            onError={handleTurnstileError}
                            onExpire={handleTurnstileExpire}
                            onLoad={handleTurnstileLoad}
                            theme="light"
                            size="normal"
                            retry="auto"
                            retryInterval={3000}
                            refreshExpired="auto"
                            className="turnstile-widget"
                          />
                        </div>

                        {/* Status Message */}
                        <div
                          className={`mt-4 text-center text-sm px-4 py-2 rounded-lg ${
                            turnstileToken
                              ? "text-green-700 bg-green-100"
                              : captchaError
                              ? "text-red-700 bg-red-100"
                              : "text-gray-600 bg-gray-100"
                          }`}
                        >
                          {turnstileToken ? (
                            <div className="flex items-center justify-center gap-2">
                              <CheckCircle size={16} />
                              <span>Security verification complete</span>
                            </div>
                          ) : captchaError ? (
                            <div className="flex items-center justify-center gap-2">
                              <span>❌ Please complete the security verification</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <Shield size={16} />
                              <span>Please verify you&apos;re human to continue</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Helper Text */}
                      <p className="mt-2 text-xs text-gray-500 text-center">
                        This helps us prevent spam and automated submissions
                      </p>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <Form.Item>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.button
                        type="submit"
                        disabled={loading || !turnstileToken}
                        className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                          loading
                            ? "opacity-80 cursor-not-allowed"
                            : !turnstileToken
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:shadow-xl"
                        }`}
                        style={{
                          background: turnstileToken && !loading
                            ? "#1e3a5f"
                            : "#9ca3af",
                          color: "white",
                        }}
                        whileHover={
                          turnstileToken && !loading
                            ? {
                                scale: 1.02,
                                boxShadow: "0 10px 25px rgba(7, 81, 138, 0.3)",
                              }
                            : {}
                        }
                        whileTap={turnstileToken && !loading ? { scale: 0.98 } : {}}
                      >
                        {loading ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            <span>
                              {turnstileToken ? "SUBMIT NOW" : "Complete Security First"}
                            </span>
                          </>
                        )}
                      </motion.button>

                      {/* Retry Button (if form data exists) */}
                      {formData && !turnstileToken && (
                        <motion.button
                          type="button"
                          onClick={handleRetrySubmit}
                          className="mt-4 w-full py-3 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          Retry Submission
                        </motion.button>
                      )}

                      {/* Privacy Note */}
                      <p className="mt-4 text-xs text-white/80 text-center">
                        By submitting this form, you agree to our privacy
                        policy. We&apos;ll never share your information with third
                        parties.
                      </p>
                    </motion.div>
                  </Form.Item>
                </Form>
              </motion.div>
            </div>

            {/* Our Nationwide Presence */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 pt-12 border-t border-gray-200"
            >
              <div className="flex flex-col items-center mb-10">
                <div className="flex items-center gap-4 w-full max-w-md mb-4">
                  <div className="flex-1 h-px bg-gray-300" style={{ background: `linear-gradient(90deg, transparent, ${BRAND})` }} />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">
                    Our Nationwide Presence
                  </h2>
                  <div className="flex-1 h-px bg-gray-300" style={{ background: `linear-gradient(90deg, ${BRAND}, transparent)` }} />
                </div>
                <p className="text-gray-600 text-center max-w-xl">
                  Reach out to us today and start your journey with Brihaspathi Technologies.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {ALL_OFFICES.map((office, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${BRAND}15` }}>
                      <MapPin size={22} style={{ color: BRAND }} />
                    </div>
                    <h3 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-2">
                      {office.city}
                      {office.isHeadOffice && (
                        <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">H.O</span>
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{office.address}</p>
                    <a
                      href={getMapUrl(office.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                      style={{ color: BRAND }}
                    >
                      <MapPin size={14} />
                      View on Map
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        ) : (
          /* ================ THANK YOU PAGE ================ */
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl border border-blue-100 shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Panel - Success Message */}
                <div className="p-8 md:p-12">
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                  >
                    <Image
                      src={logoImage}
                      alt="Brihaspathi Technologies"
                      className="h-12 w-auto mb-6"
                      width={120}
                      height={48}
                    />

                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
                      >
                        <CheckCircle className="text-white" size={24} />
                      </motion.div>
                      <h1
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: BRAND }}
                      >
                        Message Sent Successfully!
                      </h1>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                            <Shield size={20} className="text-green-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-green-800 mb-2">
                            ✓ Secure & Verified Submission
                          </h3>
                          <p className="text-green-700">
                            Your message was protected by Cloudflare Turnstile
                            and has been securely delivered to our team.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3
                        className="text-xl font-bold"
                        style={{ color: BRAND }}
                      >
                        What happens next?
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <span
                              className="text-sm font-bold"
                              style={{ color: BRAND }}
                            >
                              1
                            </span>
                          </div>
                          <span className="text-gray-700">
                            You&apos;ll receive a confirmation email shortly
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <span
                              className="text-sm font-bold"
                              style={{ color: BRAND }}
                            >
                              2
                            </span>
                          </div>
                          <span className="text-gray-700">
                            Our team will review your enquiry within 24 hours
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <span
                              className="text-sm font-bold"
                              style={{ color: BRAND }}
                            >
                              3
                            </span>
                          </div>
                          <span className="text-gray-700">
                            We&apos;ll schedule a free consultation call at your
                            convenience
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    <motion.button
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${BRAND}, #0a5a9c)`,
                      }}
                      onClick={() => router.push("/")}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Home size={20} />
                      <span>Home</span>
                    </motion.button>

                    <motion.button
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${BRAND}, #0a5a9c)`,
                      }}
                      onClick={() => router.push("/founder")}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <UserRound size={20} />
                      <span>Our Founder</span>
                    </motion.button>

                    <motion.button
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-gray-800 bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                      onClick={handleSendAnother}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={20} />
                      <span>Send Another</span>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Right Panel - Celebration */}
                <div className="relative p-8 md:p-12 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
                  <div className="absolute inset-0">
                    {/* Animated background elements */}
                    <motion.div
                      className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-20"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        background: `radial-gradient(circle, ${BRAND}, transparent)`,
                      }}
                    />
                    <motion.div
                      className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10"
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [360, 180, 0],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        background: `radial-gradient(circle, ${BRAND}, transparent)`,
                      }}
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="relative text-center"
                  >
                    <div className="mb-8">
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Image
                          src={logoImage}
                          alt="Brihaspathi Technologies"
                          className="h-16 w-auto mx-auto mb-6"
                          width={160}
                          height={64}
                        />
                      </motion.div>
                      <motion.h2
                        className="text-2xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        Thank You for Choosing Us
                      </motion.h2>
                      <motion.p
                        className="text-gray-600 max-w-sm mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        We&apos;re excited to work with you! Our team is dedicated
                        to delivering exceptional solutions that drive your
                        business forward.
                      </motion.p>
                    </div>

                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: BRAND }}
                      >
                        Typically responds within 2 hours
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactFormBrand;
