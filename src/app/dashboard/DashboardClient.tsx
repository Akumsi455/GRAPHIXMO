"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, FilePlus2, LayoutTemplate, Lightbulb, LogOut, Menu, Plus, Search, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

type Profile = { full_name: string | null; plan: string; design_points: number } | null;
type Design = { id: string; title: string; design_type: string; updated_at: string };

const guideSteps = [
  { target: "[data-guide='navigation']", title: "Find your way around", body: "Use the sidebar to move between your overview, saved designs, and templates.", side: "right" as const },
  { target: "[data-guide='search']", title: "Search your workspace", body: "When your workspace grows, search helps you find a project quickly.", side: "bottom" as const },
  { target: "[data-guide='upgrade']", title: "Unlock more with Pro", body: "Upgrade anytime for unlimited design points, premium templates, and polished exports.", side: "right" as const },
  { target: "[data-guide='new-design']", title: "Start a new design", body: "This is your fastest route to a fresh canvas and the beginning of a new idea.", side: "bottom" as const },
  { target: "[data-guide='stats']", title: "See your progress", body: "Keep an eye on your plan, available design points, and the number of saved projects.", side: "bottom" as const },
  { target: "[data-guide='templates']", title: "Begin with a template", body: "Choose a starting point for social posts, flyers, or announcements, then make it your own.", side: "top" as const },
  { target: "[data-guide='designs']", title: "Return to your work", body: "Your recent designs stay here so you can pick up exactly where you left off.", side: "top" as const },
];

type GuidePosition = { top: number; left: number; width: number; height: number };

