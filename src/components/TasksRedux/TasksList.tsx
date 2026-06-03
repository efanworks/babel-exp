import { useSelector } from "react-redux";
import { type Tasks, type Task } from "./tasksSlice";
import { TaskItem } from "./TaskItem";

export const TasksList = () => {
  const tasks = useSelector<Tasks, Task[]>((state) => state.tasks);
  console.log(tasks);

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
