import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ text: string }>) => {
      state.tasks.push({
        id: uuidv4(),
        done: false,
        text: action.payload.text,
      });
    },
    change: (
      state,
      action: PayloadAction<{ id: string; text?: string; done?: boolean }>,
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload);
      }
    },
    delete: (state, action: PayloadAction<{ id: string }>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const {
  add: addTask,
  change: changeTask,
  delete: deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
