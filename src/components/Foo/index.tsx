import { useReducer } from "react";

interface Payload {
  type: "increment" | "decrement";
  value: number;
}

export function Foo() {
  const [counter, dispatch] = useReducer(
    (preState, payload: Payload) => {
      const { type, value } = payload;
      switch (type) {
        case "increment": {
          return {
            count: preState.count + value
          };
        }
        case "decrement": {
          return {
            count: preState.count - value
          };
        }
      }
    },
    {
      count: 0
    }
  );

  const handleClick = (type: Payload["type"]) => {
    dispatch({
      type,
      value: 5,
    });
  };

  return (
    <div>
      {counter.count}
      <button onClick={() => handleClick("decrement")}>-</button>
      <button onClick={() => handleClick("increment")}>+</button>
    </div>
  );
}