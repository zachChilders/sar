import { logout, showUser } from "./UserContext";

// make these values accessible directly from the console and from `datum` for discoverability
const datum = {
  logout,
  showUser,
};
Object.assign(window, { datum, ...datum });

export * from "./AuthProvider";
export * from "./guards";
export * from "./hooks";
export { User } from "./user";
