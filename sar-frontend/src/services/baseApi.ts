/**
 * This file is used to generate the RTK Query Endpoint files for each service
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "./urls";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    async prepareHeaders(headers) {
      // const token = await getToken();

      // headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});
