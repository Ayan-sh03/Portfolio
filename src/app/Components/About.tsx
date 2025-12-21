"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { motion } from "framer-motion";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <pre className="text-mono-text text-sm overflow-x-auto">
{`┌─────────────────────────────────────────┐
│ TECHNICAL SKILLS                        │
├─────────────────────────────────────────┤
│ Languages:                              │
│   ├── JavaScript / TypeScript           │
│   ├── Golang                            │
│   ├── C++                               │
│   └── Python                            │
│                                         │
│ Frontend:                               │
│   ├── React.js / Next.js                │
│   ├── HTML / CSS                        │
│   └── Tailwind CSS                      │
│                                         │
│ Backend:                                │
│   ├── Node.js / Express                 │
│   ├── Go (net/http)                     │
│   └── REST APIs                         │
│                                         │
│ Databases:                              │
│   ├── PostgreSQL                        │
│   ├── MongoDB                           │
│   └── Prisma ORM                        │
└─────────────────────────────────────────┘`}
        </pre>
      </motion.div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <pre className="text-mono-text text-sm overflow-x-auto">
{`┌─────────────────────────────────────────┐
│ EDUCATION                               │
├─────────────────────────────────────────┤
│                                         │
│ B.Tech Information Technology           │
│ ─────────────────────────────           │
│ Duration: 2020 - 2024                   │
│                                         │
│ Highlights:                             │
│   • Web Development                     │
│   • Data Structures & Algorithms        │
│   • Database Management Systems         │
│   • Competitive Programming             │
│                                         │
│ Activities:                             │
│   • Coding Competitions                 │
│   • Hackathons                          │
│   • Open Source Contributions           │
│                                         │
└─────────────────────────────────────────┘`}
        </pre>
      </motion.div>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <pre className="text-mono-text text-sm overflow-x-auto">
{`┌─────────────────────────────────────────┐
│ CERTIFICATIONS                          │
├─────────────────────────────────────────┤
│                                         │
│ [2023] Google UX Design Certificate     │
│ ────────────────────────────────────    │
│ User experience design principles,      │
│ research methods, and prototyping.      │
│                                         │
│ [2022] AICTE AWS Virtual Internship     │
│ ────────────────────────────────────    │
│ AWS cloud infrastructure, serverless    │
│ architecture, and cloud deployment.     │
│                                         │
└─────────────────────────────────────────┘`}
        </pre>
      </motion.div>
    ),
  },
];

const About = () => {
  const [tab, setTabs] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTabs(id);
    });
  };

  return (
    <section id="about" className="mono-section">
      <h2>
        <span className="text-accent">#</span> About Me
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="border-2 border-mono-text p-4 bg-mono-bg-alt">
            <div className="text-mono-text-alt text-sm mb-4">
              {"/* about-image.png */"}
            </div>
            <div className="relative aspect-square overflow-hidden border-2 border-mono-text">
              <Image
                src={"/about-image.png"}
                fill
                alt={"About Image"}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-4 pt-4 border-t-2 border-mono-text">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="text-mono-text-alt py-1 border-0 w-1/2">Experience:</td>
                    <td className="text-accent py-1 border-0">3+ Years</td>
                  </tr>
                  <tr>
                    <td className="text-mono-text-alt py-1 border-0">Projects:</td>
                    <td className="text-mono-text py-1 border-0">20+</td>
                  </tr>
                  <tr>
                    <td className="text-mono-text-alt py-1 border-0">Problems:</td>
                    <td className="text-mono-text py-1 border-0">500+ Solved</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="border-2 border-mono-text p-4 bg-mono-bg-alt mb-6">
            <div className="text-mono-text-alt text-sm mb-2">
              {"// description.txt"}
            </div>
            <p className="text-mono-text leading-relaxed">
              I&apos;m a passionate software developer driven by a constant
              hunger for learning and innovation. With a knack for crafting
              elegant solutions, I thrive on tackling challenges head-on and
              exceeding expectations with every project. Let&apos;s collaborate
              and create something extraordinary together.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border-2 border-mono-text p-4 text-center">
              <div className="text-2xl font-bold text-accent">20+</div>
              <div className="text-mono-text-alt text-sm uppercase">Projects</div>
            </div>
            <div className="border-2 border-mono-text p-4 text-center">
              <div className="text-2xl font-bold text-accent-alt">500+</div>
              <div className="text-mono-text-alt text-sm uppercase">Problems</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-4">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              Certs
            </TabButton>
          </div>

          {/* Tab Content */}
          <div className="border-2 border-mono-text p-4 bg-mono-bg-alt min-h-[300px] overflow-x-auto">
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
