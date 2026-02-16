import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions governing your access and use of Brihaspathi Technologies website, products, and services.",
};

const BRAND = "#07518a";

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="border-b border-gray-200 px-4 py-16 sm:px-6 lg:px-8"
        style={{ borderBottomColor: `${BRAND}20` }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-base text-gray-600">
            Please read these terms carefully. They govern your access, use, and
            interaction with Brihaspathi Technologies.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-gray max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-gray-600 prose-li:text-gray-600">
          <p className="text-lg leading-relaxed">
            Welcome to Brihaspathi Technologies. By accessing or using our
            website, products, or services, you agree to the following Terms and
            Conditions. Please read them carefully as they govern your access,
            use, and interaction with all our offerings.
          </p>

          <h2 className="mt-10 text-xl" style={{ color: BRAND }}>
            Eligibility
          </h2>
          <p>
            Use of our services is permitted only to individuals and entities
            who can form legally binding contracts under applicable laws. By
            engaging with our platform, you represent that you meet all
            eligibility criteria and agree to abide by these Terms.
          </p>

          <h2 className="mt-10 text-xl" style={{ color: BRAND }}>
            Service Usage
          </h2>
          <p>
            Brihaspathi Technologies provides IT solutions, software
            applications, electronic security systems, automation products, and
            associated services. Your use of these offerings is subject to
            applicable licenses, service-level agreements, and contractual
            obligations shared at the time of engagement.
          </p>

          <h2 className="mt-10 text-xl" style={{ color: BRAND }}>
            Account Responsibility
          </h2>
          <p>
            Users are responsible for maintaining the confidentiality of account
            credentials and any activities performed under their login. All
            actions taken using your credentials are deemed to be your
            responsibility unless promptly reported in writing. Brihaspathi
            Technologies shall not be held liable for unauthorized access
            resulting from negligence or misuse.
          </p>

          <h2 className="mt-10 text-xl" style={{ color: BRAND }}>
            Prohibited Activities
          </h2>
          <p>
            Users agree not to engage in activities that violate laws, infringe
            on intellectual property, or disrupt service operations. The
            following actions are strictly prohibited:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Unauthorized reproduction, copying, or redistribution of our
              software, content, or proprietary designs.
            </li>
            <li>
              Reverse engineering, modification, or tampering with proprietary
              technologies without prior written approval.
            </li>
            <li>
              Engaging in fraudulent, abusive, or malicious conduct that may
              harm other users or affect the security and integrity of our
              systems.
            </li>
          </ul>

          <h2 className="mt-10 text-xl" style={{ color: BRAND }}>
            Fees and Payments
          </h2>
          <p>
            Fees and payment terms are defined within quotations, invoices, or
            service agreements. Payments must be made according to the mutually
            agreed schedule. Delays or incomplete transactions may lead to
            suspension of services, additional charges, or termination as per
            policy.
          </p>

          <h2 className="mt-10 text-xl" style={{ color: BRAND }}>
            Disclaimer
          </h2>
          <p>
            While Brihaspathi Technologies strives to ensure accuracy,
            reliability, and availability of its content and services, we do not
            warrant completeness, timeliness, or uninterrupted functionality.
            All materials and offerings are provided &quot;as is&quot; and
            &quot;as available,&quot; and use of the Service is entirely at your
            own risk.
          </p>

          <h2 className="mt-10 text-xl" style={{ color: BRAND }}>
            Limitation of Liability
          </h2>
          <p>
            In no event shall Brihaspathi Technologies, its directors, employees,
            or affiliates be liable for any direct, indirect, incidental,
            consequential, or special damages arising out of or in connection
            with the use or inability to use our website, software, or services.
            This includes but is not limited to loss of profits, data, or
            business continuity.
          </p>

          <h2 className="mt-10 text-xl" style={{ color: BRAND }}>
            Changes to Terms
          </h2>
          <p>
            We reserve the right to modify or update these Terms and Conditions
            at any time without prior notice. Updates become effective upon
            publication on this page. Continued use of our services constitutes
            acceptance of the revised Terms.
          </p>

          <h2 className="mt-10 text-xl" style={{ color: BRAND }}>
            Governing Law and Jurisdiction
          </h2>
          <p>
            These Terms and all related matters shall be governed by the laws of
            Telangana, India. All disputes shall fall under the exclusive
            jurisdiction of courts located in Hyderabad, Telangana.
          </p>

          <h2 className="mt-10 text-xl" style={{ color: BRAND }}>
            Related Policies
          </h2>
          <p>
            For more information about our data handling and privacy practices,
            please refer to our{" "}
            <Link
              href="/privacy-policy"
              className="font-medium underline underline-offset-2 hover:opacity-90"
              style={{ color: BRAND }}
            >
              Privacy Policy
            </Link>{" "}
            and other supporting documentation available on our website.
          </p>

          <p className="mt-12 rounded-lg border border-gray-200 bg-gray-50 px-4 py-4 text-gray-700">
            Thank you for choosing Brihaspathi Technologies. Your continued
            trust inspires our commitment to innovation, transparency, and
            service excellence.
          </p>
        </div>
      </section>
    </main>
  );
}
