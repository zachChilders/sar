import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Flex } from "@chakra-ui/react";
import { HomePage } from "./pages/HomePage";
import { AccountPage } from "./pages/AccountPage";
import { OperationsPage } from "./pages/OperationsPage";
import { TrainingPage } from "./pages/TrainingPage";
import { CalloutListPage } from "pages/CalloutListPage";
import { LoginPage } from "pages/LoginPage";
import { SignUpPage } from "pages/SignUp";

export const paths = {
  home: "/home",
  operations: "/operations",
  training: "/training",
  calloutList: "/callout-list",
  account: "/account",
  login: "/login",
  signup: "/signup",
};

export const RootPage: React.FC = () => (
  <Flex direction="column" height="100vh" width="100vw">
    <Navbar />
    <Routes>
      <Route path={paths.home} element={<HomePage />} />
      <Route path={paths.operations} element={<OperationsPage />} />
      <Route path={paths.training} element={<TrainingPage />} />
      <Route path={paths.calloutList} element={<CalloutListPage />} />
      <Route path={paths.account} element={<AccountPage />} />
      <Route path={paths.login} element={<LoginPage />} />
      <Route path={paths.signup} element={<SignUpPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  </Flex>
);
