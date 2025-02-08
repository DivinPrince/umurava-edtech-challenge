import { Button } from '../ui/button'
import Image from 'next/image'

const AboutCta = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-full mx-auto pl-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-title">
              Skills Challenges Program is built on the Umurava Talent Marketplace Platform
            </h1>
            <p className="text-lg text-paragraph leading-relaxed">
              A Project-based Learning Solution aimed at providing young and senior talents with an opportunity to showcase their skills to real-world projects and challenges from our partner companies and organizations.
            </p>
            <p className="text-lg text-paragraph leading-relaxed">
              Umurava Skills Challenges enables young talents to build a portfolio and experience that increases their readiness to access job opportunities and projects.
            </p>
            <div className="pt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-16 py-7">
                Get Started
              </Button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Image 
              src="/challenges_img.png" 
              alt="banner image" 
              width={450} 
              height={450}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutCta 