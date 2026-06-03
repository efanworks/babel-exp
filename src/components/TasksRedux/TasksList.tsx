import { TaskItem } from "./TaskItem";
import { useAppSelector } from "./hooks";

export const TasksList = () => {
  const tasks = useAppSelector(state => state.tasks.tasks);

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
