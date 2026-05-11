import React from 'react';

// SVG Icon Components
const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.07 2.07 0 1 1 0 4.138 2.07 2.07 0 0 1 0-4.138zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    />
  </svg>
);

const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="#E1306C"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    />
  </svg>
);

const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="#1877F2"
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.315 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    />
  </svg>
);

const GoogleDriveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="#0066DA" d="m6.6 43.9 12.1-21 26.4 45.5H18.9c-2.4 0-4.6-1.3-5.8-3.4L1.3 51.2c-1.2-2.1-1.2-4.7 0-6.8l5.3-9.1" />
    <path fill="#00AC47" d="m43.1 15.1 12.1 21L28.8 78 6.6 43.9l12.1-21 24.4-7.8" />
    <path fill="#EA4335" d="M74.7 43.9 62.6 22.9 36.2 68.4h29.2c2.4 0 4.6-1.3 5.8-3.4l11.8-20.4c1.2-2.1 1.2-4.7 0-6.8l-5.3-9.1" />
    <path fill="#00832D" d="M43.1 15.1 17.5 7.3c-2.4-.8-5.1-.3-7 1.4L1.3 26.5c-1.2 2.1-1.2 4.7 0 6.8l5.3 9.1" />
    <path fill="#2684FC" d="m69.4 7.6-25.6 7.8 12.1 21 26.4-45.5c1.2-2.1 1.2-4.7 0-6.8L74.7 1.4c-1.2-2.1-3.6-3.1-6-2.5" />
    <path fill="#FFBA00" d="M69.4 7.6 43.8 15.4 17.4 60.9c-1.2 2.1-.9 4.7.9 6.5l18.6 18.1c2.1 2.1 5.5 2.1 7.6 0l25.6-44.3c1.2-2.1 1.2-4.7 0-6.8l-5.3-9.1" />
  </svg>
);

// Types
interface StepBlockProps {
  stepNumber: number;
  title: string;
  description: string;
  gradientClass: string;
  children: React.ReactNode;
}

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  borderColor: string;
  shadowColor: string;
  ariaLabel?: string;
}

interface GoogleReviewButtonProps {
  href: string;
  location: string;
}

// Reusable Components
const StepBlock: React.FC<StepBlockProps> = ({ stepNumber, title, description, gradientClass, children }) => (
  <section className="mb-5" aria-labelledby={`step-${stepNumber}`}>
    <div className="flex items-center gap-3 mb-3">
      <div
        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradientClass} text-white font-bold text-base flex items-center justify-center flex-shrink-0`}
        aria-hidden="true"
      >
        {stepNumber}
      </div>
      <div>
        <h3 id={`step-${stepNumber}`} className="font-['Playfair_Display'] text-lg text-[#0a3060] font-bold">
          {title}
        </h3>
        <p className="text-sm text-[#6b7a99] mt-0.5 font-['DM_Sans']">{description}</p>
      </div>
    </div>
    {children}
  </section>
);

const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  icon,
  title,
  subtitle,
  borderColor,
  shadowColor,
  ariaLabel,
}) => (
  <a
    className="flex items-center justify-start gap-4 w-full min-h-[52px] px-4 py-3.5 rounded-xl font-semibold text-[#1a2340] bg-white border-2 transition-transform active:scale-[0.98] text-left font-['DM_Sans']"
    style={{ borderColor, boxShadow: `0 4px 16px ${shadowColor}` }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel || `${title} - Follow us`}
  >
    <span
      className="w-11 h-11 rounded-xl bg-white border border-black/6 shadow-sm flex-shrink-0 flex items-center justify-center"
      aria-hidden="true"
    >
      {icon}
    </span>
    <span className="flex-1 min-w-0">
      <strong className="block text-[0.95rem] font-['DM_Sans']">{title}</strong>
      <small className="text-[0.75rem] text-[#6b7a99] font-medium font-['DM_Sans']">{subtitle}</small>
    </span>
    <span className="opacity-45 text-xl" aria-hidden="true">›</span>
  </a>
);

const GoogleReviewButton: React.FC<GoogleReviewButtonProps> = ({ href, location }) => (
  <a
    className="flex items-center justify-start gap-4 w-full min-h-[52px] px-4 py-3.5 rounded-xl font-semibold text-[#1a2340] bg-white border-2 border-[rgba(255,152,0,0.35)] shadow-[0_4px_16px_rgba(255,152,0,0.12)] transition-transform active:scale-[0.98] text-left font-['DM_Sans']"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Review us on Google - ${location}`}
  >
    <span
      className="w-11 h-11 rounded-xl bg-white border border-black/6 shadow-sm flex-shrink-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <GoogleIcon className="w-7 h-7" />
    </span>
    <span className="flex-1 min-w-0">
      <strong className="block text-[0.95rem] font-['DM_Sans']">{location}</strong>
      <small className="text-[0.75rem] text-[#6b7a99] font-medium font-['DM_Sans']">Opens Google — post your review</small>
    </span>
    <span className="opacity-45 text-xl" aria-hidden="true">›</span>
  </a>
);

