import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Flex } from "@chakra-ui/react";
import { HomePage } from "./pages/HomePage";
import { AccountPage } from "./pages/AccountPage";
import { MissionsPage } from "./pages/MissionsPage";
import { TrainingPage } from "./pages/TrainingPage";

export const paths = {
  home: "/home",
  missions: "/missions",
  training: "/training",
  account: "/account",
};

export const RootPage: React.FC = () => (
  <Flex direction="column" height="100vh" width="100vw">
    <Navbar />
    <Routes>
      <Route path={paths.home} element={<HomePage />} />
      <Route path={paths.missions} element={<MissionsPage />} />
      <Route path={paths.training} element={<TrainingPage />} />
      <Route path={paths.account} element={<AccountPage />} />
    </Routes>
  </Flex>
);
