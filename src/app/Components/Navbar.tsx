"use client";

import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-mono-bg border-b-2 border-mono-text backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center justify-between py-2 px-2ch">
        <Link
          href={"/"}
          className="text-mono-text font-bold text-lg tracking-wider hover:text-accent hover:bg-transparent no-underline"
        >
          [AYAN]
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <div className="menu hidden md:block" id="navbar">
            <ul className="flex gap-4">
              {navLinks.map((link, index) => (
                <li key={index} className="list-none">
                  <NavLink href={link.path} title={link.title} />
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <div className="mobile-menu block md:hidden">
            {!navbarOpen ? (
              <button
                onClick={() => setNavbarOpen(true)}
                className="flex items-center px-2 py-1 border-2 border-mono-text text-mono-text hover:bg-accent hover:text-mono-bg hover:border-accent"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => setNavbarOpen(false)}
                className="flex items-center px-2 py-1 border-2 border-mono-text text-mono-text hover:bg-accent hover:text-mono-bg hover:border-accent"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
