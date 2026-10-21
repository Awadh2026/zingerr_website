import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO.jsx";
import {
  BusinessLegalPage,
  BusinessPageLayout,
  LegalSection,
} from "../components/ZingerrBusinessLayout";

const businessUrl = "https://www.awadhinfosolution.in/#/zingerr-business";

function FeatureCard({ number, title, description }) {
  return (
    <article className="border-t border-[#cbd8cc] py-5">
      <p className="font-serif text-sm text-[#df704c]">{number}</p>
      <h3 className="mt-2 text-lg font-semibold text-[#17462f]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#617167]">{description}</p>
      <span className="mt-3 inline-flex rounded-full bg-[#fff1e8] px-3 py-1 text-xs font-semibold text-[#8e482c]">
        Planned · release status to confirm
      </span>
    </article>
  );
}

export function ZingerrBusinessAbout() {
  useSEO({
    title: "About Zingerr Business | Restaurant Partner App",
    description: "Learn about Zingerr Business, Awadh Info Solution's application for restaurant owners and business partners on the Zingerr platform.",
    keywords: "Zingerr Business, restaurant partner app, restaurant onboarding, Awadh Info Solution",
    url: `${businessUrl}/about`,
  });

  return (
    <BusinessPageLayout
      current="About"
      eyebrow="A business companion for Zingerr"
      title="Your restaurant’s place on Zingerr"
      description="Zingerr Business is an application for restaurant owners and authorized business partners to manage a restaurant’s presence on the Zingerr platform and connect with local customers."
    >
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#26734e]">Built for local businesses</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-[#17462f] md:text-4xl">One place to represent your business on Zingerr</h2>
          </div>
          <div className="space-y-4 leading-7 text-[#52645a]">
            <p>Awadh Info Solution Private Limited is building Zingerr Business for restaurant owners and the partners they authorize to act on their behalf. It is intended to support business onboarding and the day-to-day upkeep of restaurant information presented through Zingerr.</p>
            <p>Restaurants can express interest in onboarding and contact the company for access and current availability. Once approved and supported by the app release, authorized users can maintain business details and other enabled listing information. Information selected for a public listing may help customers discover a restaurant through Zingerr.</p>
            <p>Zingerr Business is separate from the Zingerr customer app. Its workflows are introduced as they become available; the feature outline below is planned scope, not confirmation that each feature is live today.</p>
          </div>
        </div>

        <section className="mt-14 rounded-xl border border-[#edd8c8] bg-white p-6 md:p-8" aria-labelledby="planned-features-heading">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#df704c]">Product direction</p>
          <h2 id="planned-features-heading" className="mt-3 font-serif text-3xl text-[#17462f]">Designed around restaurant operations</h2>
          <p className="mt-3 max-w-3xl leading-7 text-[#617167]">The following workflows are planned or described for the product. Confirm availability with the team before relying on any particular capability.</p>
          <div className="mt-7 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard number="01" title="Restaurant onboarding" description="A path for restaurants and authorized partners to register interest and complete onboarding." />
            <FeatureCard number="02" title="Business profiles" description="Maintain restaurant details and the business profile associated with a Zingerr listing." />
            <FeatureCard number="03" title="Menus and products" description="Manage food menus and product information for customers browsing the platform." />
            <FeatureCard number="04" title="Prices and availability" description="Keep item pricing and availability information up to date where supported." />
            <FeatureCard number="05" title="Hours and listing status" description="Maintain operating hours and whether a restaurant is accepting customers." />
            <FeatureCard number="06" title="Customer reach" description="Make participating restaurants discoverable to customers using the Zingerr platform." />
          </div>
        </section>

        <section className="mt-12 grid gap-8 border-t border-[#cbd8cc] pt-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-[#17462f]">Who it is for</h2>
            <p className="mt-3 leading-7 text-[#617167]">Restaurant owners and authorized business partners who are permitted to manage a restaurant’s information. Account access and the actions available to each user depend on the current app release and company onboarding.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#17462f]">Company and support</h2>
            <p className="mt-3 leading-7 text-[#617167]">Zingerr Business is a product of Awadh Info Solution Private Limited, based in Rourkela, Odisha, India.</p>
            <p className="mt-3 leading-7 text-[#617167]">For onboarding questions, support, or privacy requests, email <a className="font-semibold text-[#26734e] underline underline-offset-4" href="mailto:support@awadhinfosolution.in">support@awadhinfosolution.in</a> or call <a className="font-semibold text-[#26734e] underline underline-offset-4" href="tel:+918144484270">+91-8144484270</a>.</p>
            <p className="mt-3 leading-7 text-[#617167]">Website: <a className="font-semibold text-[#26734e] underline underline-offset-4" href="https://www.awadhinfosolution.in/">www.awadhinfosolution.in</a>.</p>
          </div>
        </section>

        <nav aria-label="Zingerr Business information" className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#cbd8cc] pt-6 text-sm font-semibold text-[#26734e]">
          <Link to="/zingerr-business/privacy-policy" className="underline underline-offset-4">Business Privacy Policy</Link>
          <Link to="/zingerr-business/terms-and-conditions" className="underline underline-offset-4">Business Terms and Conditions</Link>
          <Link to="/support" className="underline underline-offset-4">Contact Support</Link>
        </nav>
      </section>
    </BusinessPageLayout>
  );
}

