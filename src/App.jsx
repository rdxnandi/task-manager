import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard tasks={tasks} />} />
          <Route
            path="/tasks"
            element={<Tasks tasks={tasks} setTasks={setTasks} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
