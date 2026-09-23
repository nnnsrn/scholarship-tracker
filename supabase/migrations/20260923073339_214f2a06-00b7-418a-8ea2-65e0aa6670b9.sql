
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  document_type TEXT NOT NULL DEFAULT 'Other',
  version TEXT,
  file_url TEXT,
  status TEXT NOT NULL DEFAULT 'Draft',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  university TEXT NOT NULL,
  program_name TEXT NOT NULL,
  scholarship_name TEXT,
  country TEXT NOT NULL DEFAULT '',
  city TEXT,
  major TEXT NOT NULL DEFAULT '',
  research_topic TEXT,
  degree_type TEXT,
  deadline DATE,
  scholarship_deadline DATE,
  application_link TEXT,
  program_link TEXT,
  scholarship_link TEXT,
  funding_type TEXT,
  tuition_fee NUMERIC,
  application_fee NUMERIC,
  status TEXT NOT NULL DEFAULT 'Researching',
  priority TEXT NOT NULL DEFAULT 'Medium',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Document',
  is_required BOOLEAN NOT NULL DEFAULT true,
  deadline DATE,
  status TEXT NOT NULL DEFAULT 'Not Started',
  minimum_score TEXT,
  document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.language_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  test_type TEXT NOT NULL DEFAULT 'IELTS Academic',
  test_date DATE,
  expiry_date DATE,
  score TEXT,
  listening TEXT,
  reading TEXT,
  writing TEXT,
  speaking TEXT,
  price NUMERIC,
  currency TEXT,
  provider TEXT,
  certificate_document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.recommenders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  affiliation TEXT,
  position TEXT,
  email TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.recommendation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  recommender_id UUID NOT NULL REFERENCES public.recommenders(id) ON DELETE CASCADE,
  deadline DATE,
  requested_date DATE,
  received_date DATE,
  status TEXT NOT NULL DEFAULT 'Not Requested',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.application_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  event_type TEXT NOT NULL DEFAULT 'Other',
  date DATE NOT NULL,
  notes TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents, public.programs, public.requirements, public.language_tests, public.recommenders, public.recommendation_requests, public.application_events TO authenticated;
GRANT ALL ON public.documents, public.programs, public.requirements, public.language_tests, public.recommenders, public.recommendation_requests, public.application_events TO service_role;

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.language_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own documents" ON public.documents FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own programs" ON public.programs FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own requirements" ON public.requirements FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own language_tests" ON public.language_tests FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own recommenders" ON public.recommenders FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own recommendation_requests" ON public.recommendation_requests FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own application_events" ON public.application_events FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER trg_documents_updated BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_programs_updated BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_requirements_updated BEFORE UPDATE ON public.requirements FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_language_tests_updated BEFORE UPDATE ON public.language_tests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_recommenders_updated BEFORE UPDATE ON public.recommenders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_recommendation_requests_updated BEFORE UPDATE ON public.recommendation_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_programs_user ON public.programs(user_id, deadline);
CREATE INDEX idx_requirements_program ON public.requirements(program_id);
CREATE INDEX idx_reqrequests_program ON public.recommendation_requests(program_id);
CREATE INDEX idx_events_user_date ON public.application_events(user_id, date);
