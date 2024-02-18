import { z } from "zod";

const tokenSchema = z.object({
  access_token: z.string(),
});

export const getToken = () => {
  const storage = localStorage.getItem("userProfile");

  const token = tokenSchema.safeParse(JSON.parse(storage!));

  if (!token.success) {
    window.location.href = "/login";
  } else {
    return token.data.access_token;
  }
};
