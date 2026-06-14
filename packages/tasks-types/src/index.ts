export type Task = {
  id: string;
  done: boolean;
  text: string;
};

export type MountedFn<T extends string = string> = (
  root: HTMLDivElement | null,
  path?: T,
) => void;

export type AddTaskAction = {
  type: "tasks/addTask";
  payload: { text: string };
};

export type ChangeTaskAction = {
  type: "tasks/changeTask";
  payload: { id: string; text?: string; done?: boolean };
};
