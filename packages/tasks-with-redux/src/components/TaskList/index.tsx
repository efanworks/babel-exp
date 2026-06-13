import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { TaskItem } from "../TaskItem";
import { fetchTasks } from "../../store/tasksSlice";

export const TaskList = () => {
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
