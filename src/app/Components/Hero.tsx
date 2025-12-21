"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="py-8 mono-section">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="col-span-1 md:col-span-7"
        >
          <div className="mb-4">
            <span className="text-mono-text-alt text-sm">
              {"// "}welcome to my portfolio
            </span>
          </div>

          <h1 className="text-mono-text mb-4">
            <span className="text-accent">$</span> Hello, I&apos;m{" "}
            <span className="text-accent">Ayan</span>
          </h1>

          <div className="border-2 border-mono-text p-4 mb-6 bg-mono-bg-alt">
            <div className="flex items-center gap-2 mb-2 text-mono-text-alt text-sm">
              <span className="text-accent-alt">●</span>
              <span className="text-accent-yellow">●</span>
              <span className="text-accent">●</span>
              <span className="ml-2">~/portfolio</span>
            </div>
            <div className="text-mono-text">
              <span className="text-accent">→</span>{" "}
              <span className="text-accent-cyan">whoami</span>
              <br />
              <TypeAnimation
                sequence={[
                  "Web Developer",
                  2000,
                  "Competitive Programmer",
                  2000,
                  "Tech Enthusiast",
                  2000,
                  "Full Stack Developer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-mono-text"
              />
              <span className="animate-pulse text-accent">█</span>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-mono-text-alt mb-6 max-w-lg"
          >
            Crafting digital experiences that combine elegant design with
            powerful functionality. I build things for the web with clean,
            efficient code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/#contact"
              className="inline-block px-6 py-2 border-2 border-accent text-accent hover:bg-accent hover:text-mono-bg uppercase tracking-wide text-sm transition-colors no-underline"
            >
              [Hire Me]
            </Link>
            <Link
              href={"/Ayan_s_Resume.pdf"}
              className="inline-block px-6 py-2 border-2 border-mono-text text-mono-text hover:bg-mono-text hover:text-mono-bg uppercase tracking-wide text-sm transition-colors no-underline"
            >
              [Download CV]
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 flex gap-4"
          >
            <a
              href="https://github.com/Ayan-sh03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono-text-alt hover:text-accent transition-colors no-underline"
              title="GitHub"
            >
              [GitHub]
            </a>
            <a
              href="https://www.linkedin.com/in/ayan-sh003/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono-text-alt hover:text-accent transition-colors no-underline"
              title="LinkedIn"
            >
              [LinkedIn]
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono-text-alt hover:text-accent transition-colors no-underline"
              title="Twitter"
            >
              [Twitter]
            </a>
          </motion.div>
        </motion.div>

        {/* Image/ASCII Art Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="col-span-1 md:col-span-5 flex justify-center items-center"
        >
          <div className="border-2 border-mono-text p-4 bg-mono-bg-alt w-full max-w-[300px]">
            <div className="text-center mb-4 text-mono-text-alt text-sm">
              {"/* profile.png */"}
            </div>
            <div className="relative aspect-square overflow-hidden border-2 border-mono-text">
              <Image
                src="/hero.png"
                alt="Ayan profile image"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-4 text-center">
              <pre className="text-accent text-xs leading-tight">
{`  _____
 /     \\
|  O O  |
|   ^   |
|  \\_/  |
 \\_____/`}
              </pre>
            </div>
            <div className="mt-4 border-t-2 border-mono-text pt-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="text-mono-text-alt py-1 border-0">Name:</td>
                    <td className="text-mono-text py-1 border-0">Ayan Sheikh</td>
                  </tr>
                  <tr>
                    <td className="text-mono-text-alt py-1 border-0">Role:</td>
                    <td className="text-accent py-1 border-0">Developer</td>
                  </tr>
                  <tr>
                    <td className="text-mono-text-alt py-1 border-0">Status:</td>
                    <td className="text-accent py-1 border-0">● Available</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
