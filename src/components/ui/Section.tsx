import { cn } from "@/components/lib/cn"

export default function Section({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("relative w-full", className)}>
      {children}
    </section>
  )
}