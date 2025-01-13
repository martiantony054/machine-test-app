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
import { Link } from "react-router-dom";
function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.username || !user.password) {
      setError("Both username and password are required!");
      return;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.username === user.username && u.password === user.password
    );

    if (foundUser) {
      // User found, navigate to user list
      navigate("/user-list"); // Adjust the route as per your app
    } else {
      setError("Invalid credentials, please try again.");
    }
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
            Sign In
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
          {/* Password */}
          <Input
            label="Password"
            size="lg"
            name="password"
            type="password"
            value={user.password}
            onChange={handleInputChange}
          />
          {/* Error Message */}
          {error && (
            <Typography color="red" className="text-center mt-2">
              {error}
            </Typography>
          )}
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleSubmit}>
            Sign In
          </Button>
          <Link to={'/register'}>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Typography>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
