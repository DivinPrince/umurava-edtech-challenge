import Image from "next/image"
import { Button } from "../ui/button"

const CTA = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 mt-20 mb-4">
      <section className="bg-primary py-16 px-8 md:px-12 lg:px-20 relative overflow-hidden rounded-3xl mx-auto">

        <div className="absolute -top-[250px] sm:-top-[275px] md:-top-[250px] -right-[150px] sm:-right-[175px] md:-right-[200px] w-[300px] sm:w-[350px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[400px] border-[30px] sm:border-[40px] md:border-[70px] border-white/10 rounded-full rotate-[135deg]" />
        <div className="absolute -bottom-[180px] sm:-bottom-[200px] md:-bottom-[360px] -left-[0px] sm:-left-[100px] md:-left-[10px] w-[300px] sm:w-[350px] md:w-[450px] h-[300px] sm:h-[350px] md:h-[450px] border-[30px] sm:border-[40px] md:border-[70px] border-white/10 rounded-full -rotate-[135deg]" />

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="max-w-md">
            <Image
              src="/Rectangle 4386 1.png"
              alt="Students collaborating on a laptop"
              width={350}
              height={350}
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="max-w-xl space-y-6">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Unlock Your Career Potential Today!
            </h1>
            <p className="text-lg leading-relaxed text-blue-50">
              Join a challenge to meaningfully gain valuable work experience, build an impressive portfolio and increase
              your chances to land job opportunities and accelerate your career growth
            </p>
            <Button variant="secondary" size="lg" className="font-semibold text-blue-600 bg-background">
              View Challenge
            </Button>
          </div>
        </div>
      </section>
    </div>

  )
}

export default CTA