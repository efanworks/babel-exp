import { useState } from "react";
import { changeTask, deleteTask, type Task } from "./tasksSlice";
import { useAppDispatch } from "./hooks";

export const TaskItem = ({ task }: { task: Task }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(
      changeTask({
        id: task.id,
        text: value
      })
    );
    setEditing(false);
  };

  return (
    <li>
      {editing ? (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleSave}>save</button>
        </>
      ) : (
        <>
          {task.text} - {task.done ? "done" : "undo"}
          <button onClick={() => setEditing(true)}>edit</button>
        </>
      )}
      <button onClick={() => deleteTask({ id: task.id })}>delete</button>
    </li>
  );
};
