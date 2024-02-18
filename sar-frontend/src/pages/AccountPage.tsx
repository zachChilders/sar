import { Box, Button, Heading } from "@chakra-ui/react";
import { paths } from "RootPage";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

export const AccountPage: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Heading>Account</Heading>
      <Button
        onClick={() => {
          localStorage.removeItem("userProfile");
          navigate(paths.home);
        }}
      >
        Logout
      </Button>
    </Box>
  );
};
