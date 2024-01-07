import { Box, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useAccountControllerGetMembersQuery } from "services";

export const AccountPage: FunctionComponent = () => {
  const { data } = useAccountControllerGetMembersQuery();
  if (!data) return <Text>Loading...</Text>;

  return (
    <Box>
      <Text>Member List</Text>
      {data.map((member) => (
        <Text>{member.name}</Text>
      ))}
    </Box>
  );
};
