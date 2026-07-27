import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/mock-auth";
import { Sparkles, Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — CBM Records" },
      { name: "description", content: "Sign in to the CBM Records artist portal." },
      { property: "og:title", content: "Sign in — CBM Records" },
      { property: "og:description", content: "Sign in to the CBM Records artist portal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/app", replace: true });
  }, [user, navigate]);

  const onSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    try {
      await signIn(String(f.get("email")), String(f.get("password")));
      toast.success("Welcome back");
      navigate({ to: "/app" });
    } finally {
      setBusy(false);
    }
  };
  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    try {
      await signUp(String(f.get("name")), String(f.get("email")), String(f.get("password")));
      toast.success("Account created");
      navigate({ to: "/app" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen gradient-hero lg:grid-cols-2">
      <div className="hidden flex-col justify-between p-12 lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg gradient-brand shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold">CBM Records</span>
        </Link>
        <div>
          <p className="font-display text-4xl font-semibold leading-tight">
            "CBM turned my rollout into a repeatable playbook — I finally know what's working."
          </p>
          <p className="mt-4 text-sm text-muted-foreground">— Kola Sunshine, signed 2023</p>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} CBM Records</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md surface-card p-8 shadow-elegant">
          <div className="mb-6 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg gradient-brand">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold">CBM Records</span>
            </Link>
          </div>
          <h1 className="font-display text-2xl font-semibold">Welcome</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your artist portal. Demo mode — use any email and password.
          </p>

          <Tabs defaultValue="signin" className="mt-8">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-6">
              <form onSubmit={onSignIn} className="space-y-4">
                <Field id="email" label="Email" name="email" type="email" defaultValue="kola@cbmrecords.africa" />
                <Field id="password" label="Password" name="password" type="password" defaultValue="demo1234" />
                <Button type="submit" disabled={busy} className="w-full gradient-brand text-primary-foreground shadow-glow hover:opacity-95">
                  {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign in
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form onSubmit={onSignUp} className="space-y-4">
                <Field id="name" label="Stage name" name="name" defaultValue="Kola Sunshine" />
                <Field id="email2" label="Email" name="email" type="email" defaultValue="new@cbmrecords.africa" />
                <Field id="password2" label="Password" name="password" type="password" defaultValue="demo1234" />
                <Button type="submit" disabled={busy} className="w-full gradient-brand text-primary-foreground shadow-glow hover:opacity-95">
                  {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Create account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, ...rest }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} required {...rest} />
    </div>
  );
}
