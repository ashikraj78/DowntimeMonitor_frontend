import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.png";
export default function Header() {
  return (
    <header className="absolute left-0 right-0 top-0 w-full">
      <nav className="bg-green-200">
        <div className="flex justify-between   items-center pt-4 pb-4 pl-10 pr-10">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="downtimer monitor" className="w-10" />
            <p className="font-black text-2xl pl-2  font-mono text-gray-700">
              Downtime Monitoring
            </p>
          </Link>
          <Link
            to="/dashboard"
            className="border-solid border-2 border-gray-500 rounded-md hover:bg-green-400"
          >
            <h2 className="font-black text-2xl text-gray-700 px-3 py-1">
              Dashboard
            </h2>
          </Link>
        </div>
      </nav>
    </header>
  );
}
