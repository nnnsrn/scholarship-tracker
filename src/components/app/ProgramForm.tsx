import { useState } from "react";
import { toast } from "sonner";

import { Field, FormModal, FormSection } from "@/components/app/FormModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEGREE_TYPES,
  FUNDING_TYPES,
  PRIORITIES,
  PROGRAM_STATUSES,
} from "@/lib/constants";
import { useSaveRow, type Program } from "@/lib/data";

type FormState = {
  id?: string;
  university: string;
  program_name: string;
  scholarship_name: string;
  degree_type: string;
  country: string;
  city: string;
  major: string;
  research_topic: string;
  deadline: string;
  scholarship_deadline: string;
  program_link: string;
  scholarship_link: string;
  application_link: string;
  funding_type: string;
  tuition_fee: string;
  application_fee: string;
  status: string;
  priority: string;
  notes: string;
};

function toState(program?: Program | null): FormState {
  return {
    ...(program?.id ? { id: program.id } : {}),
    university: program?.university ?? "",
    program_name: program?.program_name ?? "",
    scholarship_name: program?.scholarship_name ?? "",
    degree_type: program?.degree_type ?? "Master's",
    country: program?.country ?? "",
    city: program?.city ?? "",
    major: program?.major ?? "",
    research_topic: program?.research_topic ?? "",
    deadline: program?.deadline ?? "",
    scholarship_deadline: program?.scholarship_deadline ?? "",
    program_link: program?.program_link ?? "",
    scholarship_link: program?.scholarship_link ?? "",
    application_link: program?.application_link ?? "",
    funding_type: program?.funding_type ?? "Unknown",
    tuition_fee: program?.tuition_fee?.toString() ?? "",
    application_fee: program?.application_fee?.toString() ?? "",
    status: program?.status ?? "Researching",
    priority: program?.priority ?? "Medium",
    notes: program?.notes ?? "",
  };
}

const text = (v: string) => (v.trim() === "" ? null : v.trim());
const num = (v: string) => (v.trim() === "" ? null : Number(v));

export function ProgramForm({
  open,
  onOpenChange,
  program,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program?: Program | null;
  onSaved?: (id: string) => void;
}) {
  const [state, setState] = useState<FormState>(() => toState(program));
  const save = useSaveRow("programs", "Program");

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!state.university.trim() || !state.program_name.trim()) {
      toast.error("University and program name are required.");
      return;
    }
    const id = await save.mutateAsync({
      ...(state.id ? { id: state.id } : {}),
      university: state.university.trim(),
      program_name: state.program_name.trim(),
      scholarship_name: text(state.scholarship_name),
      degree_type: text(state.degree_type),
      country: state.country.trim(),
      city: text(state.city),
      major: state.major.trim(),
      research_topic: text(state.research_topic),
      deadline: text(state.deadline),
      scholarship_deadline: text(state.scholarship_deadline),
      program_link: text(state.program_link),
      scholarship_link: text(state.scholarship_link),
      application_link: text(state.application_link),
      funding_type: text(state.funding_type),
      tuition_fee: num(state.tuition_fee),
      application_fee: num(state.application_fee),
      status: state.status,
      priority: state.priority,
      notes: text(state.notes),
    });
    onOpenChange(false);
    onSaved?.(id);
  }

  return (
    <FormModal
      open={open}
      onOpenChange={(next) => {
        if (next) setState(toState(program));
        onOpenChange(next);
      }}
      title={program ? "Edit program" : "Add program"}
      description="Track a master's program and its scholarship together."
      wide
    >
      <form onSubmit={submit} className="space-y-6">
        <FormSection title="Basic information">
          <Field label="University" htmlFor="university" required>
            <Input
              id="university"
              value={state.university}
              onChange={(e) => set("university", e.target.value)}
              required
            />
          </Field>
          <Field label="Program name" htmlFor="program_name" required>
            <Input
              id="program_name"
              value={state.program_name}
              onChange={(e) => set("program_name", e.target.value)}
              required
            />
          </Field>
          <Field label="Scholarship name" htmlFor="scholarship_name">
            <Input
              id="scholarship_name"
              value={state.scholarship_name}
              onChange={(e) => set("scholarship_name", e.target.value)}
            />
          </Field>
          <Field label="Degree type">
            <Select value={state.degree_type} onValueChange={(v) => set("degree_type", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEGREE_TYPES.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Country" htmlFor="country">
            <Input
              id="country"
              value={state.country}
              onChange={(e) => set("country", e.target.value)}
            />
          </Field>
          <Field label="City" htmlFor="city">
            <Input id="city" value={state.city} onChange={(e) => set("city", e.target.value)} />
          </Field>
          <Field label="Major" htmlFor="major">
            <Input id="major" value={state.major} onChange={(e) => set("major", e.target.value)} />
          </Field>
          <Field label="Research topic" htmlFor="research_topic">
            <Input
              id="research_topic"
              value={state.research_topic}
              onChange={(e) => set("research_topic", e.target.value)}
            />
          </Field>
        </FormSection>

        <FormSection title="Deadlines">
          <Field label="Application deadline" htmlFor="deadline">
            <Input
              id="deadline"
              type="date"
              value={state.deadline}
              onChange={(e) => set("deadline", e.target.value)}
            />
          </Field>
          <Field label="Scholarship deadline" htmlFor="scholarship_deadline">
            <Input
              id="scholarship_deadline"
              type="date"
              value={state.scholarship_deadline}
              onChange={(e) => set("scholarship_deadline", e.target.value)}
            />
          </Field>
        </FormSection>

        <FormSection title="Links">
          <Field label="Program website" htmlFor="program_link">
            <Input
              id="program_link"
              type="url"
              placeholder="https://"
              value={state.program_link}
              onChange={(e) => set("program_link", e.target.value)}
            />
          </Field>
          <Field label="Scholarship website" htmlFor="scholarship_link">
            <Input
              id="scholarship_link"
              type="url"
              placeholder="https://"
              value={state.scholarship_link}
              onChange={(e) => set("scholarship_link", e.target.value)}
            />
          </Field>
          <Field label="Application portal" htmlFor="application_link" className="sm:col-span-2">
            <Input
              id="application_link"
              type="url"
              placeholder="https://"
              value={state.application_link}
              onChange={(e) => set("application_link", e.target.value)}
            />
          </Field>
        </FormSection>

        <FormSection title="Financial">
          <Field label="Funding type">
            <Select value={state.funding_type} onValueChange={(v) => set("funding_type", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FUNDING_TYPES.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Tuition fee" htmlFor="tuition_fee">
            <Input
              id="tuition_fee"
              type="number"
              min="0"
              value={state.tuition_fee}
              onChange={(e) => set("tuition_fee", e.target.value)}
            />
          </Field>
          <Field label="Application fee" htmlFor="application_fee">
            <Input
              id="application_fee"
              type="number"
              min="0"
              value={state.application_fee}
              onChange={(e) => set("application_fee", e.target.value)}
            />
          </Field>
        </FormSection>

        <FormSection title="Tracking">
          <Field label="Status">
            <Select value={state.status} onValueChange={(v) => set("status", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROGRAM_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Priority">
            <Select value={state.priority} onValueChange={(v) => set("priority", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRIORITIES.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Notes" htmlFor="notes" className="sm:col-span-2">
            <Textarea
              id="notes"
              rows={4}
              value={state.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </Field>
        </FormSection>

        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={save.isPending}>
            {save.isPending ? "Saving…" : program ? "Save changes" : "Add program"}
          </Button>
        </div>
      </form>
    </FormModal>
  );
}
