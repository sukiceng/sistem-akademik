import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import DashboardNav from "./dashboard-nav";

// import { Playlist } from "../data/playlists";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
      label: "Dashboard",
    },
    {
      title: "User",
      href: "/dashboard/user",
      icon: "user",
      label: "user",
    },
    {
      title: "Kelas & Mapel",
      href: "/dashboard/Kelas&Mapel",
      icon: "shapes",
      label: "kelas & mapel",
    },
    {
      title: "Nilai",
      href: "/dashboard/nilai",
      icon: "kanban",
      label: "kanban",
    },
    {
      title: "Kenaikan Kelas",
      href: "/",
      icon: "school",
      label: "school",
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: "profile",
      label: "profile",
    },
  ];
  return (
    <>
      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="!px-0"
        >
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Overview</h2>
              <div className="space-y-1">
                <DashboardNav
                  items={navItems}
                  isMobileNav={true}
                  setOpen={setOpen}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
