import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask as addTaskAPI } from "./api";

export const AddTask = () => {
  const [newTaskText, setNewTaskText] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (text: string) => await addTaskAPI(text),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
    }
  });

  const handleAddTask = async () => {
    await mutation.mutateAsync(newTaskText);
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
