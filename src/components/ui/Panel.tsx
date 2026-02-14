import { cn } from "@/components/lib/cn"

export default function Panel({
  children,
  className,
  padded = true,
}: {
  children: React.ReactNode
  className?: string
  padded?: boolean
}) {
  return (
    <div className={cn(padded && "p-6 md:p-8", className)}>
      {children}
    </div>
  )
}
