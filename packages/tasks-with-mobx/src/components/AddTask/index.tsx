import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useTasks } from "../../store/tasks";

export const AddTask = observer(() => {
  const [newTaskText, setNewTaskText] = useState("");
  const { addTask } = useTasks();

  const handleAddTask = async () => {
    await addTask(newTaskText);
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
});
