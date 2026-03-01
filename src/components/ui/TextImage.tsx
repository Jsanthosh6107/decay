import * as React from "react"
import { cn } from "@/lib/utils"

type WithClassName<T> = T & { className?: string }

export function TextImage({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        "flex flex-row items-center p-40",
        className
      )}
      {...props}
    />
  )
}