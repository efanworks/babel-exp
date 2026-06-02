import { TasksProvider } from "./TasksProvider";
import { AddTask } from "./AddTask";
import { TasksList } from "./TasksList";

export function Tasks() {
  return (
    <TasksProvider>
      <AddTask />
      <TasksList />
    </TasksProvider>
  );
}
