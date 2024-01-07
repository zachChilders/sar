import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useMemberControllerGetMembersQuery } from "services";

export const AccountPage: FunctionComponent = () => {
  const { data } = useMemberControllerGetMembersQuery();
  if (!data) return <Text>Loading...</Text>;

  return (
    <Box>
      <Heading>Account</Heading>
    </Box>
  );
};