export function ZingerrBusinessPrivacy() {
  useSEO({
    title: "Zingerr Business Privacy Policy | Awadh Info Solution",
    description: "Read the Zingerr Business privacy policy for restaurant owners and authorized business partners, including data practices, rights, and contact details.",
    keywords: "Zingerr Business privacy policy, restaurant data privacy, business account privacy",
    url: `${businessUrl}/privacy-policy`,
  });

  return (
    <BusinessLegalPage
      current="Privacy Policy"
      title="Privacy Policy"
      description="How Awadh Info Solution Private Limited may handle information when restaurant owners and authorized business partners use Zingerr Business."
    >
      <LegalSection title="1. Scope and product status">
        <p>This policy is for Zingerr Business, a product intended for restaurant owners and authorized business partners. It is separate from the privacy policy for the Zingerr customer app. In this policy, “Company”, “we”, or “us” means Awadh Info Solution Private Limited.</p>
        <p>The Zingerr Business app and backend source were not present in the repository used to prepare this website update. The categories below describe information that may be handled when provided or when a relevant feature is used; they do not verify that every category is collected by the current app build. The Company must confirm the actual data flows and providers before publication.</p>
      </LegalSection>

      <LegalSection title="2. Information that may be processed">
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Account and contact details:</strong> name, mobile number, email address, role, and account identifiers, where supplied or generated for access and support.</li>
          <li><strong>Verification information:</strong> phone number and authentication or OTP-related records if OTP verification is implemented in the version you use. Do not share an OTP with anyone.</li>
          <li><strong>Business information:</strong> restaurant name, business address and contact details, profile information, operating hours, listing status, menus, item descriptions and prices, availability, and images that an authorized user submits.</li>
          <li><strong>Technical information:</strong> device or app information, diagnostics, error records, and notification tokens only if collected or enabled by the app or a service it uses.</li>
          <li><strong>Communications:</strong> information included in support requests or messages sent to the Company.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Public business listings and private account information">
        <p>Restaurant and menu details, prices, business images, operating hours, and open/closed status may be displayed to Zingerr customers when an authorized user submits them for a public listing and the relevant listing feature is active. Do not submit information you intend to keep private into a public listing field.</p>
        <p>Account credentials, verification records, private contact information, and support correspondence are not business listing content by default. The app’s actual field visibility and customer-facing display must be confirmed against its current release.</p>
      </LegalSection>

      <LegalSection title="4. How information may be used">
        <p>Information may be used to create and administer authorized business accounts; verify access where supported; receive, review, and maintain restaurant listings; present business information to customers as requested; provide support; maintain and troubleshoot the service; and meet applicable legal obligations.</p>
      </LegalSection>

      <LegalSection title="5. Service providers and sharing">
        <p>Information may be processed by service providers needed to operate features that are actually enabled, such as hosting, authentication, storage, messaging, or diagnostics. It may also be disclosed where required by law or to protect the Company, users, or service.</p>
        <p>The website repository contains Supabase integration for this website’s own administrative area, but does not establish that Zingerr Business uses Supabase. No Business app source or configuration was available to verify Firebase, Supabase, or another provider. The Company should identify the providers used by the released Business app and update this policy before publication.</p>
      </LegalSection>

      <LegalSection title="6. Storage, security, and retention">
        <p>Information is retained for as long as needed to provide the relevant business service, handle support, meet legal requirements, and resolve disputes. Specific retention periods, storage locations, encryption practices, and deletion behavior could not be verified from the available source. No fixed deletion timeline or specific security control is promised by this policy.</p>
        <p>Access to the app and account should be limited to people authorized by the restaurant. The Company should publish further detail on safeguards after validating the production system.</p>
      </LegalSection>

      <LegalSection title="7. Requests, correction, and account deletion">
        <p>To request access to, correction of, or deletion of personal or business account information, contact <a className="font-semibold text-[#26734e] underline underline-offset-4" href="mailto:support@awadhinfosolution.in">support@awadhinfosolution.in</a>. Include the restaurant name and an account contact detail so the request can be verified. The Company may retain information where required by law or needed to resolve an outstanding matter; a specific deletion schedule has not been verified.</p>
      </LegalSection>

      <LegalSection title="8. Children’s privacy">
        <p>Zingerr Business is intended for restaurant owners and authorized business partners, not children. People who create or manage business accounts must be legally able to act for the relevant business. If you believe a child’s personal information was submitted, contact the Company.</p>
      </LegalSection>

      <LegalSection title="9. Changes and contact">
        <p>This policy may be updated as the app, its features, or applicable requirements change. The updated version and effective date will be posted on this page. For privacy or grievance-related requests, contact Awadh Info Solution Private Limited at <a className="font-semibold text-[#26734e] underline underline-offset-4" href="mailto:support@awadhinfosolution.in">support@awadhinfosolution.in</a>, call <a className="font-semibold text-[#26734e] underline underline-offset-4" href="tel:+918144484270">+91-8144484270</a>, or visit <a className="font-semibold text-[#26734e] underline underline-offset-4" href="https://www.awadhinfosolution.in/">www.awadhinfosolution.in</a>.</p>
      </LegalSection>
    </BusinessLegalPage>
  );
}

