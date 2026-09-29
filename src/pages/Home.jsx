import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSEO, useSchemaMarkup } from "../hooks/useSEO.jsx";
import zingerrLogo from "../assets/zingerr_Transparent.png";

const services = [
  { title: "Website Development", intro: "Create a clear, credible online presence that moves visitors to action.", items: ["Business & corporate websites", "E-commerce websites", "Landing pages"] },
  { title: "Web Application Development", intro: "Build responsive software around the way your business works.", items: ["Custom web applications", "Admin dashboards", "CRM / ERP solutions", "SaaS platforms"] },
  { title: "Mobile App Development", intro: "Take your product to customers and teams on the devices they use every day.", items: ["Android applications", "iOS applications", "Flutter applications", "App deployment & maintenance"] },
  { title: "Backend & API Development", intro: "Connect interfaces, data, and third-party services with reliable backend systems.", items: ["REST APIs", "Database development", "Authentication", "Payment integration"] },
  { title: "Maintenance & Support", intro: "Keep existing products healthy, secure, and improving after launch.", items: ["Bug fixing", "Performance optimization", "Security updates", "Feature upgrades"] },
  { title: "Deployment & Cloud", intro: "Prepare, release, and support your product in a production environment.", items: ["Domain & hosting", "Cloud deployment", "CI/CD", "Production support"] },
];

const technologies = [
  ["Frontend", "React · Next.js · JavaScript · HTML · CSS", "Build responsive websites and interactive user interfaces for business products."],
  ["Backend", "Node.js · REST APIs", "Implement application logic and connect web and mobile experiences to services."],
  ["Mobile", "Flutter · Android · iOS", "Build cross-platform Flutter apps and mobile applications for Android and iOS."],
  ["Database & Cloud", "Supabase · Firebase · PostgreSQL · MongoDB · AWS", "Choose databases for application data and use AWS for cloud infrastructure and deployment."],
  ["Payments & Integrations", "Razorpay · Firebase · Third-party APIs", "Connect checkout, notifications, and external services to the product workflow."],
];

const zingerrFeatures = [
  "Customer mobile application with product and category management",
  "Cart, checkout, online payments, and order tracking",
  "Delivery-partner management and delivery PIN workflow",
  "Admin dashboard and role-based access",
  "Push notifications and backend/database integration",
  "Production deployment and ongoing product maintenance",
];

const process = [
  ["Requirements", "Understand the business, users, and project scope."],
  ["UI/UX", "Plan the product structure, user flows, and interface."],
  ["Development", "Build the product and integrate its services."],
  ["Testing", "Check key workflows and fix issues before release."],
  ["Deployment", "Release the product to its production environment."],
  ["Maintenance", "Support updates, fixes, and improvements after launch."],
];

