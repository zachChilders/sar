import { useAuth0 } from "@auth0/auth0-react";
import {
  Alert,
  AlertIcon,
  Link,
  Text,
  useEventListener,
} from "@chakra-ui/react";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { environment } from "platform/environment";
import { useSelf } from "hooks/useSelf";
import { getToken } from "./AuthProvider";
import { User } from "./user";

const logoutRef: { value: (() => void) | null } = { value: null };
const userRef: { value: User | null } = { value: null };

const UserContext = createContext<User | null | undefined>(undefined);

class UserContextUnmountError extends Error {
  constructor() {
    super("UserContext unmounted. This should never happen.");
  }
}

export const ApiKeyProvider: FC<PropsWithChildren> = ({ children }) => {
  const { self } = useSelf();

  const user = useMemo(() => (self ? new User(self) : null), [self]);

  if (!user) {
    if (self === null) throw new Error("User does not exist with the API key");

    return (
      <UserContext.Provider value={null}>
        <Text>Loading...</Text>
      </UserContext.Provider>
    );
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const AuthenticatedProvider: FC<PropsWithChildren> = ({ children }) => {
  const { logout } = useAuth0();
  const { self } = useSelf();

  const user = useMemo(() => {
    logoutRef.value = logout;

    if (!self) {
      return null;
    }

    const user = new User(self);

    userRef.value = user;

    return user;
  }, [self, logout]);

  // assert the user still has a valid session
  useEventListener("focus", () => user && getToken());

  // AuthenticatedProvider should never unmount, yet seems to sometimes...
  useEffect(
    () =>
      // run some code when AuthenticatedProvider unmounts
      () => {
        // react unmounts in local dev to ensure you're not abusing hooks
        // but we are abusing hooks for this one case, so skip in dev
        if (environment === "development") {
          return;
        }

        const exception = new UserContextUnmountError();
      },
    []
  );

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const AnonymousProvider: FC<PropsWithChildren> = ({ children }) => (
  <UserContext.Provider value={null}>{children}</UserContext.Provider>
);

export const showUser = () => userRef.value?.toRecord();

export const logout = () => logoutRef.value?.();

export const useInitializingUser = () => useContext(UserContext);
