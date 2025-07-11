"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, trackClassName, thumbClassName, onValueChangeEnd, ...props }, ref) => {
  const handleValueChangeEnd = (value) => {
    // Apply the value change when the user finishes interacting with the slider
    if (onValueChangeEnd) {
      onValueChangeEnd(value); // Pass the value to the parent component to handle the update
    }
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}>
      <SliderPrimitive.Track
        className={cn("relative h-2 w-full grow overflow-hidden rounded-full bg-secondary", trackClassName)}>
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn("block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", thumbClassName)}
        onPointerUp={(e) => handleValueChangeEnd(props.value)} // Apply the value change when the user releases the pointer
      />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider }
