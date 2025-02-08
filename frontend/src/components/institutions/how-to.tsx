import Image from "next/image"
import InstitutionsCta from "./institutions-cta"

const HowTo = () => {
    return (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-grayed">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-title">
                    How Skills Challenges Program can Be<br/> Integrated into your Learning Institution
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-2">
                        <div className="flex items-center gap-4 p-3">
                            <span className="flex-shrink-0 border border-black flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background font-bold">1</span>
                            <p className="text-lg font-medium text-paragraph text-pretty">As Career Development and Job Readiness Program</p>
                        </div>
                        <div className="flex items-center gap-4 p-3">
                            <span className="flex-shrink-0 border border-black flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background font-bold">2</span>
                            <p className="text-lg font-medium text-paragraph text-pretty">As Skills Assessments Method after a course or a term</p>
                        </div>
                        <div className="flex items-center gap-4 p-3">
                            <span className="flex-shrink-0 border border-black flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background font-bold">3</span>
                            <p className="text-lg font-medium text-paragraph text-pretty">As extracurricular activities to complement academic courses</p>
                        </div>
                        <div className="flex items-center gap-4 p-3">
                            <span className="flex-shrink-0 border border-black flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background font-bold">4</span>
                            <p className="text-lg font-medium text-paragraph text-pretty">As the portfolio of the Students</p>
                        </div>
                        <div className="flex items-center gap-4 p-3">
                            <span className="flex-shrink-0 border border-black flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background font-bold">5</span>
                            <p className="text-lg font-medium text-paragraph text-pretty">As part of Capstone Projects or final-year assignments</p>
                        </div>
                    </div>
                    <div className="relative w-full h-[500px]">
                            <Image 
                                src="/banner_dashboard.png" 
                                alt="banner image" 
                                fill
                                className="object-contain rounded-2xl"
                                priority
                            />
                    </div>
                </div>
            </div>
            <InstitutionsCta /> 
        </section>
    )
}

export default HowTo
