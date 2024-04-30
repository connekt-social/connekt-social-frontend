import {
  Box,
  Card,
  Checkbox,
  CircularProgress,
  Collapse,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import loginBackground from "../../assets/images/loginBackground.svg";
import loginImage from "../../assets/images/loginImage.svg";
import Image from "../../components/Image";
import { Button } from "../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import { toast } from "../../utils/toast";

const LoginPage = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    try {
      if (isNewUser) {
        if (password !== confirmPassword) {
          toast({
            message: "Passwords do not match",
            severity: "error",
          });
          throw new Error("Passwords do not match");
        }
      }
      await apiClient.post(
        isNewUser ? "/auth/create/withEmail" : "/auth/login",
        {
          email,
          password,
          name,
        }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Image
        src={loginBackground}
        alt="background"
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
          objectFit: "cover",
        }}
      ></Image>
      <Card sx={{ minHeight: "60vh", minWidth: "60vw" }}>
        <Stack
          direction={"row"}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
              p: 4,
              "& > *": {
                width: "100%",
                maxWidth: "400px",
              },
              transition: "all 0.3s",
            }}
          >
            <Typography variant="h4" sx={{ mb: 4 }}>
              {isNewUser ? "Create a new account" : "Login"}
            </Typography>
            <Collapse in={isNewUser}>
              <TextField
                label="Name"
                variant="filled"
                sx={{ width: "100%", mb: 4 }}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Collapse>
            <TextField
              label="Email"
              variant="filled"
              type="email"
              sx={{ mb: 4 }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              sx={{ mb: 4 }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Collapse in={isNewUser}>
              <TextField
                label="Confirm Password"
                variant="filled"
                type="password"
                sx={{ width: "100%" }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </Collapse>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                mb: 4,
              }}
            >
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
              <Button>Forgot password?</Button>
            </Stack>
            <Button
              shadowHighlight={true}
              variant="contained"
              color="primary"
              sx={{ width: "100%", mb: 4 }}
              size="large"
              onClick={handleLogin}
              startIcon={loading && <CircularProgress size={16} />}
              disabled={loading}
            >
              {isNewUser ? "Create Account" : "Login"}
            </Button>
            <Button
              shadowHighlight={false}
              variant="containedLight"
              color="primary"
              sx={{ width: "100%", mb: 4 }}
              size="large"
              onClick={() => {
                setIsNewUser((prev) => !prev);
              }}
              disabled={loading}
            >
              {isNewUser
                ? "Log in with an existing account"
                : "Create a new Account"}
            </Button>
          </Stack>
          <Stack
            sx={{
              bgcolor: (theme) => theme.palette.primary.main,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "40%",
            }}
          >
            <Box
              component={Image}
              src={loginImage}
              alt="two-people"
              sx={{
                width: "90%",
              }}
            />
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default LoginPage;
