import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookOpenCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Master's Application OS" },
      {
        name: "description",
        content:
          "Sign in to Master's Application OS to track master's degree and scholarship applications, deadlines and documents.",
      },
      { property: "og:title", content: "Sign in — Master's Application OS" },
      {
        property: "og:description",
        content: "Your personal workspace for master's and scholarship applications.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        navigate({ to: "/dashboard", replace: true });
      }
    });
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || password.length < 6) {
      toast.error("Enter your email and a password of at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        if (!data.session) {
          setCheckEmail(true);
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/dashboard", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <BookOpenCheck className="size-6" />
          </span>
          <h1 className="page-title text-2xl">Master&apos;s Application OS</h1>
          <p className="mt-1 text-sm text-muted-foreground">2026–2027 Application Cycle</p>
        </div>

        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="font-display text-lg">
              {mode === "signin" ? "Welcome back" : "Create your workspace"}
            </CardTitle>
            <CardDescription>
              {checkEmail
                ? "Check your inbox and confirm your email to finish signing up."
                : "Use your email and a password to continue."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!checkEmail && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
                </Button>
              </form>
            )}
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {mode === "signin" ? "No account yet?" : "Already have an account?"}{" "}
              <button
                type="button"
                className="font-medium text-primary underline-offset-4 hover:underline"
                onClick={() => {
                  setCheckEmail(false);
                  setMode(mode === "signin" ? "signup" : "signin");
                }}
              >
                {mode === "signin" ? "Create one" : "Sign in"}
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
