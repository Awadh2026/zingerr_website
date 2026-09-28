import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import zingerrLogo from "../assets/zingerr.png";

const sectionLinks = [
  ["Services", "services"],
  ["Projects", "projects"],
  ["About", "about"],
  ["Contact", "contact"],
];

export default function Navbar({ variant = "company" }) {
  return variant === "zingerr" ? <ZingerrNavbar /> : <CompanyNavbar />;
}

function CompanyNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function navigateToSection(sectionId) {
    setMenuOpen(false);

    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/", { state: { scrollTo: sectionId } });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#dce5dc] bg-white/95 text-[#17462f] backdrop-blur">
      <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-6 lg:px-10" aria-label="Main navigation">
        <Link to="/" className="shrink-0 leading-tight" onClick={() => setMenuOpen(false)}>
          <span className="block font-serif text-2xl">Awadh</span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#548264]">Info Solution</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium lg:flex">
          <Link to="/" className="transition hover:text-[#df704c]">Home</Link>
          {sectionLinks.map(([label, sectionId]) => <button key={sectionId} type="button" onClick={() => navigateToSection(sectionId)} className="transition hover:text-[#df704c]">{label}</button>)}
          <button type="button" onClick={() => navigateToSection("contact")} className="inline-flex min-h-11 items-center bg-[#153f30] px-5 font-semibold text-white transition hover:bg-[#275b45]">Get Started <span className="ml-2" aria-hidden="true">↗</span></button>
          {user && <><Link to="/admin/orders" className="transition hover:text-[#df704c]">Orders</Link><button type="button" onClick={() => logout()} className="transition hover:text-[#df704c]">Sign out</button></>}
        </div>

        <button type="button" className="inline-flex h-11 w-11 items-center justify-center border border-[#cbd8cc] lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 6 12 12M18 6 6 18" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {menuOpen && <div id="mobile-navigation" className="border-t border-[#dce5dc] bg-white px-6 py-5 lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 text-base font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          {sectionLinks.map(([label, sectionId]) => <button key={sectionId} type="button" onClick={() => navigateToSection(sectionId)}>{label}</button>)}
          <button type="button" onClick={() => navigateToSection("contact")} className="mt-1 inline-flex min-h-11 items-center bg-[#153f30] px-5 font-semibold text-white">Get Started <span className="ml-2" aria-hidden="true">↗</span></button>
          {user && <><Link to="/admin/orders" onClick={() => setMenuOpen(false)}>Orders</Link><button type="button" onClick={() => { logout(); setMenuOpen(false); }}>Sign out</button></>}
        </div>
      </div>}
    </header>
  );
}

function ZingerrNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="relative flex items-center justify-between border-b-4 border-app-accent bg-app-bg px-6 py-5 text-app-header">
      <Link to="/" className="z-20 shrink-0">
        <img src={zingerrLogo} alt="ZINGERR — Fresh Zing at Door" className="h-16 w-auto object-contain md:h-[4.5rem]" />
      </Link>

      <button type="button" className="z-20 md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 6 12 12M18 6 6 18" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      <div className="hidden items-center gap-6 font-medium md:flex">
        <Link to="/" className="transition hover:text-app-accent">Home</Link>
        <Link to="/privacy" className="transition hover:text-app-accent">Privacy</Link>
        <Link to="/terms" className="transition hover:text-app-accent">Terms &amp; Conditions</Link>
        <Link to="/refund-policy" className="transition hover:text-app-accent">Refund Policy</Link>
        <Link to="/support" className="transition hover:text-app-accent">Support</Link>
        <Link to="/delete-account" className="transition hover:text-app-accent">Delete Account</Link>
        {user && <><Link to="/admin/orders" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link><button type="button" onClick={() => logout()} className="bg-white px-4 py-2 text-sm font-medium text-app-header hover:bg-gray-100">Sign out</button></>}
      </div>

      <div className={`fixed inset-0 z-10 flex flex-col items-center justify-center gap-8 border-l-4 border-app-accent bg-app-bg-muted text-xl text-app-header transition-all duration-300 md:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/support" onClick={() => setMenuOpen(false)}>Support</Link>
        <Link to="/privacy" onClick={() => setMenuOpen(false)}>Privacy</Link>
        <Link to="/terms" onClick={() => setMenuOpen(false)}>Terms &amp; Conditions</Link>
        <Link to="/refund-policy" onClick={() => setMenuOpen(false)}>Refund Policy</Link>
        <Link to="/delete-account" onClick={() => setMenuOpen(false)}>Delete Account</Link>
        {user && <><Link to="/admin/orders" onClick={() => setMenuOpen(false)}>Orders</Link><button type="button" onClick={() => { logout(); setMenuOpen(false); }}>Sign out</button></>}
      </div>
    </nav>
  );
}