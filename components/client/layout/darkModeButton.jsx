import React, { useEffect, useState } from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";


const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(false);

  const switchMode = () => {
    setDarkMode(!darkMode);

  };
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      window.document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("darkMode", "false");
      window.document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);




  return (
    <button className="relative group text-green-600" onClick={switchMode}>
      {/* switching darkmode */}
      {!darkMode ? (
        <BsFillMoonStarsFill size={20} />
      ) : (
        <BsFillSunFill size={20} />
      )}
      <span className="pointer-events-none text-sm z-index-50 absolute top-12 -right-3 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-gray-700 rounded-md px-3 text-white">
        Darkmode
      </span>
    </button>
  );
};

export default DarkModeButton;
