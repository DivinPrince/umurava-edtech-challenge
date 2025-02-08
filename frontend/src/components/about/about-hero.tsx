const AboutHero = () => {
  return (
    <section className="pb-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-4 lg:pt-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary">
            Our Story
          </h1>
          <p className="text-xl text-paragraph leading-relaxed">
            With 3 years of experience matching African digital talents to local and global job markets,
            we still remain with a big number of jobs that remain unfilled due to the lack of experienced African Talents.
          </p>
          <p className="text-lg text-paragraph leading-relaxed">
            Driven by our mission to place skilled and professional digital talent, we created Skills Challenges as a project-based
            learning solution for talents to gain real-world experience, solve problems, and build portfolios so that
            they become ready for global job markets.
          </p>
        </div>
        <div className="relative w-full aspect-square bg-primary rounded-2xl overflow-hidden shadow-lg p-4 min-h-[500px] lg:w-[120%]">
          <div className="absolute inset-4 rounded-xl overflow-hidden pointer-events-none">
            <iframe 
              className="w-[180%] h-[180%] -translate-x-[22%] -translate-y-[22%]"
              src="https://www.youtube.com/embed/bOgZPZrom2Q?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=bOgZPZrom2Q&disablekb=1&modestbranding=1&playsinline=1&iv_load_policy=3&version=3&enablejsapi=1"
              title="Umurava Challenge Introduction"
              allow="autoplay"
              frameBorder="0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero 
