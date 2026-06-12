import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Task } from "@efanworks/tasks-types";
import {
  fetchTasks as fetchTasksAPI,
  addTask as addTaskAPI,
  changeTask as changeTaskAPI,
  deleteTask as deleteTaskAPI,
} from "@efanworks/tasks-api";

const initialState: {
  tasks: Task[];
} = {
  tasks: [],
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await fetchTasksAPI();
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (text: string) => {
    return await addTaskAPI(text);
  },
);

export const changeTask = createAsyncThunk(
  "tasks/changeTask",
  async ({ id, done, text }: { id: string; done?: boolean; text?: string }) => {
    const updates = Object.assign(
      {},
      text ? { text } : {},
      done ? { done } : {},
    );
    return await changeTaskAPI(id, updates);
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
        state.tasks = state.tasks.map((t) => {
          if (t.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return t;
        });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
