import { useContext } from "react";
import { TasksContext } from "./tasksContext";
import { TaskItem } from "./TaskItem";

export function TasksList() {
  const tasks = useContext(TasksContext);

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem task={task} />
      ))}
    </ul>
  );
}
