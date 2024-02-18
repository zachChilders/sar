import { FunctionComponent } from "react";
import { Text } from "@chakra-ui/react";
import { useRequiredUser } from "hooks/useRequiredUser";

export const HomePage: FunctionComponent = (): React.ReactElement => {
  useRequiredUser();
  return <Text>Hello World</Text>;
};
