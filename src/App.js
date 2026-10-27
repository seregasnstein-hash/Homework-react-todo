import "./App.css";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const tasks = useSelector((state) => state.tasks);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <div className="app">
      <Header />
      <main className="container">
        <AddTask />
        <TaskList />
      </main>
    </div>
  );
}

export default App;
