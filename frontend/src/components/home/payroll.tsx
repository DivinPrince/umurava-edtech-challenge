"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Slide = {
    id: number;
    title: string;
    description: string;
    image: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "The Embedded Finance Platform",
        description: "The Embedded Finance Platform and Payroll Management Software Solutions for your organization and Workforce.",
        image: "/payrolldashboard.png"
    },
    {
        id: 2,
        title: "Payroll Management",
        description: "Streamline your payroll process with our comprehensive management solutions.",
        image: "/payrolldashboard.png"
    },
    {
        id: 3,
        title: "Workforce Solutions",
        description: "Empower your workforce with our integrated management solutions.",
        image: "/payrolldashboard.png"
    },
    {
        id: 4,
        title: "Payroll Management",
        description: "Streamline your payroll process with our comprehensive management solutions.",
        image: "/payrolldashboard.png"
    }
];

const Payroll = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideIndex = Math.abs(currentSlide) % slides.length;

    return (
        <section className="flex flex-col gap-8 items-center justify-center py-10 px-4 md:px-8 lg:px-16 bg-background ">
            <div className="flex flex-col items-center w-full md:max-w-7xl bg-[#F1F1F1] rounded-xl py-8 gap-12 m-auto">
                <div className="flex flex-col lg:flex-row h-full w-full gap-12 px-12">
    
                    <div className="flex flex-col justify-center flex-1 gap-14">
                        <div className="w-20 h-20 p-4 bg-white rounded-2xl shadow-sm">
                            <img 
                                src="/sokofund-logo.png" 
                                alt="SokoFund logo" 
                                width={500} 
                                height={500}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="text-md md:text-lg w-full md:pr-20 text-paragraph/45 leading-relaxed">
                            {slides[slideIndex]!.description}
                        </p>
                        <Link 
                            href={"/"}
                            className="text-primary font-bold hover:underline-none hover:text-primary/90 p-0 h-auto flex items-center gap-2 group w-fit"
                        >
                            Learn more
                            <ArrowRight color="#ffffff" className="w-6 h-6 p-1 bg-primary group-hover:bg-lime-400 rounded-full" />
                        </Link>
                    </div>

                    <div className="flex-1 relative h-[500px] overflow-hidden">
                        <Image 
                            src={slides[slideIndex]!.image}
                            alt={`${slides[slideIndex]!.title} Preview`}
                            fill
                            className="object-contain transition-opacity duration-500"
                            priority
                        />
                    </div>
                </div>

            
            </div>
                <div className="flex items-center justify-center gap-3">
                    {slides.map((_, index) => (
                        <Button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={cn(
                                "w-1 h-1 p-2 rounded-full transition-all duration-300",
                                currentSlide === index 
                                    ? "bg-primary" 
                                    : "bg-gray-300 hover:bg-gray-400"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
        </section>
    )
}

export default Payroll