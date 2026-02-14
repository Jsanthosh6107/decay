import { cn } from "@/components/lib/cn"

export default function Spacer({
  size = "py-[25vh]",
  className,
}: {
  size?: string
  className?: string
}) {
  return <div className={cn(size, className)} aria-hidden />
}
