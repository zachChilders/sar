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
import { apiUrl } from "services";
import { useNavigate } from "react-router-dom";
import { paths } from "RootPage";
import axios from "axios";

export const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = () => {
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    axios
      .post(`${apiUrl}/auth/register`, { email, password })
      .then((response) => {
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
      <Heading>Sign Up</Heading>
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
      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSignUp}>Sign Up</Button>
    </Box>
  );
};
