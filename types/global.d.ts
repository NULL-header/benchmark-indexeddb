declare module "!comlink-loader?singleton=true!./worker" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type Origin = typeof import("src/worker");
  const origin: Origin;
  export = origin;
}
