import PageContainer from "../../components/PageContainer/PageContainer";
import ContentCard from "../../components/Content/ContentCard/ContentCard";
import dayjs from "dayjs";
import { Button, Grid, Stack, TextField } from "@mui/material";
import DateLine from "../../components/DateLine/DateLine";
import { Add } from "@mui/icons-material";
import ContentUploadDialog from "../../components/Content/ContentUploadDialog/ContentUploadDialog";
import { useState } from "react";

const ContentPage = () => {
  const [contentUploadDialogOpen, setContentUploadDialogOpen] = useState(false);

  return (
    <PageContainer title="Content">
      <Grid container spacing={6}>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <DateLine date="May 2024" />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <ContentCard
            createdAt={dayjs()}
            itemID="12345"
            itemType="Type"
            title="Hello World"
            updatedAt={dayjs()}
            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(
              20
            )}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <ContentCard
            createdAt={dayjs()}
            itemID="12345"
            itemType="Type"
            title="Hello World"
            updatedAt={dayjs()}
            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(
              20
            )}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <ContentCard
            createdAt={dayjs()}
            itemID="12345"
            itemType="Type"
            title="Hello World"
            updatedAt={dayjs()}
            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(
              20
            )}
            size="small"
          />
        </Grid>
      </Grid>
      <ContentUploadDialog
        open={contentUploadDialogOpen}
        setOpen={setContentUploadDialogOpen}
      />
    </PageContainer>
  );
};

export default ContentPage;
