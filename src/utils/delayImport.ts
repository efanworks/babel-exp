export async function delayImport<T>(promiseByImport: Promise<T>) {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  return promiseByImport;
}
