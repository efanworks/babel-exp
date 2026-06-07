import { useTasks } from "./useTasks";
import { TaskItem } from "./TaskItem";
import { useEffect } from "react";

export const TasksList = () => {
  const tasks = useTasks((state) => state.tasks);
  const fetchTasks = useTasks((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
