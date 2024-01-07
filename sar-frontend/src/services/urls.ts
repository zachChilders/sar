/**
 * This file imports the OpenAPI spec and exports functions that are tightly coupled to the API. This allows
 * us to consolidate hard-coded paths in one place and keep those paths valid with the type checker.
 *
 * Any RESTful/JSON APIs should leverage our RTK-Query code gen. This file is for non-RESTful APIs, like file
 * uploads and server-sent events.
 */

import { createEnvConfig } from "lib/createEnvConfig";
import openapi from "./openapi.json";

type Path = keyof typeof openapi.paths;

type RouteToParams<
  T,
  TParams extends Record<string, string>,
> = T extends `${string}{${infer TParamName}}${infer TTail}`
  ? RouteToParams<
    TTail,
    {
      [K in TParamName | keyof TParams]: string;
    }
  >
  : TParams;

type Replace<
  Input extends string,
  Search extends string,
  Replacement extends string,
> = Input extends `${infer Head}${Search}${infer Tail}`
  ? `${Head}${Replacement}${Tail}`
  : Input;

type PathWithParams<
  T,
  Params extends Record<string, string>,
> = T extends `${string}{${infer TParamName}}${string}`
  ? PathWithParams<Replace<T, `{${TParamName}}`, Params[TParamName]>, Params>
  : T;

const getPath = <P extends Path>(
  path: P,
  // eslint-disable-next-line @typescript-eslint/ban-types
  params: RouteToParams<P, {}>,
) => {
  const keys = Object.keys(params);

  const route = keys.length
    ? keys.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ($route, key) => $route.replace(`{${key}}`, (params as any)[key]),
      path,
    )
    : path;

  return `${apiUrl as string}${route as PathWithParams<P, typeof params>
    }` as const;
};

export const apiUrl = createEnvConfig({
  development: "http://localhost:8080",
  production: "https://datum-prod.azurewebsites.us",
});

