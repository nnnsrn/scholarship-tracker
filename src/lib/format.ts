export function formatDate(iso?: string | null): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function formatShortDate(iso?: string | null): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function todayISO(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function daysRemaining(iso?: string | null): number | null {
  if (!iso) return null;
  const target = new Date(`${iso}T00:00:00`).getTime();
  if (Number.isNaN(target)) return null;
  const today = new Date(`${todayISO()}T00:00:00`).getTime();
  return Math.round((target - today) / 86400000);
}

export type Urgency = "overdue" | "urgent" | "warning" | "normal" | "none";

export function urgencyOf(iso?: string | null): Urgency {
  const days = daysRemaining(iso);
  if (days === null) return "none";
  if (days < 0) return "overdue";
  if (days < 14) return "urgent";
  if (days <= 30) return "warning";
  return "normal";
}

export function daysLabel(iso?: string | null): string {
  const days = daysRemaining(iso);
  if (days === null) return "No deadline";
  if (days < 0) return `Overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"}`;
  if (days === 0) return "Due today";
  return `${days} day${days === 1 ? "" : "s"} remaining`;
}

export function formatMoney(amount?: number | null, currency?: string | null): string {
  if (amount === null || amount === undefined) return "—";
  const code = currency || "USD";
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: code,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${code} ${amount.toLocaleString()}`;
  }
}

export function isValidLater(expiry?: string | null): boolean {
  const days = daysRemaining(expiry);
  return days !== null && days >= 0;
}
