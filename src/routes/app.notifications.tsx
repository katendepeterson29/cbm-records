import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/mock";
import { fmtRelative } from "@/lib/format";
import { Bell, CheckCheck, Music2, Wallet, MessagesSquare, Settings } from "lucide-react";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — CBM Records" },
      { name: "description", content: "Your recent activity across CBM Records." },
      { property: "og:title", content: "Notifications — CBM Records" },
      { property: "og:description", content: "Your recent activity across CBM Records." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotificationsPage,
});

const iconFor = { release: Music2, royalty: Wallet, message: MessagesSquare, system: Settings } as const;

function NotificationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Notifications"
        description="Updates from your releases, royalties, and team."
        actions={<Button variant="outline"><CheckCheck className="mr-2 h-4 w-4" /> Mark all as read</Button>}
      />
      <div className="surface-card divide-y divide-border/40">
        {notifications.map((n) => {
          const Icon = iconFor[n.kind];
          return (
            <div key={n.id} className="flex items-start gap-4 p-5">
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ring-1 ${n.read ? "bg-muted text-muted-foreground ring-border" : "bg-primary/10 text-primary ring-primary/20"}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{fmtRelative(n.createdAt)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
