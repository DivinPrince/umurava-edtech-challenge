import Image from 'next/image'
import React from 'react'

const WorkExperience = () => {
    return (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-grayed w-full">
            <div className=" w-full md:max-w-5xl mx-auto">

                <h1 className="text-3xl md:text-4xl font-bold text-center py-5 text-pretty md-px-20 mx-auto text-title">Experience a New Way of Building Work Experience</h1>
                <p className="text-lg text-center text-pretty md:px-48 mx-auto text-paragraph">
                    Join Skills Challenges Program to accelerate your career growth and become part of Africa&apos;s largest workforce of digital professionals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10">
                    <div className="bg-primary p-12 rounded-xl md:col-span-2">
                        <div className="w-14 h-14 p-4 rounded-sm bg-secondary flex items-center justify-center mb-4">
                            <Image src="/Case Round.svg" alt='bag' sizes="md" className="text-primary" width={50} height={50} />
                        </div>
                        <h2 className="text-xl font-bold mb-3 text-background">Build a Strong Portfolio and Hand-On Experience</h2>
                        <p className="text-lg text-background">
                            Tackle real-world projects through challenges and hackathons that mirror real world challenges faced by businesses and organizations. Therefore, showcase your skills and accomplishments to potential employers and clients through a portofolio of completed projects.
                        </p>
                    </div>

                    <div className="bg-primary p-12 rounded-xl">
                        <div className="w-14 h-14 p-4 rounded-sm bg-secondary flex items-center justify-center mb-4">
                            <Image src="/Case Round.svg" alt='bag' sizes="md" className="text-primary" width={50} height={50} />
                        </div>
                        <h2 className="text-xl font-bold mb-3 text-background">Enhance Your Employment Path</h2>
                        <p className="text-lg text-background">
                            Develop the in-demand skills and build a strong portofolio to increase your chances of landing your dream job or contract.
                        </p>
                    </div>


                    <div className="bg-primary p-12 rounded-xl">
                        <div className="w-14 h-14 p-4 rounded-sm bg-secondary flex items-center justify-center mb-4">
                            <Image src="/Case Round.svg" alt='bag' sizes="md" className="text-primary" width={50} height={50} />
                        </div>
                        <h2 className="text-xl font-bold mb-3 text-background">Earn Recognition and Prizes</h2>
                        <p className="text-lg text-background">
                            Earn both Money and Knowledge Prizes by participating in various contests and competitions by working on real world projects and hackathons from our partner companies & organizations
                        </p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default WorkExperience