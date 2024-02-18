import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { apiUrl, useAuthControllerSignInMutation } from "services";
import { useNavigate } from "react-router-dom";
import { paths } from "RootPage";
import axios from "axios";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post(`${apiUrl}/auth/login`, { email, password }).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("userProfile", JSON.stringify(response.data));
        navigate(paths.home);
      } else {
        setError("Invalid email or password");
      }
    });
  };

  return (
    <Box>
      <Heading>Login Page</Heading>
      {error && <Text color={"red"}>{error}</Text>}
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};
