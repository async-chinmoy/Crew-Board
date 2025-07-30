import Navbar from "@/components/Navbar";

export default function ScreensLayout({children}) {
  return (
    <section>
        <Navbar/>
 
      {children}
    </section>
  )
}