// Main Component
const ThankYouPage: React.FC = () => {
  return (
    <>
      {/* Font imports - add to your _app.tsx or index.html in production */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="min-h-screen w-full bg-[#dfe8f5] text-[#1a2340] font-['DM_Sans'] overflow-x-hidden pb-[env(safe-area-inset-bottom,0px)]">
        {/* Full-width mobile-first shell */}
        <div className="w-full max-w-full mx-auto min-h-screen bg-[#f0f6ff] shadow-[0_0_0_1px_rgba(10,48,96,0.06),0_12px_40px_rgba(10,30,70,0.12)] md:min-h-auto md:rounded-2xl md:my-4">
          {/* Hero Section */}
          <header className="bg-gradient-to-br from-[#0a3060] via-[#1565c0] to-[#00838f] pt-7 px-5 pb-9 text-center relative">
            <div className="absolute bottom-[-1px] left-0 right-0 h-6 bg-[#f0f6ff] rounded-t-[24px]" aria-hidden="true" />

            <div className="inline-block bg-white px-5 py-2.5 rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.2)] mb-4.5">
              <img
                src="https://www.brihaspathi.com/_next/image?url=%2Fhighbtlogo-tm-1.png&w=384&q=75"
                alt="Brihaspathi Technologies — The Guru of Tomorrow's Technology"
                className="block w-auto h-auto max-w-[300px] max-h-16 object-contain"
                width={280}
                height={56}
                loading="eager"
                decoding="async"
              />
            </div>

            <h1 className="font-['Playfair_Display'] text-[1.65rem] text-white leading-tight relative z-10">
              Share your <span className="text-[#ffc107]">Experience</span> with Us
            </h1>
            <p className="text-white/88 text-[0.94rem] leading-relaxed mt-2.5 px-1 relative z-10 font-['DM_Sans']">
              Follow us on LinkedIn and Review Us to tell the world about your experience that matters to us.
            </p>

            <div className="inline-flex items-center gap-1.5 mt-3.5 px-3 py-1.5 bg-white/12 rounded-full text-[0.72rem] font-semibold tracking-widest uppercase text-white/90 font-['DM_Sans']">
              <span aria-hidden="true">✨</span>
              Share Your Voice
            </div>
          </header>

          {/* Content Section */}
          <main className="px-4 pt-2 pb-8 w-full">
            <p className="text-center text-[0.88rem] text-[#6b7a99] mb-5.5 leading-snug font-['DM_Sans']">
              Complete each step in order. Links open in your browser or the right app.
            </p>

            {/* Step 1: LinkedIn & Social Media */}
            <StepBlock
              stepNumber={1}
              title="Follow us on Social Media"
              description="Stay connected for updates & features"
              gradientClass="from-[#e1306c] to-[#f77737]"
            >
              <div className="flex flex-col gap-2.5">
                <a
                  className="flex items-center justify-center gap-3 w-full min-h-[52px] px-4.5 py-3.5 rounded-xl text-[0.95rem] font-semibold text-white bg-gradient-to-br from-[#0077b5] to-[#004471] shadow-[0_6px_20px_rgba(0,119,181,0.35)] transition-transform active:scale-[0.98] no-underline border-0 cursor-pointer font-['DM_Sans']"
                  href="https://www.linkedin.com/company/brihaspathi-technologies/posts/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Brihaspathi on LinkedIn"
                >
                  <span className="flex-shrink-0 flex items-center justify-center" aria-hidden="true">
                    <LinkedInIcon className="w-7 h-7 text-white" />
                  </span>
                  <span>Brihaspathi on LinkedIn — Follow</span>
                </a>
                <SocialButton
                  href="https://www.instagram.com/brihaspathi_tech_official?igsh=MTVnZW90dWt2aGR4dQ=="
                  icon={<InstagramIcon className="w-7 h-7" />}
                  title="Instagram"
                  subtitle="@brihaspathi_tech_official — Follow us"
                  borderColor="rgba(225,48,108,0.35)"
                  shadowColor="rgba(225,48,108,0.12)"
                  ariaLabel="Follow us on Instagram"
                />
                <SocialButton
                  href="https://www.facebook.com/share/1GURAwMeJ2/"
                  icon={<FacebookIcon className="w-7 h-7" />}
                  title="Facebook"
                  subtitle="Share & Follow our page"
                  borderColor="rgba(24,119,242,0.35)"
                  shadowColor="rgba(24,119,242,0.12)"
                  ariaLabel="Follow us on Facebook"
                />
              </div>
              <p className="text-[0.76rem] text-[#6b7a99] text-center mt-2.5 leading-snug font-['DM_Sans']">
                Tap to open in the Instagram, Facebook, or LinkedIn app. Follow us to stay updated!
              </p>
            </StepBlock>

            <div className="h-px bg-gradient-to-r from-transparent via-[rgba(21,101,192,0.15)] to-transparent my-2" role="presentation" />

            {/* Step 2: Google Reviews */}
            <StepBlock
              stepNumber={2}
              title="Rate and Review us"
              description="One review per location — thank you!"
              gradientClass="from-[#f57c00] to-[#ffc107]"
            >
              <div className="flex flex-col gap-2.5">
                <GoogleReviewButton 
                  href="https://www.google.com/search?newwindow=1&sca_esv=b4a9fe7ec4bea108&sxsrf=ANbL-n7jHhd06hp1KyMGwek4A8qOJArX-w:1776153444735&si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_xxUiOjdf6CqXGTUOF_po2VnIHDqzlOdCn5itclrdQa3kzpobBiMNdZBprA_KbxO-uZyNZ0CFIwq5aka2LbMkfNAak8aHmMIx8ZUMNE3VYkqNTYcHow%3D%3D&q=Brihaspathi+Technologies+Limited+Reviews&sa=X&ved=2ahUKEwiti4-Z7-yTAxUpS3ADHU9GHrAQ0bkNegQIORAH&biw=1280&bih=585&dpr=1.5" 
                  location="Hyderabad" 
                />
                <GoogleReviewButton 
                  href="https://www.google.com/search?newwindow=1&sca_esv=cc8ec0ad96f8d793&sxsrf=ANbL-n4B9d6nvHetUmYHYqsHjwY25rEYXA:1776153854717&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOeznlbM828_NmjupvHJjra-yBwmlPDrORRFFkS84hl4fJjL7DFYGwMsX3MqB1OWPbnXhmupCIrSX4qnjT_8j06RlVhvNZ8yy92k21vuKiJc4xvZfoDdizq4KFXtQKLiD3NrW-wg%3D&q=Brihaspathi+Technologies+Limited+%28Kolkata%29+Reviews&sa=X&ved=2ahUKEwj4us7c8OyTAxUwUGwGHZ8WNPUQ0bkNegQIIRAH&biw=1280&bih=585&dpr=1.5" 
                  location="Kolkata" 
                />
                <GoogleReviewButton 
                  href="https://www.google.com/search?newwindow=1&sca_esv=cc8ec0ad96f8d793&sxsrf=ANbL-n5JDjZjZDTGNEy6cuw4_vUvLUi2lQ:1776153933206&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOckJiWCX4KSzYPSK6EMWj5MRpgQwW3DEoaxBBIB_tWA1oj4Gheod6mTgISbgzp08F7HFKzAnDACSXgMiDW_BZVNm95aoH01tka-zn6oQOzXDXAspe2wOCxSjElTEG0hJO9il6Sc%3D&q=Brihaspathi+Technologies+Limited+%28Assam%29+Reviews&sa=X&ved=2ahUKEwjI8YSC8eyTAxVfTmwGHQoCEesQ0bkNegQIKBAH&biw=1280&bih=585&dpr=1.5" 
                  location="Assam" 
                />
              </div>
              <p className="text-[0.76rem] text-[#6b7a99] text-center mt-2.5 leading-snug font-['DM_Sans']">
                Each link opens the right listing in Google so you can rate and write your review on your phone.
              </p>
            </StepBlock>

            <div className="h-px bg-gradient-to-r from-transparent via-[rgba(21,101,192,0.15)] to-transparent my-2" role="presentation" />

            {/* Step 3: Video Testimonial */}
            <StepBlock
              stepNumber={3}
              title="Video testimonial"
              description="Upload to our Google Drive folder"
              gradientClass="from-[#7b1fa2] to-[#e91e63]"
            >
              <div className="bg-white rounded-2xl p-4 border-[1.5px] border-[rgba(123,31,162,0.15)] shadow-[0_6px_24px_rgba(123,31,162,0.08)]">
                <div className="grid gap-2.5 my-3.5">
                  <div className="flex gap-2.5 items-start text-[0.8rem] text-[#6b7a99] leading-snug font-['DM_Sans']">
                    <strong className="text-[#0a3060] min-w-[18px] text-[0.75rem] font-['DM_Sans']">①</strong>
                    <span>Record 1–3 minutes on your phone (your story with Brihaspathi).</span>
                  </div>
                  <div className="flex gap-2.5 items-start text-[0.8rem] text-[#6b7a99] leading-snug font-['DM_Sans']">
                    <strong className="text-[#0a3060] min-w-[18px] text-[0.75rem] font-['DM_Sans']">②</strong>
                    <span>Tap upload below — add the file in Drive (use guest upload if prompted).</span>
                  </div>
                  <div className="flex gap-2.5 items-start text-[0.8rem] text-[#6b7a99] leading-snug font-['DM_Sans']">
                    <strong className="text-[#0a3060] min-w-[18px] text-[0.75rem] font-['DM_Sans']">③</strong>
                    <span>
                      Name file: <em className="text-[#0a3060] not-italic font-['DM_Sans']">YourName_Company_Testimonial.mp4</em>
                    </span>
                  </div>
                </div>
                <a
                  className="flex items-center justify-center gap-3 w-full min-h-[52px] px-4.5 py-3.5 rounded-xl text-[0.95rem] font-semibold text-white bg-gradient-to-br from-[#43a047] to-[#1b5e20] shadow-[0_6px_20px_rgba(67,160,71,0.35)] transition-transform active:scale-[0.98] no-underline border-0 cursor-pointer font-['DM_Sans']"
                  href="https://drive.google.com/drive/folders/1dOEAyRdKbUQpD_iD3fPWqi_3GzFqfJ_i?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Upload video testimonial to Google Drive"
                >
                  <span className="flex-shrink-0 flex items-center justify-center" aria-hidden="true">
                    <GoogleDriveIcon className="w-7 h-7" />
                  </span>
                  <span>Upload video to Google Drive</span>
                </a>
              </div>
            </StepBlock>

            <div className="h-px bg-gradient-to-r from-transparent via-[rgba(21,101,192,0.15)] to-transparent my-2" role="presentation" />
          </main>

          {/* Important Note */}
          <aside
            className="mx-4 mb-2 px-4 py-4 bg-gradient-to-br from-[rgba(255,193,7,0.12)] to-[rgba(21,101,192,0.08)] border-[1.5px] border-[rgba(255,193,7,0.45)] rounded-2xl shadow-[0_4px_18px_rgba(10,48,96,0.08)]"
            aria-labelledby="important-note-heading"
          >
            <h2
              id="important-note-heading"
              className="font-['Playfair_Display'] text-sm text-[#0a3060] font-bold tracking-wider uppercase mb-2.5"
            >
              IMPORTANT NOTE
            </h2>
            <p className="text-[0.84rem] text-[#1a2340] leading-relaxed m-0 font-['DM_Sans']">
              Post election, we will be posting all the videos on our official channels and tagging you. Make sure to
              follow our page so that we can identify you and give you the recognition you deserve!
            </p>
          </aside>

          {/* Footer */}
          <footer className="text-center px-4 pt-5 pb-7 text-[0.78rem] text-[#6b7a99] leading-relaxed font-['DM_Sans']">
            <strong className="text-[#0a3060] font-['DM_Sans']">Brihaspathi Technologies Limited</strong>
            <br />
            #501, Shangrila Plaza, Road No. 2, Hyderabad
            <br />
            <a href="mailto:info@brihaspathi.com" className="text-[#1976d2] no-underline hover:underline font-['DM_Sans']">
              info@brihaspathi.com
            </a>
            <br />
            <a
              href="https://www.brihaspathi.com"
              target="_blank"
              rel="noopener"
              className="text-[#1976d2] no-underline hover:underline font-['DM_Sans']"
            >
              brihaspathi.com
            </a>
            <span className="italic font-['DM_Sans']"> — The Guru of Tomorrow's Technology</span>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;