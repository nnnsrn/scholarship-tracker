import { Link } from "@tanstack/react-router";

import { DeadlineBadge, ReadinessProgress, StatusBadge } from "@/components/app/Badges";
import { formatDate } from "@/lib/format";
import type { Program } from "@/lib/data";

export function DeadlineSummaryCard({
  program,
  readinessValue,
}: {
  program: Program;
  readinessValue: number;
}) {
  return (
    <Link
      to="/programs/$programId"
      params={{ programId: program.id }}
      className="block rounded-xl border border-border bg-surface p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-raised)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-base font-semibold text-primary">{program.university}</p>
          <p className="truncate text-sm font-medium">{program.program_name}</p>
          <p className="text-xs text-muted-foreground">
            {[program.country, program.city].filter(Boolean).join(" · ") || "Location not set"} ·{" "}
            {program.major || "Major not set"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">{formatDate(program.deadline)}</p>
          <DeadlineBadge date={program.deadline} className="mt-1" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <ReadinessProgress value={readinessValue} className="max-w-xs" />
        <StatusBadge status={program.status} />
      </div>
    </Link>
  );
}
