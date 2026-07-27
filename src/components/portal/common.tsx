import { ReactNode } from "react";
import { Ban, Search } from "lucide-react";

export function EmptyState({ icon: Icon = Search, title, description, action }: { icon?: React.ComponentType<{ className?: string }>; title: string; description?: string; action?: ReactNode; }) {
  return (
    <div className="surface-card grid place-items-center px-6 py-16 text-center">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      {description && <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function StatusPill({ tone = "muted", children }: { tone?: "muted" | "primary" | "success" | "warning" | "destructive" | "accent"; children: ReactNode }) {
  const map: Record<string, string> = {
    muted: "bg-muted text-muted-foreground border-border",
    primary: "bg-primary/15 text-primary border-primary/30",
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/15 text-warning border-warning/30",
    destructive: "bg-destructive/15 text-destructive border-destructive/30",
    accent: "bg-accent/15 text-accent border-accent/30",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${map[tone]}`}>{children}</span>
  );
}

export const _icons = { Ban };
