import React, { useState } from "react";
import Layout from "../components/Layout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const [date, setDate] = useState(dayjs());

  const taskAnalyticData = tasks.map((task, index) => ({
    name: `Task ${index + 1}`,
    task: index + 1,
  }));

  const taskStatusData = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
  ];

  return (
    <Layout>
      {/* Dashboard Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="lg:text-lg text-xm font-bold">Total Tasks</h3>
          <p className="text-gray-600">{tasks.length}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="lg:text-lg text-sm font-bold">Completed Tasks</h3>
          <p className="text-gray-600">{completedTasks}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="lg:text-lg font-bold text-sm">Pending Tasks</h3>
          <p className="text-gray-600">{pendingTasks}</p>
        </div>
      </div>

      <div className="w-full flex lg:flex-row gap-5 flex-col">
        {/* Advanced Analytics */}
        <div className="mt-6 p-4 bg-white shadow-md lg:w-1/2 w-full rounded-lg">
          <h3 className="text-lg font-bold">Task Completion Analytics</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={taskAnalyticData}>
                <XAxis dataKey="name" stroke="#333" />
                <Tooltip />
                <Line dataKey="tasks" fill="#8884d8" barSize={30} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white shadow-md lg:w-1/2 w-full rounded-lg">
          <h2 className="text-lg font-bold">Completed and Pending</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={taskStatusData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Line dataKey="value" fill="#333" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex gap-4 w-full flex-col lg:flex-row">
        {/* Calendar Integration using MUI */}
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg lg:w-[30%] w-full">
          <h3 className="text-lg font-bold">Calendar</h3>
          <div className="mt-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </LocalizationProvider>
          </div>
          <p className="mt-2 text-gray-600">
            Selected Date: {date.format("MMMM D, YYYY")}
          </p>
        </div>

        <div className="lg:w-[40%] w-full">
          {/* Recent Activities */}
          <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-bold">Recent Activities</h3>
            <ul className="mt-2 text-gray-600">
              <li>Task "Design Homepage" completed</li>
              <li>Task "Fix Login Bug" updated</li>
              <li>Task "Write Documentation" added</li>
            </ul>
          </div>

          {/* Upcoming Deadlines */}
          <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-bold">Upcoming Deadlines</h3>
            <ul className="mt-2 text-gray-600">
              <li>Task "Deploy Project" - Due in 2 days</li>
              <li>Task "Client Presentation" - Due in 5 days</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
