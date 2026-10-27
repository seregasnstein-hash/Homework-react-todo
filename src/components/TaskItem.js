import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask, toggleTask } from "../redux/tasksSlice";

function TaskItem({ task, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSave = () => {
    if (!title.trim()) {
      setError("Введите название задачи");
      return;
    }

    if (!description.trim()) {
      setError("Введите описание задачи");
      return;
    }

    setError("");

    dispatch(
      editTask({
        id: task.id,
        title: title.trim(),
        description: description.trim(),
      }),
    );

    setIsEditing(false);
  };

  return (
    <article className="task-item">
      {isEditing ? (
        <div>
          <p className="error-message">{error || " "}</p>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            placeholder="Название задачи"
          />

          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError("");
            }}
            placeholder="Описание задачи"
          />

          <button onClick={handleSave}>Сохранить</button>

          <button onClick={() => setIsEditing(false)}>Отмена</button>
        </div>
      ) : (
        <div className="task-content">
          <h3 className={`task-title ${task.isDone ? "completed" : ""}`}>
            {task.title}
          </h3>
          <p className={`task-description ${task.isDone ? "completed" : ""}`}>
            {task.description}
          </p>
          <label className="task-status">
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            Сделано
          </label>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>Редактировать</button>

            <button onClick={() => onDelete(task.id)}>Удалить</button>
          </div>
        </div>
      )}
    </article>
  );
}

export default TaskItem;
