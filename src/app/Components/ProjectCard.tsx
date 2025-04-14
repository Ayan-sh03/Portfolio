import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { motion } from "framer-motion";

const ProjectCard = ({
  imageUrl,
  title,
  description,
  gitUrl,
  prevUrl,
  tags = [],
}: {
  imageUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  prevUrl: string;
  tags?: string[];
}) => {
  return (
    <div className="bg-[#121212] rounded-xl overflow-hidden h-full flex flex-col hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-500 border border-[#232323] hover:border-primary-500/50">
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative h-52 lg:h-64 rounded-t-xl group"
      >
        {/* Overlay with buttons */}
        <div className="overlay items-center justify-center absolute top-0 left-0 h-full w-full bg-[#121212] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
          <Link
            href={gitUrl}
            target="_blank"
            className="hover:text-white h-12 w-12 border-2 relative rounded-full border-slate-400 hover:border-primary-400 hover:bg-primary-500/20 group/link mr-4 transition-all duration-300"
          >
            <CodeBracketIcon className="h-6 w-6 text-slate-400 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white" />
          </Link>
          <Link
            href={prevUrl}
            target="_blank"
            className="hover:text-white h-12 w-12 border-2 relative rounded-full border-slate-400 hover:border-secondary-400 hover:bg-secondary-500/20 group/link transition-all duration-300"
          >
            <EyeIcon className="h-6 w-6 text-slate-400 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white" />
          </Link>
        </div>

        {/* Featured badge - optional, can be used for highlighted projects */}
        {title === "IntelliPrep" && (
          <span className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Featured</span>
        )}
      </div>

      <div className="flex-1 flex flex-col p-6">
        <div className="flex-1">
          <h5 className="text-xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors duration-300">{title}</h5>
          <p className="text-[#ADB7BE] mb-4 text-sm">{description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-[#232323] text-[#ADB7BE] px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card footer with links */}
      <div className="flex justify-between items-center px-6 py-4 border-t border-[#232323]">
        <Link
          href={gitUrl}
          target="_blank"
          className="text-sm text-[#ADB7BE] hover:text-white flex items-center transition-colors"
        >
          <CodeBracketIcon className="h-4 w-4 mr-1" />
          <span>Source Code</span>
        </Link>
        <Link
          href={prevUrl}
          target="_blank"
          className="text-sm bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent hover:text-white flex items-center transition-colors"
        >
          <span>Live Demo</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;