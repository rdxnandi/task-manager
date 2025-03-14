import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
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
            <li className="mb-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-lg px-4 py-2 rounded-md ${
                    isActive ? "bg-amber-100" : ""
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `text-lg px-4 py-2 rounded-md ${
                    isActive ? "bg-amber-100" : ""
                  }`
                }
              >
                Task
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          onClick={() => setIsSettingOpen(true)}
          className="text-lg tracking-wide cursor-pointer text-left hover:bg-amber-100 focus:bg-amber-100 w-fit py-2 px-4 rounded-md"
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
