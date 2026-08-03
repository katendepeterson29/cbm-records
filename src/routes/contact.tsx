import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { BrandNavigation } from "@/components/landing/BrandOverview";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | CBM Records" },
      {
        name: "description",
        content:
          "Get in touch with CBM Records for artist services, distribution, marketing, publishing, and partnerships.",
      },
    ],
  }),
  component: Contact,
});

const inquiryOptions = [
  "Artist Services",
  "Management",
  "Distribution",
  "Marketing",
  "Publishing",
  "Brand Partnership",
  "General Inquiry",
];

function simulateSubmit() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiry: "Artist Services",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const valid = useMemo(() => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim() || !form.email.includes("@")) next.email = "Valid email is required.";
    if (!form.message.trim()) next.message = "Tell us about your inquiry.";
    return next;
  }, [form]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(valid);
    if (Object.keys(valid).length) return;
    setStatus("submitting");
    try {
      await simulateSubmit();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BrandNavigation />
      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-400">LET'S WORK TOGETHER</p>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            CBM welcomes inquiries from artists, managers, labels, brands, and partners.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Whether you need artist services, distribution support, publishing guidance, or marketing partnership development, our team is ready to connect.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white p-10 shadow-sm">
            <h2 className="text-3xl font-semibold">Contact details</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Reach out for artist services, distribution, marketing, publishing, and brand partnerships.
            </p>
            <div className="mt-8 space-y-6 text-sm text-muted-foreground">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-primary">Email</p>
                <p>cbmrecords3@gmail.com</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-primary">Phone</p>
                <p>+256 776 789 133</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-primary">Connect</p>
                <p>Find out how CBM can support your next release or campaign.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-black/10 bg-white p-10 shadow-sm">
            {status === "success" ? (
              <div className="rounded-3xl bg-emerald-500/10 p-6 text-foreground">
                Thank you. Your message has been received.
              </div>
            ) : null}
            {status === "error" ? (
              <div className="rounded-3xl bg-rose-500/10 p-6 text-rose-600">
                Something went wrong. Please try again.
              </div>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className={errors.name ? "border-rose-500" : ""}
                />
                {errors.name ? <p className="mt-2 text-xs text-rose-600">{errors.name}</p> : null}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className={errors.email ? "border-rose-500" : ""}
                />
                {errors.email ? <p className="mt-2 text-xs text-rose-600">{errors.email}</p> : null}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="company">Company / Organization</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(event) => setForm({ ...form, company: event.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="inquiry">Inquiry Type</Label>
              <select
                id="inquiry"
                value={form.inquiry}
                onChange={(event) => setForm({ ...form, inquiry: event.target.value })}
                className="mt-2 w-full rounded-3xl border border-border/70 bg-background/90 px-4 py-3 text-sm text-foreground outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              >
                {inquiryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                className={errors.message ? "border-rose-500" : ""}
                rows={6}
              />
              {errors.message ? <p className="mt-2 text-xs text-rose-600">{errors.message}</p> : null}
            </div>

            <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-slate-900" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending..." : "SEND MESSAGE"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
