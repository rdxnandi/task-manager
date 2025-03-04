import React from "react";

function RecentActivities({ activities }) {
  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-2xl">
      <h3 className="text-lg font-bold">Recent Activities</h3>
      <ul className="mt-2 text-gray-600">
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivities;