export default function DashboardClient({ email, profile, designs }: { email: string; profile: Profile; designs: Design[] }) {
  const [guideOpen, setGuideOpen] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const [guidePosition, setGuidePosition] = useState<GuidePosition | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const firstName = profile?.full_name?.split(" ")[0] || email.split("@")[0] || "creator";

  useEffect(() => {
    if (window.localStorage.getItem("graphixmo:dashboard-guide-seen") !== "true") setGuideOpen(true);
  }, []);

  useEffect(() => {
    if (!guideOpen) return;
    const step = guideSteps[guideStep];
    const target = document.querySelector<HTMLElement>(step.target);
    if (!target) return;
    if (step.target === "[data-guide='navigation']" && window.innerWidth < 1024) setSidebarOpen(true);
    target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    const updatePosition = () => {
      const rect = target.getBoundingClientRect();
      setGuidePosition({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    };
    const frame = window.requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [guideOpen, guideStep, sidebarOpen]);

  function closeGuide() {
    window.localStorage.setItem("graphixmo:dashboard-guide-seen", "true");
    setGuideOpen(false);
  }

  function nextGuideStep() {
    if (guideStep === guideSteps.length - 1) closeGuide();
    else setGuideStep((step) => step + 1);
  }

  const currentGuideStep = guideSteps[guideStep];
  const guideCardStyle = guidePosition
    ? currentGuideStep.side === "right"
      ? { top: Math.max(20, Math.min(window.innerHeight - 300, guidePosition.top)), left: Math.min(window.innerWidth - 340, guidePosition.left + guidePosition.width + 20) }
      : currentGuideStep.side === "top"
        ? { top: Math.max(20, guidePosition.top - 250), left: Math.max(20, Math.min(window.innerWidth - 340, guidePosition.left)) }
        : { top: Math.min(window.innerHeight - 300, guidePosition.top + guidePosition.height + 20), left: Math.max(20, Math.min(window.innerWidth - 340, guidePosition.left)) }
    : { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  return (
    <main className="min-h-screen bg-[#f7f9fd] text-foreground">
      <div className="flex min-h-screen">
        <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-[#e5eaf2] bg-white px-5 py-6 transition-transform lg:static lg:translate-x-0`}>
          <div className="flex items-center justify-between px-2">
            <Link href="/" className="flex items-center gap-2" aria-label="GraphixMo home"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-white">G</span><span className="text-xl font-bold tracking-tight">Graphix<span className="text-primary">Mo</span></span></Link>
            <button type="button" onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-muted hover:bg-[#f3f6fb] lg:hidden" aria-label="Close navigation"><X className="h-5 w-5" /></button>
          </div>
          <nav data-guide="navigation" className="mt-12 space-y-1" aria-label="Dashboard navigation">
            <a href="#overview" className="flex items-center gap-3 rounded-xl bg-[#eef4ff] px-3 py-3 text-sm font-bold text-primary"><Sparkles className="h-4 w-4" /> Overview</a>
            <a href="#designs" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted transition hover:bg-[#f3f6fb] hover:text-foreground"><BookOpen className="h-4 w-4" /> My designs</a>
            <a href="#templates" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted transition hover:bg-[#f3f6fb] hover:text-foreground"><LayoutTemplate className="h-4 w-4" /> Templates</a>
          </nav>
          <div data-guide="upgrade" className="mt-auto rounded-2xl bg-[#123b83] p-5 text-white"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#bfdbfe]">GraphixMo Pro</p><p className="mt-3 text-sm font-semibold leading-5">More room for your best work.</p><Link href="/payment" className="mt-4 flex items-center justify-between rounded-lg bg-white px-3 py-2.5 text-xs font-bold text-primary">Upgrade plan <ArrowRight className="h-4 w-4" /></Link></div>
          <form action="/auth/signout" method="post" className="mt-5"><button type="submit" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted transition hover:bg-[#f3f6fb] hover:text-foreground"><LogOut className="h-4 w-4" /> Sign out</button></form>
        </aside>
        {sidebarOpen && <button type="button" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-slate-950/20 lg:hidden" aria-label="Close navigation overlay" />}

        <section className="min-w-0 flex-1">
          <header className="flex h-20 items-center justify-between border-b border-[#e5eaf2] bg-white px-5 sm:px-8 lg:px-10"><button type="button" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-foreground hover:bg-[#f3f6fb] lg:hidden" aria-label="Open navigation"><Menu className="h-5 w-5" /></button><div data-guide="search" className="flex w-10 items-center gap-2 rounded-xl bg-[#f7f9fd] px-3 py-2 text-sm text-muted sm:w-auto"><Search className="h-4 w-4 shrink-0" /><span className="hidden sm:inline">Search your workspace</span></div><div className="flex items-center gap-3"><span className="hidden text-right sm:block"><span className="block text-sm font-bold">{firstName}</span><span className="block text-xs text-muted">{profile?.plan || "free"} plan</span></span><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbeafe] text-sm font-bold text-primary">{firstName.slice(0, 1).toUpperCase()}</span></div></header>

          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
            <section id="overview" className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Your workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Good morning, {firstName}.</h1><p className="mt-3 text-muted">What will you make today?</p></div><div className="flex gap-3"><Link href="/payment" className="inline-flex items-center justify-center rounded-xl border border-primary/25 bg-white px-4 py-3 text-sm font-bold text-primary transition hover:bg-[#eef4ff]">Upgrade plan</Link><Link data-guide="new-design" href="/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dark"><Plus className="h-4 w-4" /> New design</Link></div></section>

            <section data-guide="stats" className="mt-10 grid gap-4 sm:grid-cols-3"><article className="rounded-2xl border border-[#e5eaf2] bg-white p-5"><p className="text-sm text-muted">Current plan</p><p className="mt-2 text-2xl font-bold capitalize text-primary">{profile?.plan || "free"}</p><p className="mt-1 text-xs text-muted">Your creative toolkit</p></article><article className="rounded-2xl border border-[#e5eaf2] bg-white p-5"><p className="text-sm text-muted">Design points</p><p className="mt-2 text-2xl font-bold">{profile?.design_points ?? 50}</p><p className="mt-1 text-xs text-muted">Available this month</p></article><article className="rounded-2xl border border-[#e5eaf2] bg-white p-5"><p className="text-sm text-muted">Saved designs</p><p className="mt-2 text-2xl font-bold">{designs.length}</p><p className="mt-1 text-xs text-muted">Ready to pick up</p></article></section>

            <section data-guide="templates" id="templates" className="mt-10"><div className="flex items-end justify-between"><div><h2 className="text-xl font-bold">Start from a template</h2><p className="mt-1 text-sm text-muted">A little momentum for your next idea.</p></div><a href="#templates" className="hidden text-sm font-bold text-primary sm:block">View all</a></div><div className="mt-5 grid gap-4 sm:grid-cols-3"><Link href="/" className="group relative min-h-40 overflow-hidden rounded-2xl bg-[#dbeafe] p-5 transition hover:-translate-y-1"><span className="relative z-10 text-sm font-bold text-[#123b83]">Social posts</span><span className="absolute -bottom-8 -right-5 h-32 w-32 rotate-12 rounded-3xl bg-[#60a5fa] transition group-hover:rotate-6" /></Link><Link href="/" className="group relative min-h-40 overflow-hidden rounded-2xl bg-[#e0e7ff] p-5 transition hover:-translate-y-1"><span className="relative z-10 text-sm font-bold text-[#3730a3]">Flyers</span><span className="absolute -bottom-10 right-4 h-36 w-24 -rotate-12 rounded-t-full bg-[#818cf8] transition group-hover:-rotate-6" /></Link><Link href="/" className="group relative min-h-40 overflow-hidden rounded-2xl bg-[#d1fae5] p-5 transition hover:-translate-y-1"><span className="relative z-10 text-sm font-bold text-[#065f46]">Announcements</span><span className="absolute -bottom-8 right-2 h-28 w-28 rounded-full bg-[#34d399] transition group-hover:scale-110" /></Link></div></section>

            <section data-guide="designs" id="designs" className="mt-12"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">Recent designs</h2><p className="mt-1 text-sm text-muted">Your latest creative work.</p></div><span className="text-sm text-muted">{designs.length} saved</span></div>{designs.length ? <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{designs.map((design) => <article key={design.id} className="rounded-2xl border border-[#e5eaf2] bg-white p-4"><div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-[#f0f4fa] text-muted"><Lightbulb className="h-7 w-7" /></div><h3 className="mt-4 truncate text-sm font-bold">{design.title}</h3><p className="mt-1 text-xs capitalize text-muted">{design.design_type}</p></article>)}</div> : <div className="mt-5 flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-[#cbd5e1] bg-white px-6 text-center"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4ff] text-primary"><FilePlus2 className="h-5 w-5" /></div><h3 className="mt-4 font-bold">Your canvas is waiting</h3><p className="mt-2 max-w-sm text-sm text-muted">Create your first design and it will appear here.</p><Link href="/" className="mt-4 text-sm font-bold text-primary">Create a design <ArrowRight className="inline h-4 w-4" /></Link></div>}</section>
          </div>
        </section>
      </div>

      {guideOpen && guidePosition && <><div className="fixed inset-0 z-50 bg-slate-950/45" /><div className="pointer-events-none fixed z-[51] rounded-2xl border-2 border-primary bg-transparent shadow-[0_0_0_9999px_rgba(15,23,42,0.45)] transition-all duration-300" style={{ top: guidePosition.top - 8, left: guidePosition.left - 8, width: guidePosition.width + 16, height: guidePosition.height + 16 }} /><div role="dialog" aria-modal="true" aria-labelledby="guide-title" className="fixed z-[52] w-[min(320px,calc(100vw-32px))] rounded-3xl bg-white p-6 shadow-2xl transition-all duration-300 sm:p-7" style={guideCardStyle}><button type="button" onClick={closeGuide} className="absolute right-3 top-3 rounded-lg p-2 text-muted hover:bg-[#f3f6fb]" aria-label="Close guide"><X className="h-4 w-4" /></button><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef4ff] text-primary"><Sparkles className="h-5 w-5" /></div><p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-primary">Dashboard tour · {guideStep + 1} of {guideSteps.length}</p><h2 id="guide-title" className="mt-2 text-xl font-bold">{currentGuideStep.title}</h2><p className="mt-2 text-sm leading-6 text-muted">{currentGuideStep.body}</p><div className="mt-6 flex items-center justify-between"><button type="button" onClick={closeGuide} className="text-xs font-semibold text-muted hover:text-foreground">Skip tour</button><div className="flex gap-2">{guideStep > 0 && <button type="button" onClick={() => setGuideStep((step) => step - 1)} className="rounded-xl border border-border p-2.5 text-muted hover:border-primary hover:text-primary" aria-label="Previous guide step"><ChevronLeft className="h-4 w-4" /></button>}<button type="button" onClick={nextGuideStep} className="flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-xs font-bold text-white hover:bg-primary-dark">{guideStep === guideSteps.length - 1 ? "Finish" : "Next"}{guideStep === guideSteps.length - 1 ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</button></div></div></div></>}
    </main>
  );
}