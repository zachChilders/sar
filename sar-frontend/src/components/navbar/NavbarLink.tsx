import { Box, Button, Tooltip } from "@chakra-ui/react";
import { FC, PropsWithChildren, ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  id?: string;
  to?: string;
  tooltip?: ReactNode;
}

export const NavbarLink: FC<PropsWithChildren<Props>> = ({
  id,
  to,
  children,
  tooltip,
}) => (
  <Button id={id} variant="navbar" as={NavLink} to={to} backgroundColor={"red.500"}>
    <Tooltip label={tooltip}>
      <Box>{children}</Box>
    </Tooltip>
  </Button>
);
