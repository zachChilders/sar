import type { ConfigFile } from "@rtk-query/codegen-openapi";

// Must be a default export, because the codegen tool expects it to be.
// eslint-disable-next-line import/no-default-export
export default {
  schemaFile: "openapi.json",
  apiFile: "./baseApi.ts",
  apiImport: "baseApi",
  outputFile: "generated-endpoints.ts",
  exportName: "api",
  hooks: true,
  tag: true,
} satisfies ConfigFile;
