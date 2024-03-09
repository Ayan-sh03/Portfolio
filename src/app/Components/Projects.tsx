"use client"
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import {Variants, motion , useInView} from 'framer-motion';
const projectsData = [
  {
    id: 1,
    title: "Trivia Genious",
    description: "AI Generated Quiz Web app ",
    imageUrl: "/projects/trivia.png",
    gitUrl: "https://github.com/ayansh-03",
    prevUrl:"https://triviagenius.netlify.app/"

  },
  {
    id: 2,
    title: "IntelliPrep",
    description: "Exam Preparations Web app ",
    imageUrl: "/projects/intelliprep.png",
    gitUrl: "https://github.com/ayansh-03",
    prevUrl:"https://intelliprep.netlify.app/"


  },
  {
    id: 3,
    title: "BotaniKnow",
    description: "Plant Identification Progressive Web app ",
    imageUrl: "/projects/botani.png",
    gitUrl: "https://github.com/ayansh-03",
    prevUrl:"https://github.com/ayansh-03"


  },
];
const cardVariants : Variants   = {
  initial :{y:50 , opacity :0 },
  animate : {y:0 , opacity:1}
};
const Projects = () => {

  const ref = useRef(null);
  const isInView = useInView(ref , {once : true})
  return (
    <section ref={ref} id="projects">
      <h2>My Projects</h2>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {projectsData.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              gitUrl={project.gitUrl}
              prevUrl={project.prevUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