export function ZingerrBusinessTerms() {
  useSEO({
    title: "Zingerr Business Terms and Conditions | Awadh Info Solution",
    description: "Review terms for restaurant owners and authorized business partners using Zingerr Business, including accounts, listings, content, and service availability.",
    keywords: "Zingerr Business terms, restaurant partner terms, business account conditions",
    url: `${businessUrl}/terms-and-conditions`,
  });

  return (
    <BusinessLegalPage
      current="Terms and Conditions"
      title="Terms and Conditions"
      description="Terms for restaurant owners and authorized business partners who access Zingerr Business."
    >
      <LegalSection title="1. Acceptance and scope">
        <p>These terms apply to Zingerr Business, which is operated by Awadh Info Solution Private Limited (“Company”, “we”, or “us”). By registering for, accessing, or using the Business app, you agree to these terms. If you do not agree, do not use the service. These terms are distinct from the terms for the Zingerr customer app.</p>
      </LegalSection>

      <LegalSection title="2. Eligibility and authorized accounts">
        <p>You must be legally able to act for the restaurant or business you represent. You may register only as its owner or with authorization from the owner. You are responsible for ensuring that any staff or partner you authorize has permission to access the relevant business account.</p>
      </LegalSection>

      <LegalSection title="3. Authentication and account security">
        <p>Use the authentication method offered by the current app release. If OTP verification is offered, use it only for your own authorized sign-in and do not share verification codes. Keep account access under the control of authorized users and contact support if you suspect unauthorized access. Authentication methods and recovery features are subject to the live app.</p>
      </LegalSection>

      <LegalSection title="4. Restaurant and listing information">
        <p>You are responsible for ensuring that information you submit or manage is accurate, current, lawful, and authorized for publication. This includes restaurant details, business addresses, menus, product descriptions, prices, item availability, images, operating hours, and listing status, where those features are available.</p>
        <p>Correct inaccurate information promptly. Do not submit false, misleading, unlawful, unsafe, or unauthorized listings or content. You are responsible for complying with laws and regulatory requirements that apply to your restaurant and its products.</p>
      </LegalSection>

      <LegalSection title="5. Content and intellectual property">
        <p>You must own or have permission to submit each menu, photograph, logo, description, and other content. Uploading content does not transfer its ownership to the Company. Content may be displayed through Zingerr where needed to operate a listing, subject to the permission and content licence that the Company confirms for the production service.</p>
        <p>The Zingerr Business app, its name, branding, and software are owned by the Company or its licensors. These terms do not grant you ownership of them. The final scope of content permissions and intellectual-property terms requires Company approval before publication.</p>
      </LegalSection>

      <LegalSection title="6. Acceptable use and listing review">
        <p>Do not use the service for fraud, impersonation, unauthorized access, interference with the platform, or deceptive business practices. Do not submit content that violates another person’s rights or applicable law. The Company may review, restrict, remove, or decline information that appears to violate these terms or legal requirements.</p>
      </LegalSection>

      <LegalSection title="7. Service availability and changes">
        <p>Features may vary by app version, account, onboarding status, and location. The Company may maintain, modify, suspend, or discontinue parts of the service. No uninterrupted availability or specific customer reach is guaranteed by these terms.</p>
      </LegalSection>

      <LegalSection title="8. Fees, commissions, and payments">
        <p>These terms do not set any registration fee, commission, subscription charge, settlement schedule, or payment obligation. Any commercial charges or payment/settlement arrangements must be communicated and agreed separately in an approved written agreement or applicable published terms. Confirm the business model and wording before publication.</p>
      </LegalSection>

      <LegalSection title="9. Suspension or termination">
        <p>The Company may restrict or suspend access where it reasonably believes there is a breach of these terms, unauthorized account activity, unlawful or misleading content, or a risk to users or the service. Where appropriate, the Company may provide notice and an opportunity to address the issue. You may stop using the service and request account closure through support; any applicable data-retention requirements remain subject to the Privacy Policy and law.</p>
      </LegalSection>

      <LegalSection title="10. Disclaimers and limitation">
        <p>The service is provided subject to availability and applicable law. To the extent permitted by law, the Company does not warrant uninterrupted or error-free operation, a particular number of customers, orders, revenue, or business results. Liability limits, exclusions, and remedies for the commercial service must be approved by the Company’s legal adviser and should not be treated as finalized by this draft.</p>
      </LegalSection>

      <LegalSection title="11. Applicable law and changes">
        <p>These terms are intended to be governed by the laws of India, subject to applicable legal requirements. The appropriate jurisdiction and dispute process require Company confirmation before publication. The Company may update these terms as the service changes; the current version and effective date will be posted on this page.</p>
      </LegalSection>

      <LegalSection title="12. Contact">
        <p>For onboarding, account, or terms questions, contact Awadh Info Solution Private Limited at <a className="font-semibold text-[#26734e] underline underline-offset-4" href="mailto:support@awadhinfosolution.in">support@awadhinfosolution.in</a> or <a className="font-semibold text-[#26734e] underline underline-offset-4" href="tel:+918144484270">+91-8144484270</a>. Website: <a className="font-semibold text-[#26734e] underline underline-offset-4" href="https://www.awadhinfosolution.in/">www.awadhinfosolution.in</a>.</p>
      </LegalSection>
    </BusinessLegalPage>
  );
}
