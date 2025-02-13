import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import Layout from "../components/Layout";

function Tasks({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          text: newTask,
          completed: false,
          dueDate: selectedDate,
        },
      ]);
      setNewTask("");
      setSelectedDate(dayjs());
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
      <div className="p-4 bg-white shadow-md rounded-lg">
        <div className="flex gap-3 justify-center mt-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="p-2 flex rounded border border-gray-300"
            placeholder="Add a new task"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              className="mt-2"
            />
          </LocalizationProvider>
          <button
            onClick={addTask}
            className="ml-2 px-4 bg-amber-400 text-white rounded"
          >
            Add
          </button>
        </div>
        <ul className="mt-6">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between p-2 bg-amber-200 rounded mt-2"
            >
              <div className="flex gap-5">
                <span
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.text}
                </span>
                <span className="text-sm text-[#414141]">
                  {task.dueDate
                    ? dayjs(task.dueDate).format("MMM D, YYYY")
                    : "No Date"}
                </span>
              </div>
              <button
                onClick={() => toggleTaskCompletion(index)}
                className="p-2 hover:bg-amber-300 rounded hover:cursor-pointer"
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
