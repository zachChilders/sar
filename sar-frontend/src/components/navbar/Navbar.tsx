import { HStack, Spacer, Box, Image, Link } from "@chakra-ui/react";
import { FC } from "react";
import { NavbarLink } from "./NavbarLink";
import { paths } from "../../RootPage";

export const Navbar: FC = () => {
  return (
    <HStack justify={"full"} backgroundColor={"gray"}>
      <Link href={paths.home}>
        <Image src="/monosar.webp" alt="Monosar Logo" maxHeight={"80px"} />
      </Link>
      <Spacer />
      <NavbarLink to={paths.operations}>Operations</NavbarLink>
      <NavbarLink to={paths.training}>Training </NavbarLink>
      <NavbarLink to={paths.calloutList}>Callout List</NavbarLink>
      <NavbarLink to={paths.account}>Account</NavbarLink>
    </HStack>
  );
};
