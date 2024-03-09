import React from "react";

const TabButton = ({ active, selectTab, children } : { active: boolean, selectTab: () => void, children: React.ReactNode }) => {
  const buttonClasses = active
    ? "text-white border-b border-purple-500 "
    : "text-[#ADB7BE]  ";

  return (
    <button className={buttonClasses} onClick={selectTab}>
      <p className={`mr-3 font-semibold hover:text-white ${buttonClasses}`}>{children}</p>
    </button>
  );
};

export default TabButton;
