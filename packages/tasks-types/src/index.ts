export type Task = {
  id: string;
  done: boolean;
  text: string;
};

export type MountedFn<T extends string = string> = (
  root: HTMLDivElement | null,
  path?: T,
) => void;
