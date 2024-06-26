import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC, useMemo } from "react";
import { DynamicGridSizes } from "../../../utils/gridPlacementFunction";

export type ContentCardProps = {
  imageSrc?: string;
  title: string;
  description?: string;
  updatedAt: string | Date | Dayjs;
  createdAt: string | Date | Dayjs;
  scheduleDate?: string | Date | Dayjs;
  itemID: number;
  itemType: string;
  size: DynamicGridSizes;
  sx?: SxProps;
  offsetX?: number;
  offsetY?: number;
};

const ContentCard: FC<ContentCardProps> = ({
  imageSrc,
  title,
  updatedAt,
  // createdAt,
  scheduleDate,
  description,
  itemType,
  size = "SQUARE",
  sx,
  itemID,
}) => {
  const aspectRatio: SxProps = useMemo(() => {
    switch (size) {
      case "PORTRAIT":
        return {
          // width: "33.33%",
          // aspectRatio: "1/2",
          gridColumn: "span 1",
          gridRow: "span 2",
        };
      case "LANDSCAPE":
        return {
          // width: "66.66%",
          // aspectRatio: "2/1",
          gridColumn: "span 2",
          gridRow: "span 1",
        };

      case "SQUARE":
      default:
        return {
          // width: "33.33",
          // aspectRatio: "1/1",
          gridColumn: "span 1",
          gridRow: "span 1",
        };
    }
  }, [size]);
  return (
    <Box
      sx={{
        // p: 2,
        ...aspectRatio,
        ...sx,
      }}
    >
      <Card
        component={Stack}
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
          width: "100%",
          height: "100%",
          textDecoration: "none",
        }}
        // href="#"
      >
        <CardActionArea
          LinkComponent={"a"}
          href={`/content/${itemID}`}
          sx={{ height: "100%", position: "relative", width: "100%" }}
        >
          <Stack
            sx={{ width: "100%", height: "100%" }}
            flexDirection={"column-reverse"}
          >
            {/* The position of the title and description will change depending on if there is an 
            image or not  */}
            {/* Metadata and title and description */}
            <Stack
              sx={{
                p: 4,

                bottom: 0,
                width: "100%",
                ...(imageSrc
                  ? {
                      bgcolor: "background.paper",
                      height: "fit-content",
                      borderTopLeftRadius: (theme) => theme.shape.borderRadius,
                      borderTopRightRadius: (theme) => theme.shape.borderRadius,
                    }
                  : {
                      position: "absolute",
                      pt: 8,
                      background: (theme) =>
                        `linear-gradient(transparent, ${theme.palette.background.paper} 20%)`,
                    }),
              }}
              spacing={2}
            >
              {imageSrc && (
                <Stack spacing={1}>
                  <Typography variant="h6" color="text.primary">
                    {title}
                  </Typography>
                  {(size === "LANDSCAPE" || !imageSrc || true) && (
                    <Typography
                      color="text.secondary"
                      sx={{
                        textWrap: "wrap",
                        width: "100%",
                        textOverflow: "ellipsis",
                        wordBreak: "break-word",
                      }}
                      variant="caption"
                    >
                      {description}
                    </Typography>
                  )}
                </Stack>
              )}
              <Stack
                spacing={2}
                direction={{
                  xs: "column",
                  md: "row",
                }}
                sx={{
                  justifyContent: {
                    xs: "flex-start",
                    md: "space-between",
                  },
                  alignItems: {
                    xs: "flex-start",
                    md: "center",
                  },
                }}
              >
                <Stack
                  direction={{
                    xs: "column",
                    md: "row",
                  }}
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
                  {/* <Typography variant="caption" color="text.secondary">
                Uploaded on: {dayjs(createdAt).format("YYYY/MM/DD")}
              </Typography> */}
                </Stack>
              </Stack>
            </Stack>

            {/* Image title and description */}
            <Stack
              sx={{
                flexGrow: 1,
                height: "100%",
              }}
            >
              {imageSrc ? (
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
              ) : (
                <CardContent
                  sx={{
                    height: "100%",
                  }}
                >
                  <Stack
                    spacing={2}
                    sx={{
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="h6" color="text.primary">
                        {title}
                      </Typography>
                      {(size === "LANDSCAPE" || !imageSrc) && (
                        <Typography
                          color="text.secondary"
                          sx={{
                            textWrap: "wrap",
                            width: "100%",
                            textOverflow: "ellipsis",
                            wordBreak: "break-word",
                          }}
                        >
                          {description}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </CardContent>
              )}
            </Stack>
          </Stack>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default ContentCard;
