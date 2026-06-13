import { useEffect, useRef } from "react";
import { mount as mountForPinia } from "@efanworks/tasks-with-pinia";
import { type MountedFn } from "@efanworks/tasks-types";

type MountedMap = Record<string, { id: string; mount: MountedFn }>;

export const Mounter = (path: string) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mountedMap: MountedMap = {
      tasks: {
        id: "tasks",
        mount: mountForPinia
      }
    };
    const id = mountedMap[path]?.id;
    const mount = mountedMap[path]?.mount;
    if (!mount) {
      return;
    }
    mount(rootRef.current, id);
  }, []);

  return <div ref={rootRef}></div>;
};
