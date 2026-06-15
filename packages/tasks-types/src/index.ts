export type Task = {
  id: string;
  done: boolean;
  text: string;
};

export type MountedFn = (root: HTMLDivElement | null, path?: string) => void;

export type AddTaskAction = {
  type: "tasks/addTask";
  payload: { text: string };
};

export type ChangeTaskAction = {
  type: "tasks/changeTask";
  payload: { id: string; text?: string; done?: boolean };
};
