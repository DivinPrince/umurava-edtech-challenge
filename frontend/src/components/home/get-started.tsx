import Image from 'next/image'

interface StepCardProps {
  stepNumber: number
  title: string
  description: string
  imagePath?: string
}

const StepCard = ({ stepNumber, title, description, imagePath }: StepCardProps) => {
  return (
    <div className="flex flex-col gap-4 h-full bg-card rounded-lg p-4">
      <div className="inline-flex h-8 w-16 items-center justify-center rounded-md bg-blue-500 text-white">
        Step {stepNumber}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {imagePath && (
        <div className="relative w-full flex justify-end translate-x-4">
          <Image
            src={imagePath}
            alt={`Step ${stepNumber} illustration`}
            height={400}
            width={200}
          />
        </div>

      )}
    </div>
  )
}

export default function GetStarted() {
  const leftSteps = [
    {
      title: "Sign up on Umurava Platform",
      description: "Submit your completed project for evaluation",
      imagePath: "/Frame 1618868159 1(1).png"
    },
    {
      title: "Browse Open Challenges",
      description: "Explore the range of challenges and hackathons and choose one that aligns with your interests and career goals",
      imagePath: "/Challenges & Hackathons Page 1.png"
    }
  ]

  const rightSteps = [
    {
      title: "Register and Participate",
      description: "Sign up for the challenge and start working on the project."
    },
    {
      title: "Submit your work",
      description: "Submit your completed project for evaluation"
    },
    {
      title: "Receive Feedback and Recognition",
      description: "Get feedback on your work and celebrate your achievements"
    }
  ]

  return (
    <section className="py-16 px-4 bg-grayed">
      <h2 className="mb-12 text-center text-3xl font-bold">How to Get Started</h2>
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left column - Steps 1 & 2 */}
        <div className="flex flex-col gap-8 md:w-1/2">
          {leftSteps.map((step, index) => (
            <StepCard
              key={index}
              stepNumber={index + 1}
              title={step.title}
              description={step.description}
              imagePath={step.imagePath}
            />
          ))}
        </div>

        {/* Right column - Steps 3, 4 & 5 */}
        <div className="flex flex-col gap-8 md:w-1/2">
          {rightSteps.map((step, index) => (
            <StepCard
              key={index}
              stepNumber={index + 3}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
