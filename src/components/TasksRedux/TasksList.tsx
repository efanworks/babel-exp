import { useSelector } from "react-redux";
import { type RootState } from "./store";
import { type Task } from "./tasksSlice";
import { TaskItem } from "./TaskItem";

export const TasksList = () => {
  const tasks = useSelector<RootState, Task[]>((state) => state.tasks.tasks);

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
