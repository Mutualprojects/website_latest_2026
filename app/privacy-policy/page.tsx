import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Brihaspathi Technologies Limited – how we collect, use, and protect your information when you use our website and services.",
};

const BRAND = "#07518a";

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-12 border-b border-gray-200 pb-8">
        <h1
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: BRAND }}
        >
          Privacy Policy
        </h1>
        <p className="mt-4 text-gray-600">
          This Privacy Policy explains how we collect, use, and disclose your
          information when you use our Service, along with outlining your
          privacy rights and the protections provided by law. We use your
          personal data to operate and enhance the Service. By accessing or
          using the Service, you consent to the collection and use of information
          in line with this Privacy Policy.
        </p>
      </header>

      <div className="space-y-10 text-gray-700">
        {/* Interpretation and Definitions */}
        <section>
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: BRAND }}
          >
            Interpretation and Definitions
          </h2>
          <h3 className="mb-2 font-medium text-gray-900">Interpretation</h3>
          <p className="mb-4">
            Words with capitalized initials carry specific definitions under the
            conditions given. The following terms hold the same meaning whether
            used in singular or plural form.
          </p>
          <h3 className="mb-2 font-medium text-gray-900">Definitions</h3>
          <p className="mb-4">
            For the purposes of this Privacy Policy:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2">
            <li>
              <strong>Account:</strong> A unique account created for you to
              access our Service or parts of it.
            </li>
            <li>
              <strong>Affiliate:</strong> An entity that controls, is controlled
              by, or is under common control with a party, where “control”
              signifies owning 50% or more of voting shares or comparable
              authority.
            </li>
            <li>
              <strong>Company:</strong> Refers to Brihaspathi Technologies
              Limited, 501, #508–510, Shangrila Plaza, Road No. 2, Park View
              Enclave, Banjara Hills, Hyderabad, Telangana – 500034.
            </li>
            <li>
              <strong>Cookies:</strong> Small files placed on your device that
              store browsing details and preferences.
            </li>
            <li>
              <strong>Country:</strong> Refers to Telangana, India.
            </li>
            <li>
              <strong>Device:</strong> Any tool such as a computer, smartphone,
              or tablet used to access the Service.
            </li>
            <li>
              <strong>Personal Data:</strong> Information relating to an
              identified or identifiable individual.
            </li>
            <li>
              <strong>Service:</strong> Refers to the website.
            </li>
            <li>
              <strong>Service Provider:</strong> Any organization or person
              processing data for the Company.
            </li>
            <li>
              <strong>Usage Data:</strong> Automatically collected data such as
              device info, visit duration, or pages viewed.
            </li>
            <li>
              <strong>Website:</strong> brihaspathi.com.
            </li>
            <li>
              <strong>You:</strong> The person, company, or entity accessing or
              using the Service.
            </li>
          </ul>
        </section>

        {/* Collecting and Using Your Personal Data */}
        <section>
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: BRAND }}
          >
            Collecting and Using Your Personal Data
          </h2>

          <h3 className="mb-2 font-medium text-gray-900">Personal Data</h3>
          <p className="mb-4">
            When using our Service, we may ask you to provide identifiable
            details used to contact or identify you. These may include:
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>Email address</li>
            <li>First and last name</li>
            <li>Phone number</li>
            <li>Usage Data</li>
          </ul>

          <h3 className="mt-6 mb-2 font-medium text-gray-900">Usage Data</h3>
          <p className="mb-4">
            Usage Data is automatically collected and may include your device’s
            IP address, browser type and version, pages visited, visit time,
            duration and other diagnostics.
          </p>

          <h3 className="mt-6 mb-2 font-medium text-gray-900">
            Tracking Technologies and Cookies
          </h3>
          <p className="mb-4">
            We use cookies and similar technologies to monitor activity and
            improve our Service.
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>
              <strong>Browser Cookies:</strong> You may refuse cookies via
              browser settings, but some features may not work.
            </li>
            <li>
              <strong>Web Beacons:</strong> Small electronic files used to count
              visitors or track engagement.
            </li>
          </ul>
          <p className="mt-4 font-medium text-gray-900">Types of Cookies:</p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>
              <strong>Essential Cookies (Session)</strong> – mandatory for core
              functions.
            </li>
            <li>
              <strong>Notice Acceptance Cookies</strong> – record your cookie
              consent.
            </li>
            <li>
              <strong>Functionality Cookies</strong> – remember your preferences
              for a personalized experience.
            </li>
          </ul>
        </section>

        {/* Use of Personal Data */}
        <section>
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: BRAND }}
          >
            Use of Personal Data
          </h2>
          <ul className="list-inside list-disc space-y-2 pl-2">
            <li>Provide, maintain, and improve the Service.</li>
            <li>Manage your account as a registered user.</li>
            <li>Fulfill contractual obligations.</li>
            <li>
              Communicate via email, phone, or app notifications.
            </li>
            <li>
              Offer updates, promotions, and related services (unless opted out).
            </li>
            <li>Handle your requests and inquiries.</li>
            <li>Analyze performance and monitor Service usage.</li>
          </ul>
        </section>

        {/* Retention, Transfer, and Deletion */}
        <section>
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: BRAND }}
          >
            Retention, Transfer, and Deletion
          </h2>
          <p className="mb-4">
            Personal Data is retained only as long as necessary or as required
            by law. Usage Data may be retained for shorter periods. Your data
            may be transferred across jurisdictions with appropriate
            safeguards.
          </p>
          <p>
            You may request deletion of your data via your account settings or
            by contacting us directly. Certain information may be kept if
            legally required.
          </p>
        </section>

        {/* Disclosure and Security */}
        <section>
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: BRAND }}
          >
            Disclosure and Security
          </h2>
          <p>
            Data may be disclosed during business transactions or to comply
            with legal obligations. While we take reasonable steps to secure
            your data, no system can guarantee 100% protection.
          </p>
        </section>

        {/* Children's Privacy */}
        <section>
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: BRAND }}
          >
            Children’s Privacy
          </h2>
          <p>
            We do not knowingly collect data from individuals under 13. Parents
            or guardians should contact us if such data is shared, and it will
            be deleted promptly.
          </p>
        </section>

        {/* Third-Party Links */}
        <section>
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: BRAND }}
          >
            Third-Party Links
          </h2>
          <p>
            Our Service may contain links to external websites. We advise you to
            review their privacy policies as we do not control or assume
            responsibility for them.
          </p>
        </section>

        {/* Updates to This Policy */}
        <section>
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: BRAND }}
          >
            Updates to This Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically. Updates will be
            posted here, and users will be notified before changes take effect.
          </p>
        </section>

        {/* Contact Us */}
        <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: BRAND }}
          >
            Contact Us
          </h2>
          <p className="mb-4">
            For any questions or concerns regarding this Privacy Policy,
            contact us at:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:info@brihaspathi.com"
              className="font-medium underline hover:no-underline"
              style={{ color: BRAND }}
            >
              info@brihaspathi.com
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
