import Image from "next/image"
import { Button } from "../ui/button"
import HeroCard from "./hero-card"
import Link from "next/link"

const Hero = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="">
        <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight mb-6">
          Build Work Experience through Skills Challenges Program
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Enhance your Employability and Accelerate your Career Growth by
          working on Hands-on projects & hackathons from various businesses &
          organizations.
        </p>
        <Link href="/dashboard">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
      <div className="w-full flex-1 relative">
        <div className="rounded-[2rem] flex md:flex-row flex-col md:justify-center items-center lg:justify-start lg:gap-4 gap-8 relative">
          <div className="size-14 flex justify-center items-center absolute -top-10 left-[56%] -translate-x-1/2 z-10 bg-card rounded-full p-2">
            <Image
              src="/reactions.png"
              alt="reactions"
              height={50}
              width={50}
              className="size-9 z-[1]"
            />
          </div>
          <HeroCard variant="1"/>
          <HeroCard variant="2"/>
        </div>
        <div className="absolute bottom-4 lg:-left-10 left-1/2 rounded-full flex items-center gap-[14px] shadow-lg bg-card h-12 min-w-44 pl-2 py-1">
          <div className="flex -space-x-2.5">
            {[1, 2, 3, 4].map((i) => (
              <Image
                width={150}
                height={150}
                key={i}
                className="size-8 rounded-full border-2 border-white"
                src={`https://i.pravatar.cc/150?img=${i}`}
                alt={`User ${i}`}
              />
            ))}
          </div>
          <span className="font-semibold text-[11px]">
            20K+ <br /> Talents
          </span>
        </div>
      </div>
    </section>
  )
}


export default Hero