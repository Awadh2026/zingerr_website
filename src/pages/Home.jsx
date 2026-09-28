import { useSEO, useSchemaMarkup } from "../hooks/useSEO.jsx";
import { Link } from "react-router-dom";
import zingerrLogo from "../assets/zingerr_Transparent.png";

const services = [
  "Custom websites, business websites, portals, and e-commerce solutions",
  "Responsive web applications, dashboards, and role-based management systems",
  "Custom Android and cross-platform mobile applications",
  "REST APIs, databases, authentication, and cloud integrations",
  "Payment gateways, Google Maps and location, OTP/SMS, and notifications",
  "Deployment, production support, bug fixing, upgrades, and long-term maintenance",
];

const capabilities = [
  ["Web", "React.js · Next.js · JavaScript · HTML5 · CSS3"],
  ["Backend", "Node.js · REST APIs · PostgreSQL · Supabase · Cloud services"],
  ["Mobile", "Flutter · Android · Firebase"],
  ["Integrations", "Razorpay · Google Maps · FCM · OTP/SMS"],
  ["Product systems", "Authentication · RBAC · Orders · Payments · Admin dashboards"],
  ["Deployment & support", "Play Store · Web hosting · DNS/CDN · Maintenance · Monitoring"],
];

const productFeatures = [
  "Customer ordering with product catalogue, cart, and order management",
  "Digital payment integration and transaction handling",
  "Delivery-partner workflow with order status and delivery PIN",
  "Role-based access for customers, delivery partners, and administrators",
  "Push notifications and FCM token management",
  "Production deployment, database management, product updates, and ongoing support",
];

const clientBenefits = [
  ["End-to-end ownership", "From idea and UI/UX through development, deployment, and maintenance."],
  ["Full-stack capability", "Websites, web apps, mobile apps, backend systems, APIs, and integrations."],
  ["Modern technology", "React.js, Next.js, JavaScript, Node.js, Flutter, PostgreSQL, Supabase, and Firebase."],
  ["Production experience", "Experience building and maintaining a live commerce and delivery application."],
  ["Flexible engagement", "Project-based product development or monthly maintenance and support."],
];

const engagementOptions = [
  ["New product", "Build from requirements, UI, frontend, backend, integrations, and deployment."],
  ["Existing app or website", "Bug fixing, new features, performance improvements, and modernization."],
  ["Maintenance", "Monthly technical support, updates, monitoring, and ongoing improvements."],
];

