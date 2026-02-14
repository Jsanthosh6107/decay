import { ReactNode } from "react"

export default function Stack({
  children,
  gap = "gap-6",
}: {
  children: ReactNode
  gap?: string
}) {
  return <div className={`flex flex-col ${gap}`}>{children}</div>
}
