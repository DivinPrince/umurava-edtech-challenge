import { Briefcase, Award, GraduationCap, Users2 } from "lucide-react"
import Image from "next/image"

const advantages = [
  {
    id: 1,
    title: "Enhance Your Employment Path",
    description: "Network with other talented individuals and learn from their experiences",
    icon: Briefcase
  },
  {
    id: 2,
    title: "Earn Recognition and Prizes",
    description: "Gain valuable experience and knowledge to advance your career in the digital economy",
    icon: Award
  },
  {
    id: 3,
    title: "Personal Growth",
    description: "Challenge yourself, learn new skills, and expand your professional network",
    icon: GraduationCap
  },
  {
    id: 4,
    title: "Learn from Industry Experts",
    description: "Access valuable insights and guidance from experienced professionals in the digital careers fields and spaces",
    icon: Users2
  }
]

const Advantages = () => {
  return (
    <section className="py-10 px-4 md:px-8 lg:px-16 bg-grayed border-t border-gray-200 w-full">
      <div className="w-full md:max-w-7xl mx-auto space-y-6">
        <div className="space-y-2 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-title">
            What else can I gain from participating in Skills Challenges?
          </h2>
          <p className="text-lg text-paragraph/70">
            Join Skills Challenges Program to accelerate your career growth and become part of Africa&apos;s largest
            workforce of digital professionals.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="flex flex-col gap-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {advantages.map((advantage) => (
                <div key={advantage.id} className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <advantage.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-title">{advantage.title}</h3>
                  <p className="text-paragraph">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/skill section banner 1.png"
              alt="Skills Challenges Dashboard"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Advantages 