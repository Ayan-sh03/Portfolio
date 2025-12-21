import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-mono-text mt-8 pt-8 pb-4">
      <div className="text-center">
        <pre className="text-mono-text-alt text-xs mb-4 overflow-x-auto">
{`┌─────────────────────────────────────────────────────────┐
│                                                         │
│   Built with Next.js, TypeScript & Monospace Aesthetics │
│                                                         │
│   "Code is poetry written in logic"                     │
│                                                         │
└─────────────────────────────────────────────────────────┘`}
        </pre>
        
        <div className="text-mono-text-alt text-sm mb-4">
          <span className="text-accent">$</span> echo &quot;Made with ♥ by Ayan Sheikh&quot;
        </div>
        
        <div className="text-mono-text-alt text-xs">
          © {currentYear} All Rights Reserved | 
          <a 
            href="https://github.com/Ayan-sh03" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent hover:bg-accent hover:text-mono-bg ml-1 no-underline"
          >
            [Source Code]
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
