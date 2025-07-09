"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef(({ className, children, height = "400px", ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden rounded-md", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="w-full rounded-[inherit]" style={{ height }}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-all ease-out duration-300",
      orientation === "vertical" &&
        "w-4 border-l border-l-transparent p-[1px] hover:bg-opacity-70", // Increased scrollbar width
      orientation === "horizontal" &&
        "h-2 flex-col border-t border-t-transparent p-[1px] hover:bg-opacity-70", // Increased scrollbar height
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        "relative flex-1 rounded-full bg-primary transition-all ease-out duration-200",
        "hover:bg-primary/80 focus:outline-none"
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
