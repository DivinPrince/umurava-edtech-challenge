
const statistics = [
    {
        id: 1,
        title: '1',
        description: 'Year'
    },
    {
        id: 2,
        title: '500+',
        description: 'Challenges Completed'
    },
    {
        id: 3,
        title: '10K',
        description: 'users'
    },
    {
        id: 4,
        title: '6+',
        description: 'Countries'
    }
]

const Statistics = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 mt-20">
      <section className="bg-primary py-16 px-8 md:px-12 lg:px-20 relative overflow-hidden rounded-3xl mx-auto">
        <div className="absolute -top-[250px] sm:-top-[275px] md:-top-[250px] -right-[150px] sm:-right-[175px] md:-right-[200px] w-[300px] sm:w-[350px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[400px] border-[30px] sm:border-[40px] md:border-[70px] border-white/10 rounded-full rotate-[135deg]" />
        <div className="absolute -bottom-[180px] sm:-bottom-[200px] md:-bottom-[360px] -left-[0px] sm:-left-[100px] md:-left-[10px] w-[300px] sm:w-[350px] md:w-[450px] h-[300px] sm:h-[350px] md:h-[450px] border-[30px] sm:border-[40px] md:border-[70px] border-white/10 rounded-full -rotate-[135deg]" />
          
          <div className="flex justify-between gap-8 py-4 items-center relative">
            {statistics.map((stat) => (
              <div key={stat.id} className="text-center flex flex-col items-center space-y-2">
                <h2 className="text-3xl md:text-5xl font-bold text-background">{stat.title}</h2>
                <p className="text-white text-md md:text-xl">{stat.description}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}

export default Statistics