import { LandingSections } from "@/components/shikshan/LandingSections";
import { ShikshanHero } from "@/components/shikshan/ShikshanHero";
import { ThreeWarningFilter } from "@/components/shikshan/ThreeWarningFilter";

export default function Home() {
  return (
    <main className="shikshan-site">
      <ThreeWarningFilter />
      <ShikshanHero />
      <LandingSections />
    </main>
  );
}
