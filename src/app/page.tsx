
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Projects from "./Components/Projects";
import EmailSection from "./Components/EmailSection";
import Footer from "./Components/Footer";
import { Metadata } from "next";

export const metadata  :Metadata = {
  title:"Portfolio",
  description:"Made by Ayan Sheikh"
}

export default function Home() {
  return (
    <main className="flex min-h-screen container mx-auto flex-col bg-[#121212] px-12 py-4 ">
      <Navbar />
      <div className="container mt-24 mx-auto   py-5">
        <Hero />
        <About/>
        <Projects/>
        <EmailSection/>
        <Footer/>
      </div>
    </main>
  );
}
