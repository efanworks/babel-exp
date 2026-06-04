import { useEffect } from "react";
import { TaskItem } from "./TaskItem";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchTasks } from "./tasksSlice";

export const TasksList = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
