import { Link2, Pencil, Trash2, Unlink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DeadlineBadge, StatusBadge } from "@/components/app/Badges";
import { ConfirmationDialog } from "@/components/app/ConfirmationDialog";
import { EmptyState } from "@/components/app/EmptyState";
import { Field, FormModal } from "@/components/app/FormModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REQUIREMENT_CATEGORIES, REQUIREMENT_STATUSES } from "@/lib/constants";
import { formatShortDate } from "@/lib/format";
import { useDeleteRow, useSaveRow, type DocumentRow, type Requirement } from "@/lib/data";

const NONE = "__none__";

type Draft = {
  id?: string;
  name: string;
  category: string;
  is_required: boolean;
  deadline: string;
  status: string;
  minimum_score: string;
  document_id: string;
  notes: string;
};

function toDraft(req?: Requirement | null): Draft {
  return {
    ...(req?.id ? { id: req.id } : {}),
    name: req?.name ?? "",
    category: req?.category ?? "Document",
    is_required: req?.is_required ?? true,
    deadline: req?.deadline ?? "",
    status: req?.status ?? "Not Started",
    minimum_score: req?.minimum_score ?? "",
    document_id: req?.document_id ?? NONE,
    notes: req?.notes ?? "",
  };
}

export function RequirementChecklist({
  programId,
  requirements,
  documents,
}: {
  programId: string;
  requirements: Requirement[];
  documents: DocumentRow[];
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(() => toDraft());
  const save = useSaveRow("requirements", "Requirement");
  const remove = useDeleteRow("requirements", "Requirement");

  function openFor(req?: Requirement) {
    setDraft(toDraft(req));
    setOpen(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.name.trim()) {
      toast.error("Give the requirement a name.");
      return;
    }
    await save.mutateAsync({
      ...(draft.id ? { id: draft.id } : {}),
      program_id: programId,
      name: draft.name.trim(),
      category: draft.category,
      is_required: draft.is_required,
      deadline: draft.deadline || null,
      status: draft.status,
      minimum_score: draft.minimum_score.trim() || null,
      document_id: draft.document_id === NONE ? null : draft.document_id,
      notes: draft.notes.trim() || null,
    });
    setOpen(false);
  }

  function toggleComplete(req: Requirement) {
    void save.mutateAsync({
      id: req.id,
      program_id: req.program_id,
      name: req.name,
      category: req.category,
      is_required: req.is_required,
      deadline: req.deadline,
      minimum_score: req.minimum_score,
      document_id: req.document_id,
      notes: req.notes,
      status: req.status === "Completed" ? "In Progress" : "Completed",
    });
  }

  function unlinkDocument(req: Requirement) {
    void save.mutateAsync({
      id: req.id,
      program_id: req.program_id,
      name: req.name,
      category: req.category,
      is_required: req.is_required,
      deadline: req.deadline,
      minimum_score: req.minimum_score,
      notes: req.notes,
      status: req.status,
      document_id: null,
    });
  }

  const docName = (id: string | null) => documents.find((d) => d.id === id)?.name;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {requirements.filter((r) => r.status === "Completed").length} of {requirements.length}{" "}
          completed
        </p>
        <Button size="sm" onClick={() => openFor()}>
          Add requirement
        </Button>
      </div>

      {requirements.length === 0 ? (
        <EmptyState
          title="No requirements yet"
          description="Add the documents, tests and letters this application asks for."
          action={<Button onClick={() => openFor()}>Add requirement</Button>}
        />
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-card)]">
          {requirements.map((req) => (
            <li key={req.id} className="flex flex-wrap items-start gap-3 p-4">
              <Checkbox
                checked={req.status === "Completed"}
                onCheckedChange={() => toggleComplete(req)}
                aria-label={`Mark ${req.name} complete`}
                className="mt-1"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{req.name}</p>
                  {!req.is_required && (
                    <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                      Optional
                    </span>
                  )}
                  <StatusBadge status={req.status} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {req.category}
                  {req.minimum_score ? ` · Minimum: ${req.minimum_score}` : ""}
                  {req.deadline ? ` · Due ${formatShortDate(req.deadline)}` : ""}
                </p>
                {req.document_id && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-plum">
                    <Link2 className="size-3" /> {docName(req.document_id) ?? "Linked document"}
                    <button
                      type="button"
                      onClick={() => unlinkDocument(req)}
                      className="ml-1 inline-flex items-center gap-1 text-muted-foreground hover:text-destructive"
                    >
                      <Unlink className="size-3" /> unlink
                    </button>
                  </p>
                )}
                {req.deadline && <DeadlineBadge date={req.deadline} className="mt-2" />}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => openFor(req)} aria-label="Edit">
                  <Pencil className="size-4" />
                </Button>
                <ConfirmationDialog
                  trigger={
                    <Button variant="ghost" size="icon" aria-label="Delete requirement">
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  }
                  title="Delete this requirement?"
                  description={`"${req.name}" will be removed from this application. This cannot be undone.`}
                  onConfirm={() => remove.mutate(req.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <FormModal
        open={open}
        onOpenChange={setOpen}
        title={draft.id ? "Edit requirement" : "Add requirement"}
      >
        <form onSubmit={submit} className="space-y-4">
          <Field label="Requirement" htmlFor="req-name" required>
            <Input
              id="req-name"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              required
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category">
              <Select
                value={draft.category}
                onValueChange={(v) => setDraft({ ...draft, category: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REQUIREMENT_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Status">
              <Select value={draft.status} onValueChange={(v) => setDraft({ ...draft, status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REQUIREMENT_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Deadline" htmlFor="req-deadline">
              <Input
                id="req-deadline"
                type="date"
                value={draft.deadline}
                onChange={(e) => setDraft({ ...draft, deadline: e.target.value })}
              />
            </Field>
            <Field label="Minimum score" htmlFor="req-score" hint="e.g. IELTS 7.0 overall">
              <Input
                id="req-score"
                value={draft.minimum_score}
                onChange={(e) => setDraft({ ...draft, minimum_score: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Linked document">
            <Select
              value={draft.document_id}
              onValueChange={(v) => setDraft({ ...draft, document_id: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="No document linked" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>No document linked</SelectItem>
                {documents.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name} {d.version ? `(${d.version})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium">Required</p>
              <p className="text-xs text-muted-foreground">
                Optional items do not count towards readiness.
              </p>
            </div>
            <Switch
              checked={draft.is_required}
              onCheckedChange={(v) => setDraft({ ...draft, is_required: v })}
            />
          </div>
          <Field label="Notes" htmlFor="req-notes">
            <Textarea
              id="req-notes"
              rows={3}
              value={draft.notes}
              onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
            />
          </Field>
          <div className="flex justify-end gap-2 border-t border-border pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={save.isPending}>
              {save.isPending ? "Saving…" : "Save requirement"}
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}
