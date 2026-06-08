import { observer } from "mobx-react-lite";
import { Timer } from "./store";
import { useEffect, useRef } from "react";

const timer = new Timer();

export const TimerMobx = observer(() => {
  const clock = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const handleReset = () => {
    clearInterval(clock.current);
    timer.reset();
    clock.current = setInterval(() => {
      timer.increment();
    }, 1000);
  };

  useEffect(() => {
    clock.current = setInterval(() => {
      timer.increment();
    }, 1000);

    return () => {
      clearInterval(clock.current);
    };
  }, []);

  return (
    <>
      <button onClick={handleReset}>reset</button>
      <button>{timer.secondsPassed}</button>
    </>
  );
});
