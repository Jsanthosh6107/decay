import * as React from "react"
import { cn } from "@/lib/utils"

type TextImageProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string
  invert?: boolean
}

export function TextImage({
  className,
  invert = false,
  ...props
}: TextImageProps) {
  return (
    <div
      className={cn(
        "flex items-center p-40",
        invert ? "flex-row-reverse text-right" : "flex-row",
        className
      )}
      {...props}
    />
  )
}