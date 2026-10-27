import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../redux/tasksSlice";

import TaskItem from "./TaskItem";

import SearchTask from "./SearchTask";
import { useState } from "react";

function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.isDone).length;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter((task) => {
    return task.title.toLowerCase().includes(search.toLowerCase());
  });

  const statusFilteredTasks = filteredTasks.filter((task) => {
    if (statusFilter === "done") {
      return task.isDone;
    }

    if (statusFilter === "active") {
      return !task.isDone;
    }

    return true;
  });
  const sortedTasks = [...statusFilteredTasks].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.id - a.id;
    }

    return a.id - b.id;
  });

  return (
    <div>
      <h2>Список задач</h2>
      <p className="task-counter">
        Всего задач: {totalTasks} | Выполнено: {completedTasks}
      </p>
      <SearchTask onSearch={setSearch} />
      <div className="task-filters">
        <button   className={statusFilter === "all" ? "active" : ""} onClick={() => setStatusFilter("all")}>Все</button>

        <button   className={statusFilter === "active" ? "active" : ""} onClick={() => setStatusFilter("active")}>Активные</button>

        <button   className={statusFilter === "done" ? "active" : ""} onClick={() => setStatusFilter("done")}>Выполненные</button>
      </div>
      <div className="task-sort">
        <label htmlFor="sortOrder">Сортировка:</label>

        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
        </select>
      </div>
      {sortedTasks.length > 0 ? (
        sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={(id) => dispatch(deleteTask(id))}
          />
        ))
      ) : (
        <p className="empty-message">Задачи не найдены</p>
      )}
    </div>
  );
}

export default TaskList;
