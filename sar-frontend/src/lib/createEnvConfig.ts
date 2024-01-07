import { Environment, environment } from "../platform/environment";

export const createEnvConfig = <T>(config: Record<Environment, T>) =>
  config[environment];
