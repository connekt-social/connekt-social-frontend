import { Stack, Theme, useMediaQuery } from "@mui/material";
import { FC } from "react";
import SideNav from "../../components/SideNav/SideNav";
import { Outlet } from "react-router-dom";

const DashboardLayout: FC = () => {
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {!isSm && <SideNav />}
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default DashboardLayout;
