import Image from 'next/image'

const InstitutionsGrids = () => {
    return (
        <section className="py-20 px-4 md:px-8 lg:px-16 md:mt-24 mt-16 bg-grayed">
            <div className="max-w-6xl mx-auto pl-2">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-title">Key Offerings & Benefits</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-primary p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 p-4 rounded-sm bg-secondary flex items-center justify-center mb-4">
                            <Image src="/Case Round.svg" alt='bag' sizes="md" className="text-primary" width={50} height={50} />
                        </div>
                        <h1 className="text-xl font-semibold mb-3 text-background">Employability and Career Development Opportunities</h1>
                        <p className="text-background leading-relaxed text-sm">Students gain hands-on experience working on real-world challenges
                            and help them build professional networks that increase their chances
                            and readiness of landing job opportunities and this lead to career advancement
                            and long-term success.</p>
                    </div>
                    <div className="bg-primary p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 p-4 rounded-sm bg-secondary flex items-center justify-center mb-4">
                            <Image src="/Case Round.svg" alt='bag' sizes="md" className="text-primary" width={50} height={50} />
                        </div>
                        <h1 className="text-xl font-semibold mb-3 text-background">Practical Application of Classroom Knowledge</h1>
                        <p className="text-background leading-relaxed text-sm">The Skills Challenges bridge the gap between theoretical learning and practical application, reinforcing
                            what students learn in their academic courses.</p>
                    </div>
                    <div className="bg-primary p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 p-4 rounded-sm bg-secondary flex items-center justify-center mb-4">
                            <Image src="/Case Round.svg" alt='bag' sizes="md" className="text-primary" width={50} height={50} />
                        </div>
                        <h1 className="text-xl font-semibold mb-3 text-background">Students & Trainees Engagement</h1>
                        <p className="text-background leading-relaxed text-sm">courses to give students and trainees hands-on projects and practices that enhance their learning experience
                            and skills mastery. Competitive and project-based challenges keep students motivated and actively engaged in
                            their learning journey.</p>
                    </div>
                    <div className="bg-primary p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
                        <div className="w-14 h-14 p-4 rounded-sm bg-secondary flex items-center justify-center mb-4">
                            <Image src="/Case Round.svg" alt='bag' sizes="md" className="text-primary" width={50} height={50} />
                        </div>
                        <h1 className="text-xl font-semibold mb-3 text-background">Access to the Industry Experts & Mentors</h1>
                        <p className="text-background leading-relaxed text-sm">Skills Challenges expose students to industry experts and mentors who offer guidance, support, and insights
                            on the trends of digital careers. This can help students gain a deep understanding of their chosen field.</p>
                    </div>
                    <div className="bg-primary p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 p-4 rounded-sm bg-secondary flex items-center justify-center mb-4">
                            <Image src="/Case Round.svg" alt='bag' sizes="md" className="text-primary" width={50} height={50} />
                        </div>
                        <h1 className="text-xl font-semibold mb-3 text-background">Skills Assessments</h1>
                        <p className="text-background leading-relaxed text-sm">Embed our projects based tests and skills assessments directly into your curriculum.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InstitutionsGrids
