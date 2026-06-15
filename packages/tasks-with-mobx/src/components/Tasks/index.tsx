import { ErrorBoundary } from "react-error-boundary";
import { observer } from "mobx-react-lite";
import { store, TasksContext } from "../../store/tasks";
import { AddTask } from "../AddTask";
import { TaskList } from "../TaskList";

export const Tasks = observer(() => {
  return (
    <ErrorBoundary fallbackRender={() => <div>Page Not Found</div>}>
      <TasksContext.Provider value={store}>
        <AddTask />
        <TaskList />
      </TasksContext.Provider>
    </ErrorBoundary>
  );
});
