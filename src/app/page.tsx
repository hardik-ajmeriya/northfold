import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/hero/Hero";
import { Materials } from "@/components/materials/Materials";
import { Register } from "@/components/Register";
import { Retrofit } from "@/components/retrofit/Retrofit";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Contact } from "@/components/studio/Contact";
import { Practice } from "@/components/studio/Practice";
import { Process } from "@/components/studio/Process";
import { Work } from "@/components/work/Work";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Register />
        <Work />
        <Retrofit />
        <Materials />
        <Practice />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
