import Link from "next/link";
import Image from "next/image";

const ProjectCard = ({
  imageUrl,
  title,
  description,
  gitUrl,
  prevUrl,
  tags = [],
  index = 0,
}: {
  imageUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  prevUrl: string;
  tags?: string[];
  index?: number;
}) => {
  return (
    <div className="border-2 border-mono-text bg-mono-bg-alt hover:border-accent transition-colors duration-300 h-full flex flex-col">
      {/* Header */}
      <div className="border-b-2 border-mono-text p-2 flex items-center gap-2">
        <span className="text-accent-alt">●</span>
        <span className="text-accent-yellow">●</span>
        <span className="text-accent">●</span>
        <span className="text-mono-text-alt text-sm ml-2 truncate">
          project_{String(index).padStart(2, "0")}.md
        </span>
      </div>

      {/* Image */}
      <div className="relative h-40 border-b-2 border-mono-text overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-mono-text-alt text-xs mb-2">{"// " + title.toLowerCase().replace(/\s+/g, "_")}</div>
        
        <h3 className="text-mono-text font-bold text-lg mb-2 uppercase tracking-wide">
          {title}
        </h3>
        
        <p className="text-mono-text-alt text-sm mb-4 flex-1">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs border border-mono-text px-2 py-0.5 text-mono-text-alt uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 pt-4 border-t-2 border-mono-text">
          <Link
            href={gitUrl}
            target="_blank"
            className="text-sm text-mono-text-alt hover:text-accent hover:bg-transparent no-underline transition-colors"
          >
            [Source]
          </Link>
          <Link
            href={prevUrl}
            target="_blank"
            className="text-sm text-mono-text-alt hover:text-accent hover:bg-transparent no-underline transition-colors"
          >
            [Live Demo]
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
