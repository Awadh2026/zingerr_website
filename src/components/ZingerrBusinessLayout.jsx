import { Link } from "react-router-dom";
import zingerrLogo from "../assets/zingerr.png";

export function BusinessBreadcrumb({ current }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#52645a]">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link to="/" className="underline underline-offset-4 hover:text-[#17462f]">Home</Link></li>
        <li aria-hidden="true">/</li>
        <li><Link to="/zingerr-business/about" className="underline underline-offset-4 hover:text-[#17462f]">Zingerr Business</Link></li>
        {current !== "About" && <><li aria-hidden="true">/</li><li aria-current="page">{current}</li></>}
      </ol>
    </nav>
  );
}

export function BusinessPageLayout({ current, eyebrow, title, description, children }) {
  return (
    <main className="flex-1 bg-[#f5f7f4] text-[#172820]">
      <section className="overflow-hidden bg-[#153f30] text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <BusinessBreadcrumb current={current} />
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d4ee75]">{eyebrow}</p>
              <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">{title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#d4e3da]">{description}</p>
            </div>
            <div className="flex h-28 w-28 items-center justify-center bg-white p-3 md:h-36 md:w-36">
              <img src={zingerrLogo} alt="Zingerr" className="h-full w-full object-contain" />
            </div>
          </div>
          <div className="mt-9 h-1 w-full bg-gradient-to-r from-[#df704c] via-[#eea04e] to-[#d4ee75]" />
        </div>
      </section>
      {children}
    </main>
  );
}

export function BusinessLegalPage({ current, title, description, children }) {
  return (
    <BusinessPageLayout
      current={current}
      eyebrow="Zingerr Business · Awadh Info Solution Private Limited"
      title={title}
      description={description}
    >
      <section className="mx-auto max-w-5xl px-6 py-12 md:py-16 lg:px-10">
        <div className="rounded-xl border border-[#d0dbd1] bg-white p-6 shadow-sm md:p-10">
          <div className="mb-8 border-l-4 border-[#df704c] bg-[#fff7f2] px-5 py-4 text-sm leading-6 text-[#593b2e]">
            Review this policy against the live Zingerr Business app and its service providers before publication. Its app and backend source were not included in the website repository, so implementation-specific details could not be independently verified.
          </div>
          <div className="space-y-9 text-[15px] leading-7 text-[#46564c]">{children}</div>
          <p className="mt-10 border-t border-[#e0e7e0] pt-5 text-sm text-[#617167]">
            Effective date: 21 October 2026 · Awadh Info Solution Private Limited · Rourkela, Odisha, India
          </p>
        </div>
      </section>
    </BusinessPageLayout>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-[#17462f]">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
