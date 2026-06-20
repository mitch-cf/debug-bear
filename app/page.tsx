import { HeroHeading } from "@/components/hero-heading";
import { SiteNavbar } from "@/components/site-navbar";

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main>
        <HeroHeading />
      </main>
    </>
  );
}
