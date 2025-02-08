import Explore from "@/components/home/explore";
import Hero from "@/components/home/hero";
import Payroll from "@/components/home/payroll";
import Skills from "@/components/home/skills";
import Statistics from "@/components/home/statistics";
import WorkExperience from "@/components/home/work-experience";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero/>
      <WorkExperience />
      <Statistics />
      <Skills />
      <Payroll/>
      <Explore />
    
    </main>
  );
}

