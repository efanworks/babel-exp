import { useState } from "react";
import { useTasks } from "./useTasks";

export const AddTask = () => {
  const [newTaskText, setNewTaskText] = useState("");
  const addTask = useTasks((state) => state.addTask);

  const handleAddTask = () => {
    addTask(newTaskText);
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

export default AddTask;