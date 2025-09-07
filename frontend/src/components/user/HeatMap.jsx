import React, { useState, useEffect } from "react";
import HeatMap from "@uiw/react-heat-map";

const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate < end) {
    const count = Math.floor(Math.random() * 50);
    data.push({
      date: currentDate.toISOString().split("T")[0],
      count: count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

// GitHub-style contribution colors
const panelColors = {
  0: "#161b22",
  5: "#0e4429",
  10: "#006d32",
  20: "#26a641",
  30: "#39d353",
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const startDate = "2001-01-01";
    const endDate = "2001-01-31";
    setActivityData(generateActivityData(startDate, endDate));
  }, []);

  return (
    <div className="bg-[#1c1f24] p-5 rounded-xl shadow-md">
      <h4 className="text-lg font-semibold text-gray-200 mb-4 text-left">
        Recent Contributions
      </h4>
      <HeatMap
        className="mx-auto"
        style={{ maxWidth: "100%", height: "180px", color: "white" }}
        value={activityData}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date("2001-01-01")}
        rectSize={14}
        space={3}
        rectProps={{
          rx: 3,
        }}
        panelColors={panelColors}
      />
    </div>
  );
};

export default HeatMapProfile;
