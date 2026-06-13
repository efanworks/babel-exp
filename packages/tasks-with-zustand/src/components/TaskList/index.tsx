import { useEffect } from "react";
import { useTasks } from "../../store/useTasks";
import { TaskItem } from "../TaskItem";

export const TaskList = () => {
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
