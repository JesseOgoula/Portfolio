import Hero from "@/components/Hero";
import About from "@/components/About";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-light-100">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Partners />
        <Services />
        <Projects />
        <Gallery />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
