"use client";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { Variants, motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 4,
    title: "Anoq",
    description: "No BS Feedback form creator",
    imageUrl: "/projects/anoq.png",
    gitUrl: "https://github.com/Ayan-sh03/anoq",
    prevUrl: "https://anoq.vercel.app",
    tags: ["Next.js", "TypeScript", "Prisma"],
  },
  {
    id: 5,
    title: "Zapspell",
    description: "Learning Spelling made easier",
    imageUrl: "/projects/zapspell.png",
    gitUrl: "https://github.com/Ayan-sh03/zapspell",
    prevUrl: "https://zapspell.ayansh.xyz",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 1,
    title: "Trivia Genius",
    description: "AI Generated Quiz Web app",
    imageUrl: "/projects/trivia.png",
    gitUrl: "https://github.com/Ayan-sh03/Trivia-genious-backend",
    prevUrl: "https://triviagenius.netlify.app/",
    tags: ["React", "AI", "REST API"],
  },
  {
    id: 2,
    title: "IntelliPrep",
    description: "Exam Preparations Web app",
    imageUrl: "/projects/intelliprep.png",
    gitUrl: "https://github.com/Ayan-sh03/IntelliPrep",
    prevUrl: "https://intelliprep.netlify.app/",
    tags: ["React", "Node.js", "Education"],
  },
  {
    id: 3,
    title: "BotaniKnow",
    description: "Plant Identification PWA",
    imageUrl: "/projects/botani.png",
    gitUrl: "https://github.com/Manas8803/Botani-Know",
    prevUrl: "https://github.com/Manas8803/Botani-Know",
    tags: ["PWA", "ML", "React"],
  },
];

const cardVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} id="projects" className="mono-section">
      <h2>
        <span className="text-accent">#</span> My Projects
      </h2>

      <div className="mt-4 mb-8 text-mono-text-alt">
        <pre className="text-sm">
{`┌─────────────────────────────────────────────────────────────┐
│ ls -la ~/projects                                           │
│ total ${projectsData.length} projects                                            │
└─────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
        {projectsData.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="list-none"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              gitUrl={project.gitUrl}
              prevUrl={project.prevUrl}
              tags={project.tags}
              index={index}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
