import { useTasks } from "../../hooks/useTasks";
import { TaskItem } from "./TaskItem";

export const TasksList = () => {
  const tasks = useTasks((state) => state.tasks);

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
