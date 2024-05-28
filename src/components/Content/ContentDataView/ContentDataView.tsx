import { Stack, SxProps, Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  typographyProps?: TypographyProps;
  sx?: SxProps;
};
const ContentDataView: FC<Props> = ({ data, typographyProps, sx }) => {
  return (
    <Stack sx={sx}>
      {Object.keys(data).map((key) => {
        switch (typeof data[key]) {
          case "object":
            return <ContentDataView data={data[key]} />;
          case "string":
          default:
            return (
              <Typography key={key} {...typographyProps}>
                <strong>{key}</strong>: {data[key]}
              </Typography>
            );
        }
      })}
    </Stack>
  );
};
export default ContentDataView;
