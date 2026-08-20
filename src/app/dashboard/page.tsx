import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: profile }, { data: designs }] = await Promise.all([
    supabase.from("profiles").select("full_name, plan, design_points").eq("id", user.id).single(),
    supabase.from("designs").select("id, title, design_type, updated_at").order("updated_at", { ascending: false }).limit(8),
  ]);

  return (
    <main className="min-h-screen bg-[#f5f8ff] px-5 py-8 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="GraphixMo home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-bold text-white">G</span>
            <span className="text-xl font-bold tracking-tight">Graphix<span className="text-primary">Mo</span></span>
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit" className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-muted transition hover:border-primary hover:text-primary">Sign out</button>
          </form>
        </header>

        <section className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Your workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Welcome, {profile?.full_name || user.email?.split("@")[0] || "creator"}.</h1>
          <p className="mt-3 text-muted">Pick up a project or start something new.</p>
        </section>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-border bg-white p-6 shadow-sm"><p className="text-sm text-muted">Current plan</p><p className="mt-2 text-2xl font-bold capitalize text-primary">{profile?.plan || "free"}</p></article>
          <article className="rounded-2xl border border-border bg-white p-6 shadow-sm"><p className="text-sm text-muted">Design points</p><p className="mt-2 text-2xl font-bold">{profile?.design_points ?? 50}</p></article>
          <Link href="/" className="flex min-h-32 items-center justify-center rounded-2xl bg-primary p-6 text-center font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dark">Create a new design</Link>
        </div>

        <section className="mt-10 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-bold">Recent designs</h2><span className="text-sm text-muted">{designs?.length || 0} saved</span></div>
          {designs?.length ? <div className="mt-6 grid gap-3 sm:grid-cols-2">{designs.map((design) => <article key={design.id} className="rounded-xl border border-border p-4"><h3 className="font-semibold">{design.title}</h3><p className="mt-1 text-xs capitalize text-muted">{design.design_type}</p></article>)}</div> : <p className="mt-6 rounded-xl bg-[#f5f8ff] px-4 py-8 text-center text-sm text-muted">Your saved designs will appear here.</p>}
        </section>
      </div>
    </main>
  );
}
