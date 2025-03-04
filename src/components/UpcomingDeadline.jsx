import React from "react";

function UpcomingDeadline({ activities }) {
  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-2xl">
      <h1 className="text-lg font-bold">Upcoming Deadlines</h1>
      <ul className="mt-2 text-gray-600">
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingDeadline;
