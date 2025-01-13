import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Register({ saveUsers }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.username || !user.password || !user.email) {
      setError("All fields are required!");
      return;
    }

    // Check if username already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.username === user.username)) {
      setError("Username already exists!");
      return;
    }

    // Save the new user
    users.push({ ...user, blocked: false });
    saveUsers(users);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {/* Username */}
          <Input
            label="Username"
            size="lg"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
          {/* Email */}
          <Input
            label="Email"
            size="lg"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          {/* Password */}
          <Input
            label="Password"
            size="lg"
            name="password"
            type="password"
            value={user.password}
            onChange={handleInputChange}
          />
          {error && (
            <Typography color="red" className="text-center mt-2">
              {error}
            </Typography>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleSubmit}>
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Typography
              as="a"
              href="#login"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Login
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
