import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import { Link } from "@inertiajs/react";

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-6">
        <div className="hidden lg:block">
          <Link href={"/"}>
            <img
              src="/assets/logo/logo.svg"
              className="w-15 h-15"
            />
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-4">
          <UserNav />
        </div>
      </nav>
    </div>
  );
}
