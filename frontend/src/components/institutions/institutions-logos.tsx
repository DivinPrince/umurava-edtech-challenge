import Image from "next/image"

const InstitutionsLogos = () => {
  return (
        <section className="py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-4xl font-bold text-center mb-12 text-title">
                    Join a few Educational Institutions using <br/>Skills Challenges by Umurava
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
                    <div className="w-32 h-16 relative">
                        <Image src="/Tori 1.png" alt="Tori logo" fill className="object-contain" />
                    </div>
                    <div className="w-32 h-16 relative">
                        <Image src="/Gdg_kigali 1.png" alt="gdg kigali logo" fill className="object-contain" />
                    </div>
                    <div className="w-32 h-16 relative">
                        <Image src="/EduCollaborative.png" alt="educationCollaborative logo" fill className="object-contain" />
                    </div>
                    <div className="w-32 h-16 relative">
                        <Image src="/KeplerLogo 1.png" alt="kepler logo" fill className="object-contain" />
                    </div>
                    
                        <div className="w-32 h-16 relative">
                            <Image src="/HiiL_Logo.png" alt="hiil logo" fill className="object-contain" />
                        </div>
                    <div className="w-32 h-16 relative">
                        <Image src="/CIBA 1.png" alt="ciba logo" fill className="object-contain" />
                    </div>
                    <div className="w-32 h-16 relative">
                        <Image src="/Ared 1.png" alt="Ared logo" fill className="object-contain" />
                    </div>
                    <div className="w-32 h-16 relative">
                        <Image src="/IGIHE_LOGO 1.png" alt="igihe logo" fill className="object-contain" />
                    </div>

                    <div className="w-32 h-16 relative">
                        <Image src="/viamo.png" alt="viamo logo" fill className="object-contain" />
                    </div>
                    <div className="w-32 h-16 relative">
                        <Image src="/KeplerLogo 1.png" alt="kepler logo" fill className="object-contain" />
                    </div>
                
                    <div className="w-32 h-16 relative">
                        <Image src="/SokoFund 1.png" alt="sokofund logo" fill className="object-contain" />
                    </div>
                    <div className="w-32 h-16 relative">
                        <Image src="/Laterite_Logo 1.png" alt="laterite logo" fill className="object-contain" />
                    </div>
                </div>
        </div>
    </section>
  )
}

export default InstitutionsLogos