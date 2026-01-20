import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { NavMain } from "./nav-main";
import { UserNav } from "./user-nav";
import { ModeToggle } from "../ModeToggle";

export function AppSidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-background">
      {/* Header */}
      <div className="flex justify-between gap-3 px-4 py-4">
        <div className="flex flex-col leading-tight">
          <span className="font-semibold">Acme Inc</span>
          <span className="text-xs text-muted-foreground">Enterprise</span>
        </div>
        <ModeToggle />
      </div>

      <Separator />

      {/* Content */}
      <ScrollArea className="flex-1 px-2">
        <NavMain />
      </ScrollArea>

      <Separator />

      {/* Footer / User */}
      <UserNav />
    </aside>
  );
}
