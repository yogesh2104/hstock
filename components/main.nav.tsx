"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav({scroll}:{scroll:boolean}) {
  return (
    <div className={"mr-4 hidden md:flex"}>
      <nav className={cn("flex items-center gap-4 text-sm xl:gap-6",scroll && "dark:text-white text-black")}>
        <Link href="/" className={cn("hover:text-foreground/80")}>Home</Link>
        <Link href="/#features" className={cn("hover:text-foreground/80")}>Feature</Link>
        <Link href="/#our-design" className={cn("hover:text-foreground/80")}>Our Design</Link>
        <Link href="/traning-demo-videos" className={cn("hover:text-foreground/80")}>Traning & Demo Videos</Link>
        <Link href="/contact" className={cn("transition-colors hover:text-foreground/80")}>Contact</Link>
      </nav>
    </div>
  )
}