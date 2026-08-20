import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "@/app/dashboard/DashboardClient";

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

  return <DashboardClient email={user.email ?? ""} profile={profile} designs={designs ?? []} />;
}