export default function Home() {
  useSEO({
    title: "Awadh Info Solution | Founder-led Software Development",
    description: "Founder-led website, web app, mobile app, backend, and product development by Shantanu Kumar Kushwaha, with 6+ years of professional experience.",
    keywords: "Awadh Info Solution, software development, website development, web app development, mobile app development, Zingerr",
    url: "https://www.awadhinfosolution.in/",
  });

  useSchemaMarkup({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Awadh Info Solution Pvt Ltd",
    url: "https://www.awadhinfosolution.in/",
    description: "Founder-led software product development, from requirements and UI through integrations, deployment, and ongoing support.",
    founder: {
      "@type": "Person",
      name: "Shantanu Kumar Kushwaha",
      jobTitle: "Founder and Software Developer",
    },
  });

  return (
    <main className="flex-1 bg-[#f4f7f2] text-[#182a22]">
      <section className="overflow-hidden bg-[#153f30] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24 lg:px-10">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#b4d6bf]">Awadh Info Solution Pvt. Ltd.</p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[1.08] md:text-7xl">Software product development, from first idea to launch.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#d4e3da]">Founder-led development for businesses that need a capable, hands-on technology partner, from the first interface through backend integration and long-term support.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button type="button" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex min-h-12 items-center bg-[#d4ee75] px-6 font-semibold text-[#18382b] transition hover:bg-white">Discuss your project <span className="ml-3" aria-hidden="true">↓</span></button>
              <button type="button" onClick={() => document.getElementById("zingerr")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex min-h-12 items-center border border-white/40 px-6 font-semibold text-white transition hover:border-white">View live product <span className="ml-3" aria-hidden="true">↓</span></button>
            </div>
          </div>
          <div className="border-l border-[#6f9480] pl-7 md:pl-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b4d6bf]">Founder &amp; software developer</p>
            <p className="mt-4 font-serif text-3xl leading-tight md:text-4xl">Shantanu Kumar Kushwaha</p>
            <p className="mt-5 text-[#d4e3da]">6+ years of professional experience</p>
            <div className="mt-8 h-px w-full bg-[#6f9480]" />
            <p className="mt-5 text-sm leading-6 text-[#d4e3da]">Websites · Web apps · Mobile apps · Backend &amp; APIs · Maintenance</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8e1d8] bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-6 text-sm font-medium text-[#3b5748] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:px-10">
          <span>Website development</span><span>Web app development</span><span>App development</span><span>Backend &amp; APIs</span><span>Maintenance &amp; support</span>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[0.75fr_1.25fr] md:py-20 lg:px-10">
        <div>
          <p className="mt-2 font-semibold text-[#26734e]">Founder and software developer</p>
          <p className="mt-5 font-serif text-2xl text-[#17462f]">Shantanu Kumar Kushwaha</p>
        </div>
        <div className="max-w-3xl text-lg leading-8 text-[#52645a]">
          <p>With 6+ years of professional experience, Shantanu focuses on building practical digital products for businesses. He works across the full product journey, from idea and UI implementation through backend integration, payments, notifications, deployment, and ongoing maintenance.</p>
          <p className="mt-5 text-sm font-semibold text-[#344d3d]">One accountable development partner, involved from the first decisions through production support.</p>
        </div>
      </section>

      <section className="bg-[#e7eee6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#26734e]">Our services</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">What we do</h2>
            <p className="mt-4 leading-7 text-[#617167]">We design, develop, launch, and support software products that help businesses get their work done.</p>
          </div>
          <div className="mt-10 grid gap-x-12 md:grid-cols-2">
            {services.map((service, index) => (
              <div key={service} className="grid grid-cols-[42px_1fr] gap-4 border-t border-[#c6d4c8] py-5">
                <span className="font-serif text-xl text-[#639174]">0{index + 1}</span>
                <p className="leading-7 text-[#344d3d]">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#26734e]">Core technology &amp; capabilities</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">A practical full-stack toolkit.</h2>
        </div>
        <div className="mt-10 grid border-t border-[#cbd8cc] sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(([label, details]) => (
            <div key={label} className="border-b border-[#cbd8cc] py-6 sm:pr-6 lg:pr-8">
              <h3 className="font-semibold text-[#17462f]">{label}</h3>
              <p className="mt-2 leading-7 text-[#617167]">{details}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="zingerr" className="bg-[#153f30] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-20 lg:px-10">
          <div className="flex flex-col items-start">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b4d6bf]">Live product case study</p>
            <div className="mt-7 flex h-24 w-24 items-center justify-center bg-white p-2">
              <img src={zingerrLogo} alt="Zingerr" className="h-full w-full object-contain" />
            </div>
            <h2 className="mt-5 font-serif text-5xl">Zingerr</h2>
            <p className="mt-4 max-w-md leading-7 text-[#d4e3da]">A hyperlocal commerce and doorstep-delivery platform built and maintained by the team, demonstrating hands-on experience with a live production application.</p>
            <Link to="/products/zingerr" className="mt-7 inline-flex min-h-12 items-center border border-[#b4d6bf] px-5 font-semibold text-white transition hover:bg-white hover:text-[#153f30]">Explore Zingerr <span className="ml-3" aria-hidden="true">↗</span></Link>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#b4d6bf]">Built for the real flow of local commerce</p>
            <ul className="mt-4 divide-y divide-[#557766]">
              {productFeatures.map((feature) => <li key={feature} className="py-4 leading-6 text-[#e0ebe3]">{feature}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#26734e]">Why clients work with us</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Good work, owned end to end.</h2>
        </div>
        <div className="mt-9 grid gap-x-12 md:grid-cols-2">
          {clientBenefits.map(([title, detail], index) => (
            <div key={title} className="grid grid-cols-[42px_1fr] gap-4 border-t border-[#cbd8cc] py-5">
              <span className="font-serif text-xl text-[#639174]">0{index + 1}</span>
              <div><h3 className="font-semibold text-[#17462f]">{title}</h3><p className="mt-1 leading-7 text-[#617167]">{detail}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#e7eee6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#26734e]">Project engagement</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Support that fits the stage you're at.</h2>
          </div>
          <div className="mt-10 grid gap-8 border-t border-[#c6d4c8] pt-7 md:grid-cols-3 md:gap-10">
            {engagementOptions.map(([title, detail], index) => (
              <div key={title}>
                <p className="text-sm font-semibold text-[#639174]">0{index + 1}</p>
                <h3 className="mt-3 font-serif text-2xl text-[#17462f]">{title}</h3>
                <p className="mt-3 leading-7 text-[#617167]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#d4ee75] text-[#18382b]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em]">Let's build your next digital product</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">Have a product or project in mind?</h2>
            <p className="mt-4">Awadh Info Solution Pvt. Ltd.</p>
            <a href="mailto:admin@awadhinfosolution.in" className="mt-5 inline-block font-semibold underline underline-offset-4">admin@awadhinfosolution.in</a>
            <p className="mt-2 text-sm">awadhinfosolution.in</p>
          </div>
          <a href="mailto:admin@awadhinfosolution.in" className="inline-flex min-h-12 shrink-0 items-center justify-center bg-[#153f30] px-6 font-semibold text-white transition hover:bg-[#275b45]">Email admin@awadhinfosolution.in <span className="ml-3" aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}