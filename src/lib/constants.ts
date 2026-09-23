export const PROGRAM_STATUSES = [
  "Researching",
  "Interested",
  "Preparing",
  "Ready to Submit",
  "Submitted",
  "Interview",
  "Accepted",
  "Rejected",
  "Withdrawn",
] as const;
export type ProgramStatus = (typeof PROGRAM_STATUSES)[number];

export const PRIORITIES = ["High", "Medium", "Low"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const REQUIREMENT_CATEGORIES = [
  "Document",
  "Language Test",
  "Recommendation",
  "Academic",
  "Financial",
  "Other",
] as const;

export const REQUIREMENT_STATUSES = [
  "Not Started",
  "In Progress",
  "Completed",
  "Not Required",
] as const;

export const DOCUMENT_TYPES = [
  "CV",
  "Personal Statement",
  "Statement of Purpose",
  "Research Proposal",
  "Transcript",
  "Diploma",
  "IELTS Certificate",
  "TOEFL Certificate",
  "Passport",
  "Recommendation Letter",
  "Other",
] as const;

export const DOCUMENT_STATUSES = ["Draft", "Ready", "Submitted", "Archived"] as const;

export const TEST_TYPES = [
  "IELTS Academic",
  "IELTS General",
  "TOEFL iBT",
  "TOEFL Essentials",
  "Other",
] as const;

export const RECOMMENDATION_STATUSES = [
  "Not Requested",
  "Requested",
  "In Progress",
  "Received",
] as const;

export const EVENT_TYPES = [
  "Application Deadline",
  "Scholarship Deadline",
  "Language Test",
  "Recommendation",
  "Document",
  "Interview",
  "Other",
] as const;

export const DEGREE_TYPES = ["Master's", "MSc", "MA", "MEng", "MBA", "PhD", "Other"] as const;
export const FUNDING_TYPES = [
  "Full Scholarship",
  "Partial Scholarship",
  "Tuition Waiver",
  "Self-funded",
  "Assistantship",
  "Unknown",
] as const;

export const PIPELINE_STAGES: ProgramStatus[] = [
  "Researching",
  "Interested",
  "Preparing",
  "Ready to Submit",
  "Submitted",
];

export const SAMPLE_TAG = "(Sample)";
