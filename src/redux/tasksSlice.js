import { createSlice } from "@reduxjs/toolkit";

const defaultTasks = [
  {
    id: 1,
    title: "Первое дело",
    description: "Надо сделать первое дело",
    isDone: false,
  },
  {
    id: 2,
    title: "Второе дело",
    description: "Надо сделать первое дело, потом второе",
    isDone: true,
  },
];

let initialState = defaultTasks;

try {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    initialState = JSON.parse(savedTasks);
  }
} catch (error) {
  console.error("Не удалось загрузить задачи:", error);
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => {
        return task.id !== action.payload;
      });
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const task = state.find((task) => task.id === id);

      if (task) {
        task.title = title;
        task.description = description;
      }
    },
    toggleTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);

      if (task) {
        task.isDone = !task.isDone;
      }
    },
  },
});

export const { addTask, deleteTask, editTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
