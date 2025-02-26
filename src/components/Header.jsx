import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import Settings from "../pages/Settings";

function Header() {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between bg-yellow-500 px-5">
        <div className="text-2xl font-bold tracking-wider text-white cursor-default">
          <Link to="/">Tasks</Link>
        </div>

        <nav className="p-4 flex items-center gap-10">
          <ul className="flex gap-7 text-white">
            <li className="tracking-wider text-lg hover:bg-yellow-600 hover:rounded-md p-2">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="tracking-wider text-lg hover:bg-yellow-600 hover:rounded-md p-2">
              <Link to="/tasks">Tasks</Link>
            </li>
          </ul>
          <button
            onClick={() => setIsSettingOpen(true)}
            className="text-lg tracking-wider hover:bg-yellow-600 hover:rounded-md p-2 cursor-pointer text-white"
          >
            Settings
          </button>
        </nav>
      </header>

      <Settings
        isOpen={isSettingOpen}
        onClose={() => setIsSettingOpen(false)}
      />
    </>
  );
}

export default Header;
