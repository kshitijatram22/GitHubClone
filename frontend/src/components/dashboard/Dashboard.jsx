import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import { FiSearch } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import axios from "axios";

export default function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredSuggested, setFilteredSuggested] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [loadingSuggested, setLoadingSuggested] = useState(true);

  const API = import.meta.env.VITE_PROD_BASE_URL;

  // 🔍 Search filtering
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults(repositories);
      setFilteredSuggested(suggestedRepositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredSuggestedRepos = suggestedRepositories.filter((repo) =>
        repo?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredRepo);
      setFilteredSuggested(filteredSuggestedRepos);
    }
  }, [searchQuery, repositories, suggestedRepositories]);

  // 📦 Fetch repos once
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `${API}repo/user/${userId}`
        );
        const data = await response.json();
        setRepositories(
          Array.isArray(data.repositories) ? data.repositories : []
        );
      } catch (err) {
        console.log("Error while fetching Repositories", err);
        setRepositories([]);
      } finally {
        setLoadingRepos(false);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await axios.get(`${API}/repo/all`);
        const data = response.data;
        setSuggestedRepositories(
          Array.isArray(data.repositories)
            ? data.repositories
            : Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.log("Error while fetching Suggested Repositories", err);
        setSuggestedRepositories([]);
      } finally {
        setLoadingSuggested(false);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  // 🗑️ Delete repo function
  const handleDeleteRepo = async (repoId, repoName) => {
    if (
      window.confirm(`Are you sure you want to delete "${repoName}"?`)
    ) {
      try {
        await fetch(`${API}/repo/delete/${repoId}`, {
          method: "DELETE",
        });
        // Update state after deletion
        setRepositories((prev) => prev.filter((r) => r._id !== repoId));
        setSearchResults((prev) => prev.filter((r) => r._id !== repoId));
      } catch (err) {
        console.error("Error deleting repository:", err);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-[#0d1117] min-h-screen text-gray-200 px-6 py-8">
        {/* Search Bar */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center bg-[#161b22] rounded-full px-5 py-3 w-full max-w-2xl shadow-md border border-gray-700 focus-within:border-green-500 transition">
            <FiSearch className="text-gray-400 mr-3 text-lg" />
            <input
              type="text"
              value={searchQuery}
              placeholder="Search repositories..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full outline-none text-gray-200 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Suggested Repositories */}
          <aside className="lg:col-span-1 bg-[#161b22] rounded-xl p-5 shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-5">
              Suggested Repositories
            </h3>
            {loadingSuggested ? (
              <p className="text-gray-400">Loading suggested repositories...</p>
            ) : filteredSuggested.length > 0 ? (
              filteredSuggested.map((repo) => (
                <div
                  key={repo._id}
                  className="p-4 mb-4 bg-[#0d1117] rounded-lg border border-gray-700 hover:border-blue-500 hover:shadow-md transition"
                >
                  <h4 className="font-semibold text-gray-100">{repo.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{repo.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                No suggested repositories available.
              </p>
            )}
          </aside>

          {/* Your Repositories */}
          <main className="lg:col-span-2 bg-[#161b22] rounded-xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Your Repositories</h2>
            {loadingRepos ? (
              <p className="text-gray-400">Loading your repositories...</p>
            ) : searchResults.length > 0 ? (
              searchResults.map((repo) => (
                <div
                  key={repo._id}
                  className="p-5 mb-5 bg-[#0d1117] rounded-lg border border-gray-700 hover:border-green-500 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">{repo.name}</h4>
                    <div className="flex items-center gap-3">
                      <button className="p-2 rounded-lg hover:bg-gray-800 transition">
                        <FaRegStar className="text-yellow-400 cursor-pointer" />
                      </button>
                      {/* Delete button */}
                      <button
                        onClick={() => handleDeleteRepo(repo._id, repo.name)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow-md transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{repo.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">You have no repositories yet.</p>
            )}
          </main>

          {/* Events */}
          <aside className="lg:col-span-1 bg-[#161b22] rounded-xl p-5 shadow-lg border border-gray-700">
            <h2 className="text-lg font-semibold mb-5">Upcoming Events</h2>
            <ul className="space-y-3">
              {["Tech Crunch", "Tech Hunt", "Code Crush"].map((event, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-[#0d1117] rounded-lg border border-gray-700 hover:border-purple-500 hover:shadow-md transition text-gray-300"
                >
                  {event}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
