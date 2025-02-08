import { Footer } from "@/components/footer";
import Nav from "@/components/nav";

export default function PageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <>
        <Nav/>
        <div className="max-w-full">
        {children}
        </div>
        <Footer/>
        </>
    )
  }