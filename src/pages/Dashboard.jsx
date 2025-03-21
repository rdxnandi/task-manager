import React, { useState } from "react";
import Layout from "../components/Layout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Clock9, CircleCheck, ClipboardList, ChartPie } from "lucide-react";
import NotificationSnackbar from "../components/NotificationSnackbar";
import RecentActivities from "../components/RecentActivities";
import UpcomingDeadline from "../components/UpcomingDeadline";
import { useTasks } from "../context/TaskContext";

function Dashboard() {
  const { tasks, recentActivities } = useTasks();
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const [date, setDate] = useState(dayjs());

  const taskStatusData = [
    { name: "Completed", value: completedTasks, color: "#f0b100" },
    { name: "Pending", value: pendingTasks, color: "#e17100" },
  ];

  const upcomingDeadline = [
    'Task "Deploy Project" - Due in 2 days',
    'Task "Client Presentation" - Due in 5 days',
  ];

  return (
    <Layout>
      {/* Dashboard Overview */}
      <div className="flex gap-5">
        <div className="grid grid-cols-1 gap-4 w-[30%]">
          <div className="p-2 shadow-md rounded-2xl bg-white flex items-center gap-4">
            <ClipboardList size={28} />
            <div>
              <h3 className="text-gray-600 font-bold text-lg">
                {tasks.length}
              </h3>
              <p>Total Tasks</p>
            </div>
          </div>
          <div className="p-2 shadow-md rounded-2xl bg-white flex items-center gap-4">
            <CircleCheck size={28} />
            <div>
              <h3 className="text-gray-600 font-bold text-lg">
                {completedTasks}
              </h3>
              <p>Completed Tasks</p>
            </div>
          </div>
          <div className="p-2 shadow-md rounded-2xl bg-white flex items-center gap-4">
            <Clock9 size={28} />
            <div>
              <h3 className="text-gray-600 font-bold text-lg">
                {pendingTasks}
              </h3>
              <p>Pending Tasks</p>
            </div>
          </div>
        </div>

        {/* Statistic */}
        <div className="p-4 bg-white shadow-md lg:w-1/2 w-full rounded-2xl">
          <div className="flex gap-3 items-center">
            <ChartPie size={20} />
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
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
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
      </div>

      <div className="flex gap-4 w-full flex-col lg:flex-row">
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

        <div className="flex gap-5 lg:w-[70%] w-full">
          {/* Recent Activities */}
          <RecentActivities activities={recentActivities} />

          {/* Upcoming Deadlines */}
          <UpcomingDeadline activities={upcomingDeadline} />
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
