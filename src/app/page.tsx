import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Projects from "./Components/Projects";
import EmailSection from "./Components/EmailSection";
import Footer from "./Components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayan Sheikh | Portfolio",
  description: "Software Developer Portfolio",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mt-16">
        <Hero />
        <About />
        <Projects />
        <EmailSection />
        <Footer />
      </div>
    </main>
  );
}
