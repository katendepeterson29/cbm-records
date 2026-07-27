import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { StatusPill } from "@/components/portal/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentArtist } from "@/data/mock";
import { fmtDate } from "@/lib/format";
import { BadgeCheck, Upload, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [
      { title: "Profile & KYC — CBM Records" },
      { name: "description", content: "Manage your artist profile and verification." },
      { property: "og:title", content: "Profile & KYC — CBM Records" },
      { property: "og:description", content: "Manage your artist profile and verification." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Profile & KYC" description="Public artist details and identity verification." />

      <div className="surface-card overflow-hidden">
        <div className="h-32 gradient-brand" />
        <div className="p-6">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-end gap-4 -mt-14 sm:items-center">
            <Avatar className="h-24 w-24 shrink-0 border-4 border-background shadow-elegant">
              <AvatarImage src={currentArtist.avatarUrl} />
              <AvatarFallback>{currentArtist.stageName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 pb-2 sm:pb-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate font-display text-2xl font-semibold">{currentArtist.stageName}</h2>
                {currentArtist.verified && <BadgeCheck className="h-5 w-5 text-primary" />}
              </div>
              <p className="text-sm text-muted-foreground">{currentArtist.city}, {currentArtist.country} · Joined {fmtDate(currentArtist.joinedAt)}</p>
            </div>
            <StatusPill tone={currentArtist.kycStatus === "verified" ? "success" : currentArtist.kycStatus === "pending" ? "warning" : "destructive"}>
              <ShieldCheck className="mr-1 h-3 w-3" /> KYC {currentArtist.kycStatus}
            </StatusPill>
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }}
        className="grid gap-6 lg:grid-cols-2"
      >
        <div className="surface-card p-6 space-y-4">
          <h3 className="font-display text-lg font-semibold">Public profile</h3>
          <div className="space-y-1.5"><Label>Stage name</Label><Input defaultValue={currentArtist.stageName} /></div>
          <div className="space-y-1.5"><Label>Bio</Label><Textarea rows={4} defaultValue={currentArtist.bio} /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><Label>City</Label><Input defaultValue={currentArtist.city} /></div>
            <div className="space-y-1.5"><Label>Country</Label><Input defaultValue={currentArtist.country} /></div>
          </div>
          <div>
            <Label>Genres</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {currentArtist.genres.map((g) => <StatusPill key={g} tone="primary">{g}</StatusPill>)}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6 space-y-4">
            <h3 className="font-display text-lg font-semibold">Contact</h3>
            <div className="space-y-1.5"><Label>Legal name</Label><Input defaultValue={currentArtist.legalName} /></div>
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" defaultValue={currentArtist.email} /></div>
            <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue={currentArtist.phone} /></div>
          </div>
          <div className="surface-card p-6 space-y-4">
            <h3 className="font-display text-lg font-semibold">Identity verification</h3>
            <p className="text-sm text-muted-foreground">Verified with government ID on {fmtDate(currentArtist.joinedAt)}.</p>
            <Button type="button" variant="outline"><Upload className="mr-2 h-4 w-4" /> Update documents</Button>
          </div>
        </div>
        <div className="lg:col-span-2 flex justify-end">
          <Button type="submit" className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95">Save changes</Button>
        </div>
      </form>
    </div>
  );
}
