import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import ThemeConstants from "../../theme/constants";

type Props = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
};
const PageContainer: FC<Props> = ({ title, children }) => {
  return (
    <Stack
      sx={{
        height: "100%",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          height: `${ThemeConstants.topNavHeight}px`,
          p: 8,
        }}
      >
        <Typography variant="h3">{title}</Typography>
      </Stack>
      <Stack
        sx={{
          px: 8,
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default PageContainer;
