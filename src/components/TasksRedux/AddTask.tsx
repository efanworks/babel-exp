import { useState } from "react";
import { addTask } from "./tasksSlice";
import { useAppDispatch } from "./hooks";

export const AddTask = () => {
  const [newTaskText, setNewTaskText] = useState("");
  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    dispatch(addTask({ text: newTaskText }));
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
};
