import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { store } from "../../store";
import { AddTask } from "../AddTask";
// import {TaskList} from '../TaskList';

export const Tasks = () => {
  return (
    <ErrorBoundary fallbackRender={() => <div>Page Not Found</div>}>
      <Provider store={store}>
        <AddTask />
        {/* <TaskList /> */}
      </Provider>
    </ErrorBoundary>
  );
};
