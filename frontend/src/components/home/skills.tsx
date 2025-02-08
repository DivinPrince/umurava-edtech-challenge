const firstRow = [
    {
        id: 1,
        title: 'UI/UX Design',
    },
    {
        id: 2,
        title: 'Data Science',
    }
]

const secondRow = [
    {
        id: 3,
        title: 'Graphic Design',
    },
    {
        id: 4,
        title: 'Data Analysis & Research',
    },
    {
        id: 5,
        title: 'Animation',
    },
    {
        id: 6,
        title: 'Videography & Photography',
    }
]

const thirdRow = [
    {
        id: 7,
        title: 'Data Science',
    },
    {
        id: 8,
        title: 'AI & Machine Learning',
    },
    {
        id: 9,
        title: 'Web3',
    },

    {
        id: 10,
        title: 'Digital Marketing & Communications',
    }
]

const Skills = () => {
    return (
        <section className="py-12 px-2 md:px-6 lg:px-8">
            <div className="w-full md:max-w-7xl mx-auto space-y-6">
                <div className="space-y-2 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-title">
                        Skills Challenges Cover Various In-demand Skills and Careers for the Digital Economy
                    </h2>
                    <p className="text-lg text-paragraph/70">
                        Explore the projects that various talents are working on.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto p-4">
                    {/* First Row */}
                    <div className="grid grid-cols-2 md:flex md:justify-center gap-2 w-full">
                        {firstRow.map((skill, index) => (
                            <div 
                                key={skill.id}
                                className={`flex justify-center items-center  ${index === 0 ? 'bg-primary text-background' : 'bg-grayed text-paragraph/70'} rounded-md px-4 md:px-8 py-2 md:py-4 text-sm md:text-base cursor-pointer`}
                            >
                                {skill.title}
                            </div>
                        ))}
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-2 md:flex md:justify-center gap-2 w-full">
                        {secondRow.map((skill) => (
                            <div 
                                key={skill.id}
                                className="flex justify-center items-center w-fit whitespace-nowrap bg-grayed text-paragraph/70 rounded-md px-4 md:px-8 py-2 md:py-4 text-sm md:text-base cursor-pointer"
                            >
                                {skill.title}
                            </div>
                        ))}
                    </div>

                    {/* Third Row */}
                    <div className="grid grid-cols-2  md:flex md:justify-center gap-2 w-full">
                        {thirdRow.map((skill) => (
                            <div 
                                key={skill.id}
                                className="flex justify-center items-center w-fit whitespace-nowrap bg-grayed text-paragraph/70 rounded-md px-4 md:px-8 py-2 md:py-4 text-sm md:text-base cursor-pointer"
                            >
                                {skill.title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills