import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CircleUser, EllipsisVertical, LogOut } from "lucide-react";

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-between items-center hover:bg-accent">
          <div className="flex w-full items-center gap-3 px-4 py-3 ">
            <Avatar className="h-8 w-8">
              <AvatarFallback>SH</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left text-sm leading-tight">
              <span className="font-medium">shadcn</span>
              <span className="text-xs text-muted-foreground">
                m@example.com
              </span>
            </div>
          </div>
          <EllipsisVertical className="mr-5" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="end" className="w-56">
        <DropdownMenuItem>
          <CircleUser />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut />
          LogOut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
