export const BASE_URL = "http://localhost:3010";

export function delayRequest<Args extends unknown[], R>(
  request: (...args: Args) => Promise<R>,
) {
  return async function (...args: Args) {
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
    return request(...args);
  };
}
