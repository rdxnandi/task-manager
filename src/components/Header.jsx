import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import Settings from "../pages/Settings";

function Header() {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <>
      <header className="bg-white p-10 mr-5 rounded-2xl w-[300px] flex flex-col justify-between shadow-md">
        <nav className="flex flex-col gap-5">
          <div className="text-2xl font-bold tracking-wider text-amber-400 cursor-default border-b border-gray-300 mb-7 pb-5">
            <Link to="/">To-do</Link>
          </div>

          <ul>
            <li className="text-lg mb-4">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="text-lg">
              <Link to="/tasks">Task</Link>
            </li>
          </ul>
        </nav>

        <button
          onClick={() => setIsSettingOpen(true)}
          className="text-lg tracking-wide cursor-pointer text-left"
        >
          Settings
        </button>
      </header>

      <Settings
        isOpen={isSettingOpen}
        onClose={() => setIsSettingOpen(false)}
      />
    </>
  );
}

export default Header;
