import { Auth0Context, Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { FC, PropsWithChildren } from "react";
import { P, isMatching } from "ts-pattern";
import { FunctionComponent } from "react";
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  Text,
  theme,
  useTimeout,
} from "@chakra-ui/react";
import { LoginRedirectionError } from "./hooks";
import {
  AnonymousProvider,
  ApiKeyProvider,
  AuthenticatedProvider,
} from "./UserContext";
import { clientId, domain, audience } from "./config";
import { unreachable } from "lib/unreachable";

type GetToken = () => Promise<string | undefined>;
type LoginWithRedirect = () => void;

/**
 * Auth0-derived state should always be accessed from within the react component
 * tree; however, there are two main cases where we need to access it outside of
 * the react component tree:
 * - rtk-query requires a static function for getting the token
 * - tools we provide in the dev tools console live outside the tree
 */
const getTokenRef: { value?: GetToken } = {};
const loginWithRedirectRef: { value?: LoginWithRedirect } = {};

/**
 * Gets the access token if the user is logged in, or logs them out if their session expired.
 * @returns the access token
 */
export const getToken: GetToken = async () => {
  try {
    return await getTokenRef.value?.();
  } catch (error) {
    if (
      isMatching(
        {
          error: P.union(
            "login_required",
            "missing_refresh_token",
            "invalid_grant"
          ),
        },
        error
      )
    ) {
      // The user is in an unrecoverable logged out state, relog them.
      const loginWithRedirect =
        loginWithRedirectRef.value ?? unreachable("Race condition");

      loginWithRedirect();
      throw new LoginRedirectionError();
    }

    throw error;
  }
};

/**
 * Initializes auth, only rendering the children once auth is initialized.
 */
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => (
  <Auth0Provider
    clientId={clientId}
    domain={domain}
    cacheLocation="localstorage"
    useRefreshTokens
    authorizationParams={{
      audience,
      redirect_uri: window.location.origin + "/auth/callback",
    }}
  >
    <Auth0Context.Consumer>
      {({
        getAccessTokenSilently,
        isLoading,
        isAuthenticated,
        loginWithRedirect,
      }) => {
        if (isLoading) {
          return <Text>Loading...</Text>;
        }

        if (!isAuthenticated) {
          return <AnonymousProvider>{children}</AnonymousProvider>;
        }

        getTokenRef.value = getAccessTokenSilently;
        loginWithRedirectRef.value = loginWithRedirect;

        return <AuthenticatedProvider>{children}</AuthenticatedProvider>;
      }}
    </Auth0Context.Consumer>
  </Auth0Provider>
);

export const AuthLogout: FunctionComponent = () => {
  const { logout } = useAuth0();

  localStorage.clear();
  logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });

  return <Text>Loading...</Text>;
};

export const AuthInvite: FunctionComponent = () => {
  const { loginWithRedirect } = useAuth0();

  const query = new URLSearchParams(window.location.search);

  loginWithRedirect({
    appState: {
      returnTo: window.location.origin,
    },
    authorizationParams: {
      invitation: query.get("invitation") ?? undefined,
    },
  });

  throw new LoginRedirectionError();
};

// There are some auth states that seem to be navigating users directly to auth/callback.
// This page wasn't a real page in our app, but the auth0 sdk intercepts calls there and
// continues auth flows if a flow is in progress.
// This page exists to redirect a user that got lost and ended up here to the root of the app,
// where they will either be able to use the app normally or get kicked into a login flow if they
// have an invalid session.
export const AuthCallback: FunctionComponent = () => {
  useTimeout(() => {
    window.location.href = "/";
  }, 3000);

  return (
    <Box display="flex" justifyContent="center">
      <Box>
        <Text>Loading...</Text>
        <Text fontSize="xl" textAlign="center">
          Redirecting...
        </Text>
      </Box>
    </Box>
  );
};
