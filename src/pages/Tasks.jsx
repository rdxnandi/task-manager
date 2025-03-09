import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import Layout from "../components/Layout";

function Tasks({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [taskTime, setTaskTime] = useState(dayjs());

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          text: newTask,
          completed: false,
          dueDate: selectedDate.format("YYYY-MM-DD"),
          dueTime: taskTime.format("HH:mm"),
        },
      ]);
      setNewTask("");
      setSelectedDate(dayjs());
      setTaskTime(dayjs());
    }
  };

  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex gap-3 justify-center mt-6 h-[40px]">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="p-2 flex rounded border border-gray-300 w-[400px] hover:border-black focus:outline-blue-500"
            placeholder="Add a new task"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              className="mt-2"
              sx={{ "& .MuiInputBase-root": { height: "40px" } }}
            />
            <TimePicker
              value={taskTime}
              onChange={(newTime) => setTaskTime(newTime)}
              className="mt-2"
              sx={{ "& .MuiInputBase-root": { height: "40px" } }}
            />
          </LocalizationProvider>
          <button
            onClick={addTask}
            className="ml-2 px-5 bg-amber-400 text-white rounded cursor-pointer"
          >
            Add
          </button>
        </div>
        <ul className="mt-10 flex gap-4 flex-wrap">
          {tasks.map((task, index) => (
            <li key={index} className="bg-amber-200 w-[200px] p-3 rounded-lg">
              <span
                className={`text-lg font-semibold ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>
              <div className="flex justify-between my-4">
                <span className="text-sm text-[#414141]">
                  {task.dueDate
                    ? dayjs(task.dueDate).format("MMM D, YYYY")
                    : "No Date"}
                </span>
                <span className="text-sm text-[#414141]">
                  {task.dueTime ? task.dueTime : "No Time"}
                </span>
              </div>
              <button
                onClick={() => toggleTaskCompletion(index)}
                className="cursor-pointer outline-none text-sm"
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Tasks;
