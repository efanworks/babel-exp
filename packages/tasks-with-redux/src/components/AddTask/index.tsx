import { useState } from "react";
import {useAppDispatch } from '../../store';
import { addTask } from "../../store/tasksSlice";

export const AddTask = () => {
  const [newTaskText, setNewTaskText] = useState("");
  const dispatch = useAppDispatch();

  const handleAddTask = async () => {
    await dispatch(addTask(newTaskText));
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
