import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { messages, type Message } from "@/data/mock";
import { fmtRelative } from "@/lib/format";
import { Send, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/messages")({
  head: () => ({
    meta: [
      { title: "Messages — CBM Records" },
      { name: "description", content: "Chat with your manager, marketing and support team." },
      { property: "og:title", content: "Messages — CBM Records" },
      { property: "og:description", content: "Chat with your manager, marketing and support team." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const [selected, setSelected] = useState<Message>(messages[0]);
  const [draft, setDraft] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader title="Messages" description="Threads with your CBM Records team." />
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="surface-card overflow-hidden">
          <div className="border-b border-border/60 p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search…" className="pl-8" />
            </div>
          </div>
          <ul className="max-h-[560px] overflow-y-auto">
            {messages.map((m) => (
              <li key={m.id}>
                <button onClick={() => setSelected(m)} className={`w-full text-left px-4 py-3 border-b border-border/40 hover:bg-muted/40 transition-colors ${selected.id === m.id ? "bg-muted/50" : ""}`}>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={m.avatarUrl} />
                      <AvatarFallback>{m.from.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium">{m.from}</p>
                        <span className="text-[10px] text-muted-foreground">{fmtRelative(m.sentAt)}</span>
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{m.preview}</p>
                    </div>
                    {m.unread && <span className="ml-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card flex min-h-[560px] flex-col">
          <div className="flex items-center gap-3 border-b border-border/60 p-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={selected.avatarUrl} />
              <AvatarFallback>{selected.from.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate font-medium">{selected.from}</p>
              <p className="text-xs text-muted-foreground">{selected.role}</p>
            </div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            <Bubble side="in" body={selected.preview + " Let me know a time that works for you."} time="9:12 AM" />
            <Bubble side="out" body="Thursday 3pm WAT works for me — see you then." time="9:24 AM" />
            <Bubble side="in" body="Perfect. Calendar invite incoming ✨" time="9:26 AM" />
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); if (!draft.trim()) return; toast.success("Message sent"); setDraft(""); }}
            className="flex items-center gap-2 border-t border-border/60 p-3"
          >
            <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a message…" />
            <Button type="submit" size="icon" className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95"><Send className="h-4 w-4" /></Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Bubble({ side, body, time }: { side: "in" | "out"; body: string; time: string }) {
  return (
    <div className={`flex ${side === "out" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-md rounded-2xl px-4 py-2.5 text-sm ${side === "out" ? "gradient-brand text-primary-foreground" : "bg-muted"}`}>
        <p>{body}</p>
        <p className={`mt-1 text-[10px] ${side === "out" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{time}</p>
      </div>
    </div>
  );
}
