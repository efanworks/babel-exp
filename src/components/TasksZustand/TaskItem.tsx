import { useState } from "react";
import { type Task } from "./useTasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeTask, deleteTask } from "./api";

export const TaskItem = ({ task }: { task: Task }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async ({ id, text }: { id: string; text: string }) =>
      await changeTask(id, { text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => await deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  const handleSave = async () => {
    await editMutation.mutateAsync({ id: task.id, text: value });
    setEditing(false);
  };

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(task.id);
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
      <button onClick={handleDelete}>delete</button>
    </li>
  );
};
