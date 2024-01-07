import { Box, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useAccountControllerGetMembersQuery } from "services";

export const AccountPage: FunctionComponent = () => {
  const { data } = useAccountControllerGetMembersQuery();
 
  return (
    <Box>
      <Text>Member List</Text>
      <Text>{JSON.stringify(data)}</Text>
    </Box>
  );
};
