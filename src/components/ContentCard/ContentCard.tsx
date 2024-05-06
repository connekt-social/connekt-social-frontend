import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC, useMemo } from "react";

type Props = {
  imageSrc?: string;
  title: string;
  description?: string;
  updatedAt: string | Date | Dayjs;
  createdAt: string | Date | Dayjs;
  scheduleDate?: string | Date | Dayjs;
  itemID: string;
  itemType: string;
  size?: "small" | "large";
};

const ContentCard: FC<Props> = ({
  imageSrc,
  title,
  updatedAt,
  createdAt,
  scheduleDate,
  description,
  itemType,
  size,
}) => {
  const lgSize = useMemo(() => {
    switch (size) {
      case "large":
        return 6;
      case "small":
        return 3;
      default:
        return 6;
    }
  }, [size]);
  return (
    <Grid item xs={12} md={6} lg={lgSize}>
      <Card
        component={Stack}
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
          width: "100%",
          height: imageSrc ? "50vh" : "25vh",
          textDecoration: "none",
        }}
        // href="#"
      >
        <CardActionArea LinkComponent={"a"} href="#" sx={{ height: "100%" }}>
          <Stack
            sx={{
              height: "100%",
            }}
          >
            {imageSrc && (
              <Box
                component={"img"}
                src={imageSrc}
                alt="content"
                sx={{
                  width: "100%",
                  // aspectRatio: size === "large" ? "2/1" : "1/2",

                  objectFit: "cover",
                  height: "100%",
                }}
              />
            )}
            <CardContent
              sx={{
                height: "100%",
              }}
            >
              <Stack
                spacing={size === "large" ? 2 : 0}
                sx={{
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="h6" color="text.primary">
                    {title}
                  </Typography>
                  {(size === "large" || !imageSrc) && (
                    <Typography color="text.secondary">
                      {description}
                    </Typography>
                  )}
                </Stack>
                <Stack
                  direction={
                    size === "large"
                      ? {
                          xs: "column",
                          sm: "row",
                        }
                      : "column"
                  }
                  sx={
                    size === "large"
                      ? {
                          justifyContent: {
                            xs: "start",
                            sm: "space-between",
                          },
                          alignItems: {
                            xs: "start",
                            sm: "center",
                          },
                        }
                      : undefined
                  }
                  spacing={size === "large" ? 2 : 0}
                >
                  <Stack
                    direction={size === "large" ? "row" : "column"}
                    spacing={2}
                  >
                    <Chip
                      label={itemType}
                      color="info"
                      variant="outlined"
                      size="small"
                      sx={{ width: "fit-content" }}
                    />
                    {scheduleDate && (
                      <Chip
                        label={
                          "Scheduled for " +
                          dayjs(scheduleDate).format("YYYY/MM/DD")
                        }
                        size="small"
                        sx={{ width: "fit-content" }}
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Last Modified: {dayjs(updatedAt).format("YYYY/MM/DD")}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Uploaded on: {dayjs(createdAt).format("YYYY/MM/DD")}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Stack>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ContentCard;
