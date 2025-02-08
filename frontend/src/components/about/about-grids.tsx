import Image from 'next/image'


const AboutGrids = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-grayed">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center py-10 text-title">Why we are solving this problem</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10">
          <div className="bg-primary p-10 rounded-xl md:col-span-2">
            <div className="w-14 h-14 p-4 rounded-sm bg-secondary flex items-center justify-center mb-4">
              <Image src="/Case Round.svg" alt='bag' sizes="md" className="text-primary" width={50} height={50} />
            </div>
            <h2 className="text-xl font-bold mb-3 text-background">Bridging the Experience Gap</h2>
            <p className="text-lg text-background">
              Many talents acquired theoretical knowledge and are rejected from jobs because they lack work experience and are not able to put in actions what they acquired in the schools.
            </p>
          </div>

          <div className="bg-primary p-10 rounded-xl">
            <div className="w-14 h-14 p-4 rounded-sm bg-secondary flex items-center justify-center mb-4">
              <Image src="/Case Round.svg" alt='bag' sizes="md" className="text-primary" width={50} height={50} />
            </div>
            <h2 className="text-xl font-bold mb-3 text-background">Bridging Education and Employment</h2>
            <p className="text-lg text-background">
              Traditional education doesn&apos;t always prepare talents for the demands of the tech and digital economy and we are providing in-demand skills through Skills Challenges.
            </p>
          </div>

          <div className="bg-primary p-10 rounded-xl">
            <div className="w-14 h-14 p-4 rounded-sm bg-secondary flex items-center justify-center mb-4">
              <Image src="/Case Round.svg" alt='bag' sizes="md" className="text-primary" width={50} height={50} />
            </div>
            <h2 className="text-xl font-bold mb-3 text-background">Preparing Talents for Global Job Markets</h2>
            <p className="text-lg text-background">We are ensuring that African talents shine globally and that&apos;s why we are equipping them with global technical experience and standout globally.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutGrids