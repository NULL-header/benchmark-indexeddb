import { ioData, IO } from "./setup";

const measureTime = async (func: () => Promise<any>) => {
  const startTime = performance.now();
  await func();
  const diff = performance.now() - startTime;
  return diff;
};

export const measureIO = async (io: IO) => {
  const result = await measureTime(async () => {
    await io.in();
    await io.out();
  });
  await io.cleanup();
  return result;
};

const measureIOSometimes = async (io: IO) => {
  let index = 0;
  const target = [...Array(10).keys()];
  while (index < target.length) {
    // eslint-disable-next-line no-await-in-loop
    target[index] = await measureIO(io);
    index += 1;
  }
  return target;
};

export const measure = async () => {
  const target = {} as Record<keyof typeof ioData, number[]>;
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, io] of Object.entries(ioData)) {
    // eslint-disable-next-line no-await-in-loop
    target[key as keyof typeof ioData] = await measureIOSometimes(io);
  }
  console.log(target);
};
