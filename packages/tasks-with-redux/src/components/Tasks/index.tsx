import { Provider } from "react-redux";
import { store } from "../../store";
import { AddTask } from "../AddTask";
import { TaskList } from "../TaskList";

export const Tasks = () => {
  return (
    <Provider store={store}>
      <AddTask />
      <TaskList />
    </Provider>
  );
};
