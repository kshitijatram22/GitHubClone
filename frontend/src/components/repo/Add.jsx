import React, { useState } from "react";
import axios from "axios";

export default function CreateRepository() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true); // true = public, false = private
  const [loading, setLoading] = useState(false);

  const handleCreateRepo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please log in first.");
        return;
      }

      const response = await axios.post("http://localhost:3000/repo/create", {
        name,
        description,
        visibility,
        owner: userId,
      });

      alert("Repository created successfully!");
      console.log("Created repo:", response.data);

      // Reset form
      setName("");
      setDescription("");
      setVisibility(true);

      // Redirect to dashboard or repos list if needed
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error creating repository", err);
      alert(
        "Failed to create repository: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0d1117] min-h-screen text-gray-200 px-6 py-10">
      <div className="bg-[#161b22] p-8 rounded-2xl shadow-xl w-full border border-gray-700">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Create Repository
        </h2>

        <form className="space-y-6 w-full" onSubmit={handleCreateRepo}>
          {/* Repository Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Repository Name *
            </label>
            <input
              type="text"
              placeholder="Enter repository name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium mb-2">Visibility</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value === "true")}
              className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            {loading ? "Creating..." : "Create Repository"}
          </button>
        </form>
      </div>
    </div>
  );
}
