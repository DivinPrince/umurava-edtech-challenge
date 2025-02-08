import InstitutionsLogos from "@/components/institutions/institutions-logos"
import HowTo from "@/components/institutions/how-to"
import InstitutionsHero from "@/components/institutions/institutions-hero"
import InstitutionsGrids from "@/components/institutions/institutions-grids"

const InstitutionsPage = () => {
  return (
    <main className="pt-24">
      <InstitutionsHero />
      <InstitutionsGrids />
      <InstitutionsLogos />
      <HowTo />
    </main>
  )
}

export default InstitutionsPage 