const reasons = [
  ["End-to-end development", "From the first idea through production and ongoing support."],
  ["Modern technology", "Solutions designed to be maintainable and ready to evolve."],
  ["Business-focused approach", "Technology choices and features aligned with your requirements."],
  ["Transparent development", "Clear milestones, priorities, and communication throughout the work."],
  ["Post-launch support", "Maintenance and continuous improvements after release."],
];

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useSEO({
    title: "Awadh Info Solution | Website, Web App & Mobile App Development",
    description: "Awadh Info Solution provides end-to-end website, web application, mobile app, API development and maintenance services for businesses in India.",
    keywords: "Awadh Info Solution, software development company, website development, web application development, iOS app development, Android app development, Flutter, API development, MongoDB, AWS, Odisha, India",
    image: new URL(zingerrLogo, window.location.origin).href,
    url: "https://www.awadhinfosolution.in/",
  });

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId) return undefined;

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      navigate("/", { replace: true, state: null });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.key, location.state, navigate]);

  useSchemaMarkup({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Awadh Info Solution Private Limited",
    url: "https://www.awadhinfosolution.in/",
    description: "End-to-end website, web application, mobile app, API development, and maintenance services for businesses.",
    email: "admin@awadhinfosolution.in",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rourkela",
      addressRegion: "Odisha",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    sameAs: [
      "https://www.instagram.com/zingerr2026/",
      "https://x.com/zingerr2026",
    ],
    knowsAbout: [
      "Website development",
      "Web application development",
      "Mobile app development",
      "Backend and API development",
      "Software deployment and maintenance",
    ],
    founder: {
      "@type": "Person",
      name: "Shantanu Kumar Kushwaha",
      jobTitle: "Founder and Software Developer",
    },
  });

  return (
    <main className="flex-1 bg-[#f5f7f4] text-[#172820]">
      <section className="overflow-hidden bg-[#153f30] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24 lg:px-10">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#d4ee75]">Build. Launch. Grow.</p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[1.02] md:text-7xl">Turn Your Ideas Into <span className="text-[#d4ee75]">Digital Products</span></h1>
            <h2 className="mt-7 max-w-2xl text-2xl font-semibold leading-tight md:text-3xl">End-to-End Digital Solutions for Growing Businesses</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#d4e3da]">We design and develop modern websites, web applications, mobile apps, and custom software solutions that help businesses grow digitally.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="mailto:admin@awadhinfosolution.in?subject=Free%20consultation" className="inline-flex min-h-12 items-center bg-[#d4ee75] px-6 font-semibold text-[#18382b] transition hover:bg-white">Get a Free Consultation <span className="ml-3" aria-hidden="true">↗</span></a>
              <button type="button" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex min-h-12 items-center border border-white/40 px-6 font-semibold text-white transition hover:border-white">View Our Work <span className="ml-3" aria-hidden="true">↓</span></button>
            </div>
          </div>
          <div className="relative border-l border-[#6f9480] py-8 pl-8 md:pl-12">
            <span className="absolute left-0 top-8 h-16 w-1 -translate-x-1/2 bg-[#e87952]" />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b4d6bf]">One team, the complete journey</p>
            <div className="mt-7 space-y-5">
              {[["01", "Websites & web apps"], ["02", "Mobile products"], ["03", "Backend & integrations"], ["04", "Launch & ongoing support"]].map(([number, label]) => (
                <div key={number} className="flex items-center gap-4 border-b border-[#557766] pb-4">
                  <span className="font-serif text-sm text-[#d4ee75]">{number}</span>
                  <span className="text-lg font-medium">{label}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm leading-6 text-[#d4e3da]">Founder-led by Shantanu Kumar Kushwaha · 6+ years of professional experience</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8e1d8] bg-white" aria-label="Our capabilities">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 py-6 text-sm font-semibold text-[#3b5748] sm:grid-cols-3 lg:grid-cols-5 lg:px-10">
          {["Website Development", "Web Apps", "Mobile Apps", "API & Backend", "Maintenance"].map((item, index) => <div key={item} className="flex items-center gap-3"><span className="font-serif text-[#df704c]">0{index + 1}</span>{item}</div>)}
        </div>
      </section>

      <section className="border-b border-[#d8e1d8] bg-white" aria-label="Experience and availability">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-6 text-sm font-semibold text-[#3b5748] sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          <span>6+ years of professional experience</span>
          <a href="https://play.google.com/store/apps/details?id=in.awadhinfosolution.zingerr" target="_blank" rel="noopener noreferrer" className="hover:text-[#26734e]">Production app on Google Play ↗</a>
          <span>End-to-end product development</span>
          <span>Rourkela, Odisha</span>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-[#e9efea]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-10">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#26734e]">What we do</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">Our Services</h2>
            </div>
            <p className="max-w-lg leading-7 text-[#617167]">End-to-end software development for businesses: from a first website or product idea to integrations, launch, and long-term care.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <article key={service.title} className="border border-[#d0dbd1] bg-white p-6 transition hover:border-[#26734e]">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#df704c]">Service 0{index + 1}</p>
                <h3 className="mt-3 font-serif text-2xl text-[#17462f]">{service.title}</h3>
                <p className="mt-3 min-h-14 leading-6 text-[#617167]">{service.intro}</p>
                <ul className="mt-5 space-y-2 border-t border-[#e0e7e0] pt-4 text-sm text-[#344d3d]">
                  {service.items.map((item) => <li key={item} className="flex gap-2"><span className="text-[#278251]" aria-hidden="true">/</span>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="technologies" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#26734e]">Built with the right tools</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Technologies We Work With</h2>
            <p className="mt-4 leading-7 text-[#617167]">We choose technologies to fit the product, its users, and the way it needs to grow.</p>
          </div>
          <div className="mt-10 grid border-t border-[#cbd8cc] md:grid-cols-2">
            {technologies.map(([label, stack, details]) => (
              <article key={label} className="border-b border-[#cbd8cc] py-6 md:pr-10">
                <h3 className="font-semibold text-[#17462f]">{label}</h3>
                <p className="mt-2 font-medium text-[#26734e]">{stack}</p>
                <p className="mt-2 max-w-xl leading-7 text-[#617167]">{details}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 bg-[#153f30] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-20 lg:px-10">
          <div className="flex flex-col items-start">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d4ee75]">Featured project · Production case study</p>
            <div className="mt-7 flex h-24 w-24 items-center justify-center bg-white p-2"><img src={zingerrLogo} alt="Zingerr app logo" className="h-full w-full object-contain" /></div>
            <h2 className="mt-5 font-serif text-5xl">Zingerr</h2>
            <p className="mt-2 text-lg font-semibold text-[#b4d6bf]">Hyperlocal Commerce Platform</p>
            <p className="mt-4 max-w-md leading-7 text-[#d4e3da]">Developed by Awadh Info Solution Private Limited, Zingerr is a live product bringing customer ordering, payments, delivery workflows, and administration together.</p>
            <p className="mt-5 text-sm font-semibold text-[#d4ee75]">Flutter · Supabase · Firebase · Razorpay</p>
            <Link to="/products/zingerr" className="mt-7 inline-flex min-h-12 items-center border border-[#b4d6bf] px-5 font-semibold text-white transition hover:bg-white hover:text-[#153f30]">View Zingerr <span className="ml-3" aria-hidden="true">→</span></Link>
          </div>
          <div className="grid content-start gap-x-8 sm:grid-cols-2">
            {zingerrFeatures.map((feature, index) => <div key={feature} className="flex gap-4 border-t border-[#557766] py-5"><span className="font-serif text-sm text-[#d4ee75]">0{index + 1}</span><p className="leading-6 text-[#e0ebe3]">{feature}</p></div>)}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#26734e]">A clear path from idea to release</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Our Process</h2>
          </div>
          <div className="mt-10 grid border-t border-[#cbd8cc] sm:grid-cols-2 lg:grid-cols-6">
            {process.map(([title, detail], index) => <article key={title} className="border-b border-[#cbd8cc] py-6 pr-6 lg:border-b-0 lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0"><p className="font-serif text-3xl text-[#df704c]">0{index + 1}</p><h3 className="mt-4 font-semibold text-[#17462f]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#617167]">{detail}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#e9efea]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#26734e]">A partner for the whole journey</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Why Businesses Choose Awadh Info Solution</h2>
          </div>
          <div className="mt-9 grid gap-x-12 md:grid-cols-2">
            {reasons.map(([title, detail], index) => <div key={title} className="grid grid-cols-[42px_1fr] gap-4 border-t border-[#cbd8cc] py-5"><span className="font-serif text-xl text-[#df704c]">0{index + 1}</span><div><h3 className="font-semibold text-[#17462f]">{title}</h3><p className="mt-1 leading-7 text-[#617167]">{detail}</p></div></div>)}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[0.75fr_1.25fr] md:py-20 lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#26734e]">About the company</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">Awadh Info Solution</h2>
            <p className="mt-5 font-serif text-2xl text-[#17462f]">Shantanu Kumar Kushwaha</p>
            <p className="mt-2 font-semibold text-[#26734e]">Founder &amp; Software Developer</p>
            <p className="mt-3 text-sm text-[#617167]">6+ years of professional experience</p>
          </div>
          <div className="max-w-3xl text-lg leading-8 text-[#52645a]">
            <p>We are a founder-led software product development company focused on practical digital solutions for businesses. We take products from requirements and UI implementation through backend integration, payments, notifications, deployment, and ongoing maintenance.</p>
            <p className="mt-5 text-base leading-7">Our work spans business websites, web applications, mobile products, backend systems, and the support needed to keep them running.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-[#d4ee75] text-[#18382b]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em]">Start a conversation</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">Have an idea for your next digital product?</h2>
            <p className="mt-4 text-lg">Let’s turn your idea into a working product.</p>
            <div className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:gap-6">
              <a href="mailto:admin@awadhinfosolution.in" className="font-semibold underline underline-offset-4">admin@awadhinfosolution.in</a>
              <span>Rourkela, Odisha, India</span>
            </div>
          </div>
          <a href="mailto:admin@awadhinfosolution.in?subject=Start%20a%20project" className="inline-flex min-h-12 shrink-0 items-center justify-center bg-[#153f30] px-6 font-semibold text-white transition hover:bg-[#275b45]">Start Your Project <span className="ml-3" aria-hidden="true">→</span></a>
        </div>
      </section>
    </main>
  );
}