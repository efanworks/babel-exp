import { ErrorBoundary } from "react-error-boundary";
import { AddTask } from "../AddTask";
import { TaskList } from "../TaskList";

export const Tasks = () => {
  return (
    <ErrorBoundary fallbackRender={() => <div>Page Not Found</div>}>
      <AddTask />
      <TaskList />
    </ErrorBoundary>
  );
};
