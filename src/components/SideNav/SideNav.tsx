import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext, useEffect } from "react";
import { NavContext } from "../../context/NavContext";
import NavButton from "../NavButton/NavButton";
import { NavMenuItem } from "../../navigation/navMenu";
import useCurrentPath from "../../utils/useCurrentPath";
import ThemeConstants from "../../theme/constants";

const SideNav: FC = () => {
  const { navMenu } = useContext(NavContext);

  const pathname = useCurrentPath();

  useEffect(() => {
    console.log("Current Path: ", pathname);
  }, [pathname]);

  return (
    <>
      {/* <Box
        sx={{
          width: "200px",
          height: "100vh",
        }}
      /> */}
      <Paper
        sx={{
          width: "200px",
          height: "100vh",
          borderRadius: 0,
          mr: 2,
          boxShadow: 3,
          overflow: "auto",
        }}
      >
        <Stack sx={{ px: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: `${ThemeConstants.topNavHeight}px`,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: (theme) => theme.palette.primary.main,
                position: "relative",
                width: "45px",
                height: "45px",
                borderRadius: "500px",
                alignSelf: "center",
              }}
            >
              <Typography color="white" variant="caption">
                LOGO
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ mt: 6 }}>
            {navMenu.map((item) => {
              if (item.separator) {
                return <Divider />;
              }
              const i = item as NavMenuItem;

              return (
                <NavButton
                  title={i.label}
                  href={i.path}
                  icon={i.icon}
                  key={"navItem" + i.label}
                  selected={pathname === i.path}
                />
              );
            })}
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};

export default SideNav;
