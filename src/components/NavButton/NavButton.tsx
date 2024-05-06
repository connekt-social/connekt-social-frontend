import { Box, Stack, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  iconSrc?: string;
  selected?: boolean;
  href?: string;
  title?: string;
};
const NavButton: FC<Props> = ({ icon, iconSrc, selected, href, title }) => {
  return (
    <Stack
      component={"a"}
      direction={"row"}
      sx={{
        bgcolor: selected ? "primary.light" : "transparent",
        width: "100%",
        // boxShadow: selected ? 1 : 0,
        p: 2,
        "&:hover": {
          bgcolor: (theme) => theme.palette.primary.light + "77",
          boxShadow: 2,
        },
        "&:active": {
          bgcolor: (theme) => theme.palette.primary.main + "44",
          boxShadow: 3,
        },
        borderRadius: 1,
        textDecoration: "none",
        transition: "all 0.2s ease-in-out",
        userSelect: "none",
        color: (theme) => theme.palette.text.primary,
      }}
      href={href}
      spacing={2}
    >
      {iconSrc ? <Box component={"img"} src={iconSrc} alt="icon" /> : icon}
      <Typography fontWeight={500}>{title}</Typography>
    </Stack>
  );
};

export default NavButton;
