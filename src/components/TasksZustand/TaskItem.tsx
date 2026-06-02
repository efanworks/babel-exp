import { useState } from "react";
import { useTasks, type Task } from "../../hooks/useTasks";

export const TaskItem = ({ task }: { task: Task }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);
  const changeTask = useTasks((state) => state.changeTask);
  const deleteTask = useTasks((state) => state.deleteTask);

  const handleSave = () => {
    changeTask({
      id: task.id,
      text: value
    });
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
      <button onClick={() => deleteTask(task.id)}>delete</button>
    </li>
  );
};
