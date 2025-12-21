import Link from "next/link";
import React from "react";

const NavLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="block py-1 px-2 text-mono-text-alt hover:text-mono-bg hover:bg-accent uppercase tracking-wide text-sm no-underline transition-colors"
    >
      [{title}]
    </Link>
  );
};

export default NavLink;
