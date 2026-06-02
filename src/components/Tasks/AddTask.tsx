import { useContext, useState } from "react";
import { TasksDispatchContext } from "./tasksContext";

export function AddTask() {
  const [newTaskText, setNewTaskText] = useState("");
  const dispatch = useContext(TasksDispatchContext);

  const handleAddTask = () => {
    dispatch({
      type: "add",
      payload: {
        text: newTaskText
      }
    });
    setNewTaskText("");
  };

  return (
    <>
      <input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
      <button onClick={handleAddTask}>add</button>
    </>
  );
}
