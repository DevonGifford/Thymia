import React from "react";
import Link from "next/link";
import {
  BrainCog,
  ExternalLink,
  Github,
  Linkedin,
  UserSquare,
} from "lucide-react";

export default function NavBar() {
  return (
    <nav className="absolute w-full flex justify-between items-center bg-thymia-purple bg-opacity-80 text-white h-14 p-5">
      <div className="flex gap-14">
        <Link
          href="/"
          className="flex flex-row gap-2 transition ease-in-out duration-150 hover:scale-110"
        >
          <BrainCog size={32} className=" translate-y-1" />
          <p className="text-3xl font-bold">2-Back</p>
        </Link>

        <Link
          target="_blank"
          href="https://github.com/DevonGifford/nGame--TechnicalAssignment"
          className="flex justify-end items-center"
        >
          <div className="hidden sm:flex flex-row gap-2 transition ease-in-out duration-150 hover:scale-110">
            <span className="block text-sm">Project Source Code</span>
            <ExternalLink size={20} />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-1 mr-2">
        <p className="text-center text-xs">by Devon Gifford</p>
        <div className="flex flex-row gap-5">
          <Link
            target="_blank"
            href="https://devongifford.vercel.app/"
            className="transition ease-in-out duration-150 hover:scale-110"
          >
            <UserSquare size={20} />
          </Link>

          <Link
            target="_blank"
            href="https://www.linkedin.com/in/dbgifford/"
            className="transition ease-in-out duration-150 hover:scale-110"
          >
            <Linkedin size={20} />
          </Link>

          <Link
            target="_blank"
            href="https://github.com/DevonGifford"
            className="transition ease-in-out duration-150 hover:scale-110"
          >
            <Github size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
