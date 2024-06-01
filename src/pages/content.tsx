import PageContainer from "../components/PageContainer/PageContainer";
import ContentCard, {
  ContentCardProps,
} from "../components/Content/ContentCard/ContentCard";
import dayjs from "dayjs";
import { Button, Stack, TextField } from "@mui/material";
import DateLine from "../components/DateLine/DateLine";
import { Add } from "@mui/icons-material";
import ContentUploadDialog from "../components/Content/ContentUploadDialog/ContentUploadDialog";
import { useState } from "react";
import DynamicGridContainer from "../components/DynamicGrid/DynamicGridContainer";

const sampleContent: ContentCardProps[] = [
  {
    createdAt: dayjs(),
    itemID: "12345",
    itemType: "Type",
    title: "Hello World",
    updatedAt: dayjs(),
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(20),
    size: "PORTRAIT",
    // imageSrc: "https://via.placeholder.com/150",
    scheduleDate: dayjs(),
  },
  {
    createdAt: dayjs(),
    itemID: "12345",
    itemType: "Type",
    title: "Hello World",
    updatedAt: dayjs(),
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(20),
    size: "SQUARE",
    // imageSrc: "https://via.placeholder.com/150",
    scheduleDate: dayjs(),
  },
  {
    createdAt: dayjs(),
    itemID: "12345",
    itemType: "Type",
    title: "Hello World",
    updatedAt: dayjs(),
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(20),
    size: "SQUARE",
    // imageSrc: "https://via.placeholder.com/150",
    scheduleDate: dayjs(),
  },
  {
    createdAt: dayjs(),
    itemID: "12345",
    itemType: "Type",
    title: "Hello World",
    updatedAt: dayjs(),
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(20),
    size: "LANDSCAPE",
    // imageSrc: "https://via.placeholder.com/150",
    scheduleDate: dayjs(),
  },
  {
    createdAt: dayjs(),
    itemID: "12345",
    itemType: "Type",
    title: "Hello World",
    updatedAt: dayjs(),
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(20),
    size: "LANDSCAPE",
    // imageSrc: "https://via.placeholder.com/150",
    scheduleDate: dayjs(),
  },
  {
    createdAt: dayjs(),
    itemID: "12345",
    itemType: "Type",
    title: "Hello World",
    updatedAt: dayjs(),
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(20),
    size: "SQUARE",
    // imageSrc: "https://via.placeholder.com/150",
    scheduleDate: dayjs(),
  },
  {
    createdAt: dayjs(),
    itemID: "12345",
    itemType: "Type",
    title: "Hello World",
    updatedAt: dayjs(),
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(20),
    size: "SQUARE",
    // imageSrc: "https://via.placeholder.com/150",
    scheduleDate: dayjs(),
  },
  {
    createdAt: dayjs(),
    itemID: "12345",
    itemType: "Type",
    title: "Hello World",
    updatedAt: dayjs(),
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(20),
    size: "LANDSCAPE",
    // imageSrc: "https://via.placeholder.com/150",
    scheduleDate: dayjs(),
  },
  {
    createdAt: dayjs(),
    itemID: "12345",
    itemType: "Type",
    title: "Hello World",
    updatedAt: dayjs(),
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(20),
    size: "SQUARE",
    // imageSrc: "https://via.placeholder.com/150",
    scheduleDate: dayjs(),
  },
  {
    createdAt: dayjs(),
    itemID: "12345",
    itemType: "Type",
    title: "Hello World",
    updatedAt: dayjs(),
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(20),
    size: "SQUARE",
    // imageSrc: "https://via.placeholder.com/150",
    scheduleDate: dayjs(),
  },
];

const ContentPage = () => {
  const [contentUploadDialogOpen, setContentUploadDialogOpen] = useState(false);
  const [components] = useState<ContentCardProps[]>(sampleContent);

  return (
    <PageContainer title="Content">
      <Stack
        spacing={6}
        sx={{
          pb: 6,
        }}
      >
        <Stack direction="row" spacing={4}>
          <TextField
            label="Search Content"
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              maxWidth: "300px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => {
              setContentUploadDialogOpen(true);
            }}
          >
            Upload
          </Button>
        </Stack>
        <DateLine date="May 2024" />

        <DynamicGridContainer Component={ContentCard} propList={components} />
      </Stack>
      <ContentUploadDialog
        open={contentUploadDialogOpen}
        setOpen={setContentUploadDialogOpen}
      />
    </PageContainer>
  );
};

export default ContentPage;
