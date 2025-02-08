import Advantages from "@/components/home/advantages";
import Explore from "@/components/home/explore";
import Hero from "@/components/home/hero";
import Payroll from "@/components/home/payroll";
import Skills from "@/components/home/skills";
import Statistics from "@/components/home/statistics";
import Talents from "@/components/home/talents";
import WorkExperience from "@/components/home/work-experience";
import GetStarted from "@/components/home/get-started";
import CTA from "@/components/home/cta";
export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero/>
      <WorkExperience />
      <Statistics />
      <Skills />
      <Payroll/>
      <Explore />
      <Advantages />
      <Talents />
      <GetStarted />
      <CTA />
    </main>
  );
}



