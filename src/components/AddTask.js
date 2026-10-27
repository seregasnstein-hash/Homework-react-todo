import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Введите название задачи");
      return;
    } else if (!description.trim()) {
      setError("Введите описание задачи");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      isDone: false,
    };

    dispatch(addTask(newTask));

    setTitle("");
    setDescription("");
  };

  return (
    <div className="add-task">
      <form onSubmit={handleSubmit}>
        <p className="error-message">{error || " "}</p>

        <input
          type="text"
          placeholder="Название задачи"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
        />
        <input
          type="text"
          placeholder="Описание задачи"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError("");
          }}
        />

        <button type="submit">Добавить задачу</button>
      </form>
    </div>
  );
}

export default AddTask;
