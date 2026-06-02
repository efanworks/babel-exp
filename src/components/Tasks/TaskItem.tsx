import { useContext, useState } from "react";
import type { Task } from "./taskReducer";
import { TasksDispatchContext } from "./tasksContext";

type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);
  const dispatch = useContext(TasksDispatchContext);

  const handleSave = () => {
    dispatch({
      type: "change",
      payload: {
        id: task.id,
        text: value
      }
    });
    setEditing(false);
  };

  const handleDeleteTask = () => {
    dispatch({
      type: "delete",
      payload: {
        id: task.id
      }
    });
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
      <button onClick={handleDeleteTask}>delete</button>
    </li>
  );
}
