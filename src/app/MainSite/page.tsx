// app/page.tsx
import Homeostasis from "@/components/sections/Homeostasis";
import Exposure from "@/components/sections/Exposure";
import Prodrome from "@/components/sections/Prodrome";
import Recovery from "@/components/sections/Recovery";
import Latent from "@/components/sections/Latent";
import Relapse from "@/components/sections/Relapse";
import Manifest from "@/components/sections/Manifest";
import Death from "@/components/sections/Death";
import ScrollDebug from "@/components/ui/scrollDebug";
import NetworkBackground from "@/components/ui/BackgroundAnimated";

export default function Page() {
  return (
    <>
      <NetworkBackground />
      <ScrollDebug />
      <main className="relative z-0 overflow-x-hidden">
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
  );
}