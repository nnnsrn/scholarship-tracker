import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";

import { DeadlineBadge, PriorityBadge, ReadinessProgress, StatusBadge } from "@/components/app/Badges";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import type { Program } from "@/lib/data";

export function ProgramCard({ program, readinessValue }: { program: Program; readinessValue: number }) {
  return (
    <Card className="group border-border shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-raised)]">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to="/programs/$programId"
              params={{ programId: program.id }}
              className="font-display text-lg font-semibold text-primary hover:underline"
            >
              {program.university}
            </Link>
            <p className="truncate text-sm font-medium text-foreground">{program.program_name}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {[program.country, program.city].filter(Boolean).join(" · ") || "Location not set"}
            </p>
          </div>
          <Link
            to="/programs/$programId"
            params={{ programId: program.id }}
            aria-label={`Open ${program.program_name}`}
            className="rounded-md p-1 text-muted-foreground transition-colors group-hover:text-primary"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="space-y-1 text-sm">
          <p>
            <span className="text-muted-foreground">Major: </span>
            {program.major || "—"}
          </p>
          {program.research_topic && (
            <p className="text-muted-foreground">Research: {program.research_topic}</p>
          )}
          {program.scholarship_name && (
            <p className="text-muted-foreground">Scholarship: {program.scholarship_name}</p>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm">
            <span className="text-muted-foreground">Deadline: </span>
            <span className="font-medium">{formatDate(program.deadline)}</span>
          </p>
          <DeadlineBadge date={program.deadline} />
        </div>

        <ReadinessProgress value={readinessValue} />

        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={program.status} />
          <PriorityBadge priority={program.priority} />
        </div>
      </CardContent>
    </Card>
  );
}
