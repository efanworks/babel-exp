import { useEffect } from "react";
import { useTasks } from "../../store/tasks";
import { TaskItem } from "../TaskItem";
import { observer } from "mobx-react-lite";

export const TaskList = observer(() => {
  const { tasks, fetchTasks } = useTasks();

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
});
