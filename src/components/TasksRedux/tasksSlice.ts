import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchTasks as fetchTasksAPI,
  addTask as addTaskAPI,
  changeTask as changeTaskAPI,
  deleteTask as deleteTaskAPI,
} from "./api";

export type Task = {
  id: string;
  done: boolean;
  text: string;
};

export type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const tasks = await fetchTasksAPI();
  return tasks;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (text: string) => {
    const task = await addTaskAPI(text);
    return task;
  },
);

export const changeTask = createAsyncThunk(
  "tasks/changeTask",
  async ({ id, text, done }: { id: string; text?: string; done?: boolean }) => {
    const updates = Object.assign(
      {},
      text ? { text } : {},
      done ? { done } : {},
    );
    const task = await changeTaskAPI(id, updates);
    return task;
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    await deleteTaskAPI(id);
    return id;
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(changeTask.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.id);
        if (task) {
          Object.assign(task, action.payload);
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
