import { Link } from "@tanstack/react-router";

import { DeadlineBadge, PriorityBadge, ReadinessProgress, StatusBadge } from "@/components/app/Badges";
import { ProgramCard } from "@/components/app/ProgramCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatShortDate } from "@/lib/format";
import type { Program } from "@/lib/data";

export function ProgramTable({
  programs,
  readinessById,
}: {
  programs: Program[];
  readinessById: Record<string, number>;
}) {
  return (
    <>
      {/* Tablet/phone: cards instead of horizontal scrolling */}
      <div className="grid gap-4 md:hidden">
        {programs.map((p) => (
          <ProgramCard key={p.id} program={p} readinessValue={readinessById[p.id] ?? 0} />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-card)] md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/60">
              <TableHead>University / Program</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Major</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Readiness</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <Link
                    to="/programs/$programId"
                    params={{ programId: p.id }}
                    className="font-medium text-primary hover:underline"
                  >
                    {p.university}
                  </Link>
                  <p className="text-xs text-muted-foreground">{p.program_name}</p>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {[p.country, p.city].filter(Boolean).join(" · ") || "—"}
                </TableCell>
                <TableCell className="text-sm">{p.major || "—"}</TableCell>
                <TableCell className="space-y-1">
                  <p className="text-sm">{formatShortDate(p.deadline)}</p>
                  <DeadlineBadge date={p.deadline} />
                </TableCell>
                <TableCell className="w-32">
                  <ReadinessProgress value={readinessById[p.id] ?? 0} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={p.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={p.priority} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
