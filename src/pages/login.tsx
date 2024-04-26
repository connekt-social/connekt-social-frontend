import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import loginBackground from "../assets/images/loginBackground.svg";
import loginImage from "../assets/images/loginImage.svg";
import Image from "../components/Image";
import { Button } from "../components/Button";

const LoginPage = () => {
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
      <Card sx={{ minHeight: "50vh", minWidth: "60vw" }}>
        <Stack
          direction={"row"}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Stack
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
              p: 4,
              "& > *": {
                width: "100%",
                maxWidth: "400px",
              },
            }}
            spacing={4}
          >
            <Typography variant="h4">Login</Typography>
            <TextField label="Email" variant="filled" type="email" />
            <TextField label="Password" variant="filled" type="password" />
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
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
              sx={{ width: "100%" }}
              size="large"
            >
              Login
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
