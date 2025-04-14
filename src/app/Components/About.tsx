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
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {[
          "Node.js", "React.js", "Golang", "PostgreSQL", "Prisma",
          "JavaScript", "C++", "MongoDB"
        ].map((skill, index) => (
          <div
            key={index}
            className="bg-[#232323] rounded-lg p-3 flex items-center justify-center shadow-md hover:bg-gradient-to-br hover:from-primary-500/20 hover:to-secondary-500/20 transition-all duration-300"
          >
            <span className="text-white font-medium">{skill}</span>
          </div>
        ))}
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
        <div className="bg-[#232323] rounded-lg p-5 shadow-md border-l-4 border-primary-500">
          <h3 className="text-xl font-bold text-white mb-2">B.Tech Information Technology</h3>
          <div className="flex justify-between text-[#ADB7BE] mb-2">
            <span>University Name</span>
            <span className="text-white">2020 - 2024</span>
          </div>
          <p className="text-[#ADB7BE]">
            Specialized in modern web development, data structures, and algorithms.
            Participated in various coding competitions and hackathons.
          </p>
        </div>
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
        className="space-y-4"
      >
        <div className="bg-[#232323] rounded-lg p-4 hover:bg-[#2a2a2a] transition-colors duration-300 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Google UX Design Certificate</h3>
            <span className="text-xs text-primary-400 bg-primary-400/10 px-2 py-1 rounded-full">2023</span>
          </div>
          <p className="text-[#ADB7BE] mt-2">Comprehensive training in user experience design principles, research methods, and prototyping techniques.</p>
        </div>

        <div className="bg-[#232323] rounded-lg p-4 hover:bg-[#2a2a2a] transition-colors duration-300 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">AICTE AWS Virtual Internship Certificate</h3>
            <span className="text-xs text-secondary-400 bg-secondary-400/10 px-2 py-1 rounded-full">2022</span>
          </div>
          <p className="text-[#ADB7BE] mt-2">Hands-on experience with AWS cloud infrastructure, serverless architecture, and cloud deployment strategies.</p>
        </div>
      </motion.div>
    ),
  },
];

const About = () => {
  const [tab, setTabs] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTabs(id);
    });
  };

  return (
    <section id="about" className="py-8">
      <div className="text-white">
        <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary-500/20 filter blur-md"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-secondary-500/20 filter blur-md"></div>

              {/* Image container with gradient border */}
              <div className="rounded-2xl p-1 bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg">
                <div className="bg-[#181818] p-2 rounded-xl overflow-hidden">
                  <Image
                    src={"/about-image.png"}
                    width={500}
                    height={500}
                    alt={"About Image"}
                    className="rounded-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Experience banner */}
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-[#181818] px-4 py-2 rounded-full border border-gray-700 shadow-xl">
                <p className="text-center text-sm font-medium">
                  <span className="text-primary-400 font-bold">3+ Years</span> of Development Experience
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-10 md:mt-0 text-left flex flex-col h-full"
          >
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-1 w-20 mb-6 rounded-full"></div>
            <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
            <p className="text-base lg:text-lg text-[#ADB7BE] mb-6">
              I&apos;m a passionate software developer driven by a constant
              hunger for learning and innovation. With a knack for crafting
              elegant solutions, I thrive on tackling challenges head-on and
              exceeding expectations with every project. Let&apos;s collaborate and
              create something extraordinary together.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#232323] p-3 rounded-lg">
                <h3 className="text-2xl font-bold text-primary-400">20+</h3>
                <p className="text-[#ADB7BE] text-sm">Projects Completed</p>
              </div>
              <div className="bg-[#232323] p-3 rounded-lg">
                <h3 className="text-2xl font-bold text-secondary-400">500+</h3>
                <p className="text-[#ADB7BE] text-sm">Coding Problems Solved</p>
              </div>
            </div>

            <div className="flex flex-row mt-4 bg-[#181818] p-2 rounded-lg">
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
                Certifications
              </TabButton>
            </div>
            <div className="mt-6 bg-[#181818] p-4 rounded-lg min-h-[220px]">
              {TAB_DATA.find((t) => t.id === tab)?.content}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;