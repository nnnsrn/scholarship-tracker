import { cn } from "@/lib/utils";
import { daysLabel, urgencyOf, type Urgency } from "@/lib/format";

const statusTone: Record<string, string> = {
  Researching: "bg-muted text-muted-foreground border-border",
  Interested: "bg-secondary text-secondary-foreground border-border",
  Preparing: "bg-accent text-accent-foreground border-mauve/30",
  "Ready to Submit": "bg-blush/40 text-blush-foreground border-blush",
  Submitted: "bg-primary/10 text-primary border-primary/25",
  Interview: "bg-plum/15 text-plum border-plum/30",
  Accepted: "bg-success/15 text-success border-success/30",
  Rejected: "bg-destructive/10 text-destructive border-destructive/25",
  Withdrawn: "bg-muted text-muted-foreground border-border",
  "Not Started": "bg-muted text-muted-foreground border-border",
  "In Progress": "bg-accent text-accent-foreground border-mauve/30",
  Completed: "bg-success/15 text-success border-success/30",
  "Not Required": "bg-muted text-muted-foreground border-border",
  Draft: "bg-muted text-muted-foreground border-border",
  Ready: "bg-success/15 text-success border-success/30",
  Archived: "bg-muted text-muted-foreground border-border",
  "Not Requested": "bg-muted text-muted-foreground border-border",
  Requested: "bg-blush/40 text-blush-foreground border-blush",
  Received: "bg-success/15 text-success border-success/30",
};

const base =
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap";

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(base, statusTone[status] ?? "bg-muted text-muted-foreground border-border", className)}
    >
      {status}
    </span>
  );
}

const priorityTone: Record<string, string> = {
  High: "bg-mauve/15 text-mauve border-mauve/35",
  Medium: "bg-plum/10 text-plum border-plum/25",
  Low: "bg-muted text-muted-foreground border-border",
};

export function PriorityBadge({ priority, className }: { priority: string; className?: string }) {
  return (
    <span className={cn(base, priorityTone[priority] ?? priorityTone['Low'], className)}>
      {priority} priority
    </span>
  );
}

const urgencyTone: Record<Urgency, string> = {
  overdue: "bg-destructive/10 text-destructive border-destructive/30",
  urgent: "bg-blush/50 text-blush-foreground border-blush",
  warning: "bg-warning/15 text-warning-foreground border-warning/40",
  normal: "bg-secondary text-secondary-foreground border-border",
  none: "bg-muted text-muted-foreground border-border",
};

export function DeadlineBadge({
  date,
  label,
  className,
}: {
  date?: string | null;
  label?: string;
  className?: string;
}) {
  const urgency = urgencyOf(date);
  return (
    <span className={cn(base, urgencyTone[urgency], className)}>
      {label ? `${label}: ` : ""}
      {daysLabel(date)}
    </span>
  );
}

export function ReadinessProgress({
  value,
  className,
  showLabel = true,
}: {
  value: number;
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Readiness</span>
          <span className="font-semibold text-primary">{value}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
