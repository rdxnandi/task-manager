import React, { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [recentActivities, setRecentActivities] = useState(() => {
    const savedActivities = localStorage.getItem("recentActivities");
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("recentActivities", JSON.stringify(recentActivities));
  }, [recentActivities]);

  // Setting state
  const [settings, setSettings] = useState({
    notifications: false,
    autoDarkMode: false,
    soundAlerts: true,
    emailReminders: false,
    compactView: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Task management state
  const addTask = (newTask, selectedDate, taskTime) => {
    if (newTask.trim()) {
      const task = {
        id: tasks.length + 1,
        text: newTask,
        completed: false,
        dueDate: selectedDate.format("YYYY-MM-DD"),
        dueTime: taskTime.format("HH:mm"),
      };

      setTasks((prevTasks) => [...prevTasks, task]);

      setRecentActivities((prevActivities) => [
        `Task "${newTask}" added`,
        ...prevActivities,
      ]);
    }
  };

  const deleteTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setRecentActivities((prevActivities) => [
        `Task "${task.text}" deleted`,
        ...prevActivities,
      ]);
    }

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setRecentActivities((prevActivities) => [
        `Task "${task.text}" ${
          task.completed ? "marked as incomplete" : "marked as completed"
        }`,
        ...prevActivities,
      ]);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        settings,
        toggleSetting,
        tasks,
        addTask,
        toggleTaskCompletion,
        deleteTask,
        recentActivities,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
