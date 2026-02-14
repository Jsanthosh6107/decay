"use client"

import { useState } from "react"

export default function EnterGate({
  children,
}: {
  children: React.ReactNode
}) {
  const [entered, setEntered] = useState(false)

  if (!entered) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <button
          type="button"
          onClick={() => setEntered(true)}
          className="px-6 py-3 rounded-xl"
        >
          Enter Site
        </button>
      </div>
    )
  }

  return <>{children}</>
}
