import { useState } from "react";
import { Button, Input, Space } from "antd";
import { useTasks } from "../../store/useTasks";

export const AddTask = () => {
  const [newTaskText, setNewTaskText] = useState("");
  const addTask = useTasks((state) => state.addTask);

  const handleAddTask = async () => {
    await addTask(newTaskText);
    setNewTaskText("");
  };

  return (
    <Space.Compact>
      <Input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
      <Button type="primary" onClick={handleAddTask}>add</Button>
    </Space.Compact>
  );
};
