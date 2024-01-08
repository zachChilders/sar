import { useAuth0 } from "@auth0/auth0-react";
import { User } from "./user";
import { useInitializingUser } from "./UserContext";
import { unreachable } from "lib/unreachable";

export class LoginRedirectionError extends Error {
  public readonly isControlFlow = true;
  public readonly message = "Redirecting to login page";
  public readonly name = "LoginRedirectionError";
}

/**
 * @returns the user, or null if the user is not authenticated.
 */
export const useOptionalUser = () => {
  const user = useInitializingUser();

  if (user === undefined) {
    return unreachable(
      "UserContext should be initialized before useOptionalUser is called",
    );
  }

  return user;
};

/**
 * @returns the user, or initiates a login if the user is not authenticated.
 */
export const useRequiredUser = (): User => {
  const { loginWithRedirect } = useAuth0();
  const user = useOptionalUser();

  if (!user) {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
    });

    throw new LoginRedirectionError();
  }

  return user;
};
