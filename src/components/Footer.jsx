import { Link } from "react-router-dom";
import zingerrLogo from "../assets/zingerr.png";

export default function Footer({ variant = "company" }) {
  return variant === "zingerr" ? <ZingerrFooter /> : <CompanyFooter />;
}

function CompanyFooter() {
  return (
    <footer className="border-t border-[#dce5dc] bg-[#153f30] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <Link to="/" className="inline-block font-serif text-2xl">Awadh Info Solution</Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#d4e3da]">End-to-End Digital Solutions for Modern Businesses.</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#d4ee75]">
            <a href="https://www.instagram.com/zingerr2026?igsh=MWVxczRxN2IzcTlyOA==" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
            <a href="https://x.com/zingerr2026?s=11" target="_blank" rel="noopener noreferrer" className="hover:text-white">X</a>
            <a href="https://play.google.com/store/apps/details?id=in.awadhinfosolution.zingerr" target="_blank" rel="noopener noreferrer" className="hover:text-white">Zingerr on Play Store</a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#d4ee75]">Services</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#e0ebe3]">
            {["Website Development", "Web Applications", "Mobile Applications", "API Development", "Maintenance & Support"].map((label) => <li key={label}><Link to="/" state={{ scrollTo: "services" }} className="hover:text-white">{label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#d4ee75]">Company</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#e0ebe3]">
            <li><Link to="/" state={{ scrollTo: "about" }} className="hover:text-white">About Us</Link></li>
            <li><Link to="/" state={{ scrollTo: "projects" }} className="hover:text-white">Projects</Link></li>
            <li><Link to="/" state={{ scrollTo: "contact" }} className="hover:text-white">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#d4ee75]">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#e0ebe3]">
            <li><a href="mailto:admin@awadhinfosolution.in" className="break-all hover:text-white">admin@awadhinfosolution.in</a></li>
            <li>Rourkela, Odisha, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-6 py-4 text-xs text-[#d4e3da] lg:px-10">© {new Date().getFullYear()} Awadh Info Solution Private Limited</p>
      </div>
    </footer>
  );
}

function ZingerrFooter() {
  return (
    <footer className="border-t-4 border-app-accent bg-app-bg py-6 text-app-header">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 md:flex-row">
        <div className="flex items-center gap-3 text-center md:text-left">
          <img src={zingerrLogo} alt="Zingerr" className="h-12 w-auto object-contain" />
          <div>
            <p className="text-lg font-semibold">© 2026 Awadh Info Solution Pvt Ltd</p>
            <p className="text-sm text-app-body">Connect with us on social and app stores.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="https://www.instagram.com/zingerr2026?igsh=MWVxczRxN2IzcTlyOA==" target="_blank" rel="noopener noreferrer" aria-label="Awadh Info Solution on Instagram" className="flex items-center gap-2 rounded-full border border-app-accent/30 bg-white px-4 py-2 text-app-body transition hover:border-app-accent">
            <span className="h-5 w-5 text-[#E1306C]"><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor" aria-hidden="true"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm5 2.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5zm0 2a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5zm4.75-.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" /></svg></span>
            <span>Instagram</span>
          </a>
          <a href="https://x.com/zingerr2026?s=11" target="_blank" rel="noopener noreferrer" aria-label="Awadh Info Solution on Twitter" className="flex items-center gap-2 rounded-full border border-app-accent/30 bg-white px-4 py-2 text-app-body transition hover:border-app-accent">
            <span className="h-5 w-5 text-[#1DA1F2]"><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor" aria-hidden="true"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9 12.14 12.14 0 0 1-8.8-4.46 4.28 4.28 0 0 0 1.33 5.72 4.25 4.25 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97 8.6 8.6 0 0 1-5.33 1.84A8.7 8.7 0 0 1 2 19.3a12.12 12.12 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.39-.02-.58A8.7 8.7 0 0 0 22.46 6z" /></svg></span>
            <span>Twitter</span>
          </a>
          <a href="https://play.google.com/store/apps/details?id=in.awadhinfosolution.zingerr" target="_blank" rel="noopener noreferrer" aria-label="Awadh Info Solution on Google Play Store" className="flex items-center gap-2 rounded-full border border-app-accent/30 bg-white px-4 py-2 text-app-body transition hover:border-app-accent">
            <span className="h-5 w-5 text-[#34A853]"><svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor" aria-hidden="true"><path d="M3.37 2.25A2.25 2.25 0 0 0 1.12 4.5v15a2.25 2.25 0 0 0 2.25 2.25h17.26a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H3.37zm14.8 6.6-8.7 4.35a.75.75 0 0 1-1.08-.67V8.5a.75.75 0 0 1 1.08-.67l8.7 4.35a.75.75 0 0 1 0 1.34z" /></svg></span>
            <span>Play Store</span>
          </a>
        </div>
      </div>
    </footer>
  );
}