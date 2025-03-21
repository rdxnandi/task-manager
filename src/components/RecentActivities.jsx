import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

function RecentActivities() {
  const { recentActivities } = useTasks();
  const [visibleCount, setVisibleCount] = useState(5);

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-2xl">
      <h3 className="text-lg font-bold">Recent Activities</h3>
      <ul className="mt-2 text-gray-600">
        {recentActivities.slice(0, visibleCount).map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
      {visibleCount < recentActivities.length && (
        <button onClick={handleSeeMore}>See More</button>
      )}
    </div>
  );
}

export default RecentActivities;
