import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TasksList } from "./TasksList";
import { AddTask } from "./AddTask";

const queryClient = new QueryClient();

export const TasksZustand = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallbackRender={() => <div>Page Not Found</div>}>
        <AddTask />
        <TasksList />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
