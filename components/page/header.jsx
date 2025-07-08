"use client";

import { ModeToggle } from "../ModeToggle";
import Logo from "./logo";
import { Button } from "../ui/button";
import Search from "./search";
import { ChevronLeft, Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const path = usePathname();

  return (
    <header className="flex items-center justify-between py-5 px-5 md:px-20 lg:px-32">
      {/* LEFT: Mobile back + logo + theme toggle */}
      <div className="flex items-center gap-3">
      {path !== "/" && (
          <Link href="/" className="flex items-center gap-1">
            <Button className="h-10 px-3">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        )}
        <Logo />
        
      </div>

      {/* CENTER (desktop): Search + desktop back */}
      <div className="hidden sm:flex items-center gap-3 w-full max-w-md">
        <Search />
       
      </div>

      {/* RIGHT: Share button (optional) */}
      <div className="hidden sm:flex">
      <ModeToggle />
      </div>
    </header>
  );
}
