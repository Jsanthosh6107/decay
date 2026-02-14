import { cn } from "@/components/lib/cn"

export default function Viewport({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "min-h-dvh flex items-center",
        className
      )}
    >
      {children}
    </div>
  )
}
