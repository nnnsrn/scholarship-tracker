import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { SupabaseClient } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type DB = Database["public"]["Tables"];

/** Untyped view of the client so generic table helpers stay simple. */
const db = supabase as unknown as SupabaseClient;

export type Program = DB["programs"]["Row"];
export type Requirement = DB["requirements"]["Row"];
export type DocumentRow = DB["documents"]["Row"];
export type LanguageTest = DB["language_tests"]["Row"];
export type Recommender = DB["recommenders"]["Row"];
export type RecommendationRequest = DB["recommendation_requests"]["Row"];
export type ApplicationEvent = DB["application_events"]["Row"];

export type TableName =
  | "programs"
  | "requirements"
  | "documents"
  | "language_tests"
  | "recommenders"
  | "recommendation_requests"
  | "application_events";

async function currentUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("You are signed out. Please sign in again.");
  return data.user.id;
}

function useList<T>(table: TableName, orderBy: string, ascending = true) {
  return useQuery({
    queryKey: [table],
    queryFn: async (): Promise<T[]> => {
      const { data, error } = await db
        .from(table)
        .select("*")
        .order(orderBy, { ascending, nullsFirst: false });
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });
}

export const usePrograms = () => useList<Program>("programs", "deadline");
export const useRequirements = () => useList<Requirement>("requirements", "created_at");
export const useDocuments = () => useList<DocumentRow>("documents", "created_at", false);
export const useLanguageTests = () => useList<LanguageTest>("language_tests", "test_date", false);
export const useRecommenders = () => useList<Recommender>("recommenders", "name");
export const useRecommendationRequests = () =>
  useList<RecommendationRequest>("recommendation_requests", "deadline");
export const useEvents = () => useList<ApplicationEvent>("application_events", "date");

export function useSaveRow<T extends Record<string, unknown>>(table: TableName, label: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: T & { id?: string }) => {
      const user_id = await currentUserId();
      const payload = { ...values, user_id };
      if (values.id) {
        const { error } = await db.from(table).update(payload).eq("id", values.id);
        if (error) throw error;
        return values.id;
      }
      const { data, error } = await db.from(table).insert(payload).select("id").single();
      if (error) throw error;
      return (data as { id: string }).id;
    },
    onSuccess: (_id, values) => {
      void qc.invalidateQueries();
      toast.success(values.id ? `${label} updated` : `${label} added`);
    },
    onError: (error: Error) => toast.error(error.message || `Could not save ${label}`),
  });
}

export function useDeleteRow(table: TableName, label: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries();
      toast.success(`${label} deleted`);
    },
    onError: (error: Error) => toast.error(error.message || `Could not delete ${label}`),
  });
}

/** Deterministic readiness: completed required requirements / total required × 100 */
export function readiness(reqs: Requirement[]): number {
  const required = reqs.filter((r) => r.is_required && r.status !== "Not Required");
  if (required.length === 0) return 0;
  const done = required.filter((r) => r.status === "Completed").length;
  return Math.round((done / required.length) * 100);
}

export function requirementsFor(reqs: Requirement[], programId: string) {
  return reqs.filter((r) => r.program_id === programId);
}

export async function uploadDocumentFile(file: File): Promise<string> {
  const userId = await currentUserId();
  const path = `${userId}/${Date.now()}-${file.name.replace(/[^\w.\-]+/g, "_")}`;
  const { error } = await supabase.storage.from("documents").upload(path, file);
  if (error) throw error;
  return path;
}

export async function documentFileUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage.from("documents").createSignedUrl(path, 60 * 10);
  if (error) throw error;
  return data.signedUrl;
}

export async function removeDocumentFile(path?: string | null) {
  if (!path) return;
  await supabase.storage.from("documents").remove([path]);
}
