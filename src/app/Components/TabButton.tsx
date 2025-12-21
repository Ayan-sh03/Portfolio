import React from "react";

const TabButton = ({
  active,
  selectTab,
  children,
}: {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
}) => {
  const buttonClasses = active
    ? "text-mono-bg bg-accent border-accent"
    : "text-mono-text-alt bg-transparent border-mono-text hover:bg-mono-bg-alt hover:text-mono-text";

  return (
    <button
      className={`px-3 py-1 mr-2 border-2 uppercase text-sm tracking-wide transition-colors ${buttonClasses}`}
      onClick={selectTab}
    >
      {children}
    </button>
  );
};

export default TabButton;
