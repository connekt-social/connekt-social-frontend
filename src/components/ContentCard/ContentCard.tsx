import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";

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
  return (
    <Card
      component={Stack}
      sx={{
        bgcolor: (theme) => theme.palette.background.paper,
        width: "100%",
        textDecoration: "none",
      }}
      // href="#"
    >
      <CardActionArea
        LinkComponent={"a"}
        href="#"
        sx={{ height: "100%", position: "relative", maxHeight: "50vh" }}
      >
        {/* Metadata */}
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          sx={{
            p: 4,
            pt: 8,
            position: "absolute",
            justifyContent: {
              xs: "flex-start",
              md: "space-between",
            },
            alignItems: {
              xs: "flex-start",
              md: "center",
            },
            bottom: 0,
            width: "100%",
            background: (theme) =>
              `linear-gradient(transparent, ${theme.palette.background.paper} 20%)`,
          }}
          spacing={2}
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
                  "Scheduled for " + dayjs(scheduleDate).format("YYYY/MM/DD")
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

        {/* Image title and description */}
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
                {(size === "large" || !imageSrc) && (
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
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default ContentCard;
