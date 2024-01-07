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
import {
  useMemberControllerGetMembersQuery,
  useOperationControllerGetOperationsQuery,
} from "services";

export const OperationsPage: FunctionComponent = () => {
  const { data } = useOperationControllerGetOperationsQuery();
  if (!data) return <Text>Loading...</Text>;

  return (
    <Box>
      <Heading>Operations</Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Operation Number</Th>
            <Th>Operation Title</Th>
            <Th>Operation Start Date</Th>
            <Th>Operation Notes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((operation) => (
            <Tr key={operation.number}>
              <Td>{operation.number}</Td>
              <Td>{operation.title}</Td>
              <Td>{operation.start}</Td>
              <Td>{operation.notes}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
