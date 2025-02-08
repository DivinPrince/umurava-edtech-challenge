"use client"

import { useEffect, useState } from "react"
import { Play } from "lucide-react"

const slides = [
    {
        id: 1,
        author: "Manzi Jack",
        role: "Product Designer, Kigali",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m3QC93wOb5fjW749mOAGphnfTOIYvj.png",
    },
    {
        id: 2,
        author: "Manzi Jack",
        role: "Product Designer, Kigali",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m3QC93wOb5fjW749mOAGphnfTOIYvj.png",
    },
    {
        id: 3,
        author: "Manzi Jack",
        role: "Product Designer, Kigali",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m3QC93wOb5fjW749mOAGphnfTOIYvj.png",
    },
    {
        id: 4,
        author: "Manzi Jack",
        role: "Product Designer, Kigali",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m3QC93wOb5fjW749mOAGphnfTOIYvj.png",
    },
    {
        id: 5,
        author: "Manzi Jack",
        role: "Product Designer, Kigali",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m3QC93wOb5fjW749mOAGphnfTOIYvj.png",
    },
    {
        id: 6,
        author: "Manzi Jack",
        role: "Product Designer, Kigali",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m3QC93wOb5fjW749mOAGphnfTOIYvj.png",
    },
]

export default function Talents() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [slidesPerView, setSlidesPerView] = useState(3)

    useEffect(() => {
        const updateSlidesPerView = () => {
            if (window.innerWidth >= 1024) setSlidesPerView(3)
            else if (window.innerWidth >= 640) setSlidesPerView(2)
            else setSlidesPerView(1)
        }

        updateSlidesPerView()
        window.addEventListener('resize', updateSlidesPerView)
        return () => window.removeEventListener('resize', updateSlidesPerView)
    }, [])

    useEffect(() => {
        if (!isAutoPlaying) return

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 3000)

        return () => clearInterval(timer)
    }, [isAutoPlaying])

    const handleSlideClick = (index: number) => {
        setCurrentSlide(index)
        setIsAutoPlaying(false)
        // Resume auto-play after 5 seconds of user inactivity
        setTimeout(() => setIsAutoPlaying(true), 5000)
    }

    return (
        <div className="w-full max-w-7xl py-10 px-4 md:px-8 lg:px-16 space-y-6">
            <div className="space-y-2 text-start">
                <h2 className="text-3xl md:text-4xl font-bold text-title">
                    Users are in Love with Skills <br/> Challenges Program
                </h2>
                <p className="text-lg text-paragraph/70">
                See what our clients say about working with us. Their success speaks for our dedication and expertise.
                </p>
            </div>
            <div className="relative">
                <div className="overflow-hidden p-2">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(calc(-${currentSlide * 100}% / ${slidesPerView}))`,
                        }}
                    >
                        {slides.map((slide) => (
                            <div key={slide.id} className="w-full flex-shrink-0 px-2 sm:w-1/2 lg:w-1/3">
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="relative aspect-video bg-blue-500">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                                                <Play className="w-6 h-6 text-blue-500" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-medium text-gray-900">{slide.author}</h3>
                                            <p className="text-sm text-gray-500">{slide.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${currentSlide === index ? "bg-primary" : "bg-grayed"
                                }`}
                            onClick={() => handleSlideClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

