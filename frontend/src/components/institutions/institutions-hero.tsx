import { Button } from '../ui/button'
import Image from 'next/image'

const InstitutionsHero = () => {
  return (
    <section className="px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 lg:pt-12">
          <h1 className="text-xl md:text-2xl font-bold leading-tight text-primary">
            Accelerate Your Students&apos; Career Growth Through Project-Based Learning
          </h1>
          <p className="text-xl text-paragraph leading-relaxed">
            Partner with us to provide your students with hands-on experience through real-world projects and challenges.
            Build their portfolio and prepare them for successful careers.
          </p>
          <div className="pt-8">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              Partner with Us
            </Button>
          </div>
        </div>
        <div className="relative w-full">
          <Image 
            src="/Image 3.png" 
            alt="Educational institutions" 
            width={600}
            height={600}
            className="w-full h-auto object-cover rounded-xl"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default InstitutionsHero