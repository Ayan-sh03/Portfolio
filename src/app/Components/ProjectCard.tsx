import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const ProjectCard = ({
  imageUrl,
  title,
  description,
  gitUrl,
  prevUrl,
}: {
  imageUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  prevUrl: string;
}) => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${imageUrl})  `,
          backgroundSize: "cover",
        }}
        className="relative h-52 lg:h-72 rounded-t-xl group"
      >
        <div className="overlay  items-center justify-center  absolute top-0 left-0 h-full w-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
          <Link
            href={gitUrl}
            target="_blank"
            className="hover:text-white h-14 w-14 border-2 relative rounded-full border-slate-400 hover:border-slate-100 group/link mr-2"
          >
            <CodeBracketIcon className="h-10 w-10 text-slate-400  cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:hover:text-white" />
          </Link>
          <Link
            href={prevUrl}
            target="_blank"
            className="hover:text-white h-14 w-14 border-2 relative rounded-full border-slate-400 hover:border-slate-100 group/link "
          >
            <EyeIcon className="h-10 w-10 text-slate-400  cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:hover:text-white" />
          </Link>
        </div>
      </div>

      <div className="text-white mt-3 rounded-b-xl bg-[#181818] py-6 px-4 ">
        <h5 className="text-xl font-semibold mb-2 ">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
