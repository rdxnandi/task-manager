import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import Layout from "../components/Layout";
import { Trash } from "lucide-react";
import { useTasks } from "../context/TaskContext";

function Tasks() {
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useTasks();
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [taskTime, setTaskTime] = useState(dayjs());

  const handleAddTask = () => {
    addTask(newTask, selectedDate, taskTime);
    setNewTask("");
    setSelectedDate(dayjs());
    setTaskTime(dayjs());
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex lg:flex-row flex-col gap-3 justify-center mt-6 lg:h-[40px]">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="p-2 flex rounded border border-gray-300 lg:w-[400px] hover:border-black focus:outline-blue-500"
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
            onClick={handleAddTask}
            className="lg:ml-2 px-5 py-2 lg:py-0 m-auto lg:m-0 bg-green-400 text-white rounded cursor-pointer"
          >
            Add
          </button>
        </div>
        <ul className="mt-10 flex justify-center gap-4 flex-wrap">
          {tasks.map((task) => (
            <li key={task.id} className="bg-green-200 w-[200px] p-3 rounded-lg">
              <span
                className={`text-lg ${
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
              <div className="flex justify-between">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="cursor-pointer outline-none text-sm"
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  className="cursor-pointer text-red-500"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Tasks;
