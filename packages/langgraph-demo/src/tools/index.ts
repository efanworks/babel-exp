import { add } from "./add.js";
import { multiply } from "./multiply.js";
import { divide } from "./divide.js";

export const toolsByName = {
  [add.name]: add,
  [multiply.name]: multiply,
  [divide.name]: divide,
};

export const tools = Object.values(toolsByName);
export { add, multiply, divide };
