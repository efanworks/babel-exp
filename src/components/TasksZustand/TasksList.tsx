import { useQuery } from "@tanstack/react-query";
import { fetchTasks as fetchTasksAPI } from "./api";
import { TaskItem } from "./TaskItem";

export const TasksList = () => {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => await fetchTasksAPI()
  });

  return (
    <ul>
      {query.data?.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
