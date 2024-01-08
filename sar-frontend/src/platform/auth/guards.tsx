import { Heading, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { useRequiredUser } from "./hooks";

const AccessControlError: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Heading>{"You can't access that!"}</Heading>
    <Text>{children}</Text>
  </>
);
