import { Button } from '../ui/button'

const InstitutionsCta = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 mt-20">
      <section className="bg-primary py-16 px-8 md:px-12 lg:px-20 relative overflow-hidden rounded-3xl max-w-[1200px] mx-auto">
        
        <div className="absolute -top-[250px] sm:-top-[275px] md:-top-[300px] -right-[150px] sm:-right-[175px] md:-right-[200px] w-[300px] sm:w-[350px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[400px] border-[30px] sm:border-[40px] md:border-[70px] border-white/10 rounded-full rotate-[135deg]" />
        <div className="absolute -bottom-[250px] sm:-bottom-[275px] md:-bottom-[280px] -left-[150px] sm:-left-[175px] md:-left-[150px] w-[300px] sm:w-[350px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[400px] border-[30px] sm:border-[40px] md:border-[70px] border-white/10 rounded-full -rotate-[135deg]" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to transform your <br /> learning institution?
          </h2>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 text-lg font-medium px-8 py-6"
            >
              Let&apos;s Partner
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InstitutionsCta