import { useTasks } from "../../store/useTasks";
import { TaskItem } from "../TaskItem";

export const TaskList = () => {
  const tasks = useTasks((state) => state.tasks);

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
