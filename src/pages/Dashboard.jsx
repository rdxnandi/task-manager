import React, { useState } from "react";
import Layout from "../components/Layout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import NotificationSnackbar from "../components/NotificationSnackbar";
import { Clock9, CircleCheck, ClipboardList, ChartPie } from "lucide-react";

function Dashboard({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const [date, setDate] = useState(dayjs());

  const taskStatusData = [
    { name: "Completed", value: completedTasks, color: "#2ECC71" },
    { name: "Pending", value: pendingTasks, color: "#F39C12" },
  ];

  return (
    <Layout>
      {/* Dashboard Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 shadow-md rounded-2xl bg-white flex items-center gap-4">
          <ClipboardList size={38} strokeWidth={1.75} />
          <div>
            <h3 className="text-gray-600 font-bold text-lg">{tasks.length}</h3>
            <p className="font-semibold">Total Tasks</p>
          </div>
        </div>
        <div className="p-4 bg-white shadow-md rounded-2xl flex items-center gap-4">
          <CircleCheck size={38} strokeWidth={1.75} />
          <div>
            <h3 className="text-gray-600 font-bold text-lg">
              {completedTasks}
            </h3>
            <p className="font-semibold">Completed Tasks</p>
          </div>
        </div>
        <div className="p-4 bg-white shadow-md rounded-2xl flex items-center gap-4">
          <Clock9 size={38} strokeWidth={1.75} />
          <div>
            <h3 className="text-gray-600 font-bold text-lg">{pendingTasks}</h3>
            <p className="font-semibold">Pending Tasks</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full flex-col lg:flex-row">
        {/* Statistic */}
        <div className="mt-6 p-4 bg-white shadow-md lg:w-1/2 w-full rounded-2xl">
          <div className="flex gap-3 items-center">
            <ChartPie size={13} />
            <h3 className="text-lg font-semibold">Task Statistic</h3>
          </div>
          <div className="mt-4 h-64">
            <PieChart width={250} height={250}>
              <Pie
                data={taskStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
              >
                {taskStatusData.map((entry, index) => {
                  <Cell key={`cell-${index}`} fill={entry.color} />;
                })}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <ul className="mt-2 text-sm">
            {taskStatusData.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span className="font-bold" style={{ color: item.color }}>
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Calendar Integration using MUI */}
        <div className="mt-6 p-4 bg-white shadow-md rounded-2xl lg:w-[30%] w-full">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={date}
              onChange={(newDate) => setDate(newDate)}
              sx={{
                "& .Mui-selected": {
                  backgroundColor: "#f59e0b !important",
                  color: "white !important",
                  border: "2px solid #996633",
                },
                "& .Mui-selected:hover": {
                  backgroundColor: "#d97706 !important",
                },
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="lg:w-[40%] w-full">
        {/* Recent Activities */}
        <div className="mt-6 p-4 bg-white shadow-md rounded-2xl">
          <h3 className="text-lg font-bold">Recent Activities</h3>
          <ul className="mt-2 text-gray-600">
            <li>Task "Design Homepage" completed</li>
            <li>Task "Fix Login Bug" updated</li>
            <li>Task "Write Documentation" added</li>
          </ul>
        </div>

        {/* Upcoming Deadlines */}
        <div className="mt-6 p-4 bg-white shadow-md rounded-2xl">
          <h3 className="text-lg font-bold">Upcoming Deadlines</h3>
          <ul className="mt-2 text-gray-600">
            <li>Task "Deploy Project" - Due in 2 days</li>
            <li>Task "Client Presentation" - Due in 5 days</li>
          </ul>
        </div>
      </div>
      <div>
        {tasks.map((task) => (
          <NotificationSnackbar key={task.id} task={task} />
        ))}
      </div>
    </Layout>
  );
}

export default Dashboard;
