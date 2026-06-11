import { useSyncExternalStore } from "react";
import { counter } from "../../store/counter";

/**
 * 测试 useSyncExternalStore 同步外部 store
 * @returns
 */
export const Counter = () => {
  const count = useSyncExternalStore(
    counter.subscribe,
    counter.getSnapShot
  );

  return (
    <div>
      <button onClick={() => counter.start()}>start</button>
      {count}
    </div>
  );
};
