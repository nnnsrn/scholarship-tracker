import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { DeadlineSummaryCard } from "@/components/app/DeadlineSummaryCard";
import { EmptyState } from "@/components/app/EmptyState";
import { Button } from "@/components/ui/button";
import { usePrograms, useRequirements, readiness, requirementsFor } from "@/lib/data";
import { pageMeta } from "@/lib/page-meta";
import { todayISO } from "@/lib/format";
import { PIPELINE_STAGES } from "@/lib/constants";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => pageMeta("Dashboard", "Your master's applications, deadlines, and progress at a glance."),
  component: Dashboard,
});
function Dashboard() {
  const { user } = Route.useRouteContext();
  const programs = usePrograms();
  const requirements = useRequirements();
  const list = programs.data ?? [];
  const reqs = requirements.data ?? [];
  const upcoming = [...list].filter(p => p.deadline && !["Rejected", "Withdrawn"].includes(p.status)).sort((a,b) => (a.deadline ?? "").localeCompare(b.deadline ?? "")).slice(0, 6);
  const attention = list.flatMap(p => requirementsFor(reqs, p.id).filter(r => r.is_required && r.status !== "Completed" && r.status !== "Not Required" && (r.deadline ?? p.deadline ?? "9999") <= todayISO()).map(r => ({ program:p, requirement:r })));
  return <AppShell title="Master's Applications" subtitle="2026–2027 Application Cycle" email={user.email} actions={<Button asChild size="sm"><Link to="/programs"><Plus className="size-4" /> Add program</Link></Button>}>
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[["Total programs",list.length],["Preparing",list.filter(p=>p.status==="Preparing").length],["Ready to submit",list.filter(p=>p.status==="Ready to Submit").length],["Submitted",list.filter(p=>p.status==="Submitted").length]].map(([label,count])=><div key={label} className="rounded-lg border bg-surface p-4 shadow-[var(--shadow-card)]"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 font-display text-3xl text-primary">{count}</p></div>)}</div>
    <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]"><section><h2 className="mb-4 text-xl">Upcoming deadlines</h2>{programs.isLoading || requirements.isLoading ? <p className="text-muted-foreground">Loading applications…</p> : programs.isError || requirements.isError ? <p role="alert" className="text-destructive">Could not load applications.</p> : upcoming.length ? <div className="space-y-3">{upcoming.map(p=><DeadlineSummaryCard key={p.id} program={p} readinessValue={readiness(requirementsFor(reqs,p.id))}/>)}</div> : <EmptyState title="No deadlines yet" description="Add your first program to start tracking applications." action={<Button asChild><Link to="/programs">View programs</Link></Button>}/>}</section><div className="space-y-8"><section><h2 className="mb-4 text-xl">Needs attention</h2><div className="space-y-2">{attention.length ? attention.slice(0,7).map(({program,requirement})=><Link key={requirement.id} to="/programs/$programId" params={{programId:program.id}} className="block border-l-2 border-mauve bg-surface p-3 text-sm hover:text-primary"><strong>{requirement.name}</strong><span className="block text-xs text-muted-foreground">{program.university}</span></Link>) : <p className="text-sm text-muted-foreground">Nothing urgent right now.</p>}</div></section><section><h2 className="mb-4 text-xl">Application pipeline</h2><div className="space-y-2">{[...PIPELINE_STAGES,"Result"].map(stage=><div key={stage} className="flex justify-between border-b py-2 text-sm"><span>{stage}</span><strong>{list.filter(p=>stage==="Result"?["Accepted","Rejected","Withdrawn"].includes(p.status):p.status===stage).length}</strong></div>)}</div></section><section><h2 className="mb-4 text-xl">Research interests</h2><div className="flex flex-wrap gap-2">{[...new Set(list.map(p=>p.research_topic).filter(Boolean))].map(topic=><span key={topic} className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">{topic}</span>)}</div></section></div></div>
  </AppShell>;
}
