import { match } from "ts-pattern";

export const environment = match(window.location.hostname)
  .with("localhost", () => "development" as const)
  .otherwise(() => "production" as const);

export type Environment = typeof environment;
