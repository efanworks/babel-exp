import { lazy, Suspense, useEffect, useState } from "react";
import { TasksList } from "./TasksList";
import { delayImport } from "../../utils/delayImport";
import { ErrorBoundary } from "react-error-boundary";

const AddTask = lazy(() => delayImport(import("./AddTask")));

export const TasksZustand = () => {
  const [isAdd, setIsAdd] = useState(false);

  const handleAdd = () => {
    setIsAdd(!isAdd);
  };

  return (
    <>
      <button onClick={handleAdd}>isAdd</button>
      {isAdd && (
        <Suspense fallback={<div>loading...</div>}>
          <AddTask />
        </Suspense>
      )}
      <ErrorBoundary fallbackRender={() => <div>Page Not Found</div>}>
        <TasksList />
      </ErrorBoundary>
    </>
  );
};
