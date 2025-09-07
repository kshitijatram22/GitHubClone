import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center bg-[#24292f] px-6 py-3 shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2 text-white font-bold text-lg">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="Github Logo"
          className="w-8"
        />
        <h3>GitHub</h3>
      </Link>

      {/* Links */}
      <div className="flex space-x-6">
        <Link
          to="/create"
          className="text-white hover:text-blue-400 transition-colors"
        >
          Create a repository
        </Link>
        <Link
          to="/profile"
          className="text-white hover:text-blue-400 transition-colors"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
