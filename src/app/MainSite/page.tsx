import Homeostasis from "@/components/sections/Homeostasis"
import Exposure from "@/components/sections/Exposure"
import Prodrome from "@/components/sections/Prodrome"
import Recovery from "@/components/sections/Recovery"
import Latent from "@/components/sections/Latent"
import Relapse from "@/components/sections/Relapse"
import Manifest from "@/components/sections/Manifest"
import Death from "@/components/sections/Death"
import ScrollDebug from "@/components/ui/scrollDebut"

export default function page() {
  return (
    <>
        <ScrollDebug />
      <main className="relative overflow-x-hidden">
        <Homeostasis />
        <Exposure />
        <Prodrome />
        <Recovery />
        <Latent />
        <Relapse />
        <Manifest />
        <Death />
      </main>
    </>
  )
}
