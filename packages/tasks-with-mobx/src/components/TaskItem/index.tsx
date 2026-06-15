import { useState } from "react";
import { type Task } from "@efanworks/tasks-types";
import { useTasks } from "../../store/tasks";
import { observer } from "mobx-react-lite";

export const TaskItem = observer(({ task }: { task: Task }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);
  const { changeTask, deleteTask } = useTasks();

  const handleSave = async () => {
    await changeTask(task.id, value);
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
});
