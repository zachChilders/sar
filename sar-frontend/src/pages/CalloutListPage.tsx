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

export const CalloutListPage: FunctionComponent = () => {
  const { data } = useMemberControllerGetMembersQuery();
  if (!data) return <Text>Loading...</Text>;

  return (
    <Box>
      <Heading>Callout List</Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>Cell</Th>
            <Th>Ham</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((member) => (
            <Tr key={member.email}>
              <Td>{member.firstName}</Td>
              <Td>{member.lastName}</Td>
              <Td>{member.email}</Td>
              <Td>{member.phoneCell}</Td>
              <Td>{member.ham}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
