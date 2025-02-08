import AboutGrids from "@/components/about/about-grids"
import AboutCta from "@/components/about/about-cta"
import AboutHero from "@/components/about/about-hero"

const AboutPage = () => {
  return (
    <main className="pt-24">
      <AboutHero />
      <AboutGrids />
      <AboutCta />
    </main>
  )
}

export default AboutPage 