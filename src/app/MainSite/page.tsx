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
import MainSiteAmbientAudio from "@/components/ui/MainSiteAmbientAudio";

export default function Page() {
  return (
    <main 
      id="scroll-root"
      className="relative h-screen overflow-y-auto snap-y snap-mandatory overflow-x-hidden"
    >
      <MainSiteAmbientAudio />
      <NetworkBackground />
      <ScrollDebug />
      <Homeostasis />
      <Exposure />
      <Prodrome />
      <Recovery />
      <Latent />
      <Relapse />
      <Manifest />
      <Death />
    </main>
  );
}
