import { Provider } from "react-redux";
import { AddTask } from "./AddTask";
import { TasksList } from "./TasksList";
import { store } from "./store";

export const TasksRedux = () => {
  return (
    <Provider store={store}>
      <AddTask />
      <TasksList />
    </Provider>
  );
};
