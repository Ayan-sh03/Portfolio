"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
        <ul className="list-disc pl-2">
        <li>Node.js</li>
        <li>React.js</li>
        <li>Golang</li>
        <li>PostgreSQL</li>
        <li>Prisma</li>
        <li>JavaScript</li>
        <li>C++</li>
        <li>MongoDB</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
        <ul className="list-disc pl-2">
        <li>B.Tech Information Technology</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
        <ul className="list-disc pl-2">
        <li>Google UX Design Certificate</li>
        <li>AICTE AWS Virtual Internship Certificate </li>
      </ul>
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
    <section id="about">
      <div className="text-white ">
        <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
          <Image
            src={"/about-image.png"}
            width={500}
            height={500}
            alt={"About Image"}
          />
          <div className="mt-4 md:mt-0 text-left flex flex-col h-full ">
            <h2 className="text-4xl font-bold text-white mb-4 ">About Me</h2>
            <p className="text-base lg:text-lg  ">
            I&apos;m a passionate software developer driven by a constant
            hunger for learning and innovation. With a knack for crafting
            elegant solutions, I thrive on tackling challenges head-on and
            exceeding expectations with every project. Let&apos;s collaborate and
            create something extraordinary together.
            </p>
            <div className="flex flex-row mt-8">
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
          <div className="mt-7">
           {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
