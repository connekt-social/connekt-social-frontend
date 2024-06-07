import PageContainer from "../../components/PageContainer/PageContainer";
import ContentCard, {
  ContentCardProps,
} from "../../components/Content/ContentCard/ContentCard";
import { Button, Stack, TextField } from "@mui/material";
import DateLine from "../../components/DateLine/DateLine";
import { Add } from "@mui/icons-material";
import ContentUploadDialog from "../../components/Content/ContentUploadDialog/ContentUploadDialog";
import { Fragment, useEffect, useState } from "react";
import DynamicGridContainer from "../../components/DynamicGrid/DynamicGridContainer";
import { getContentItems } from "../../api/content/getContentItems";
import { DynamicGridSizes } from "../../utils/gridPlacementFunction";
import dayjs from "dayjs";

type GroupedContentCards = {
  title: string;
  components: ContentCardProps[];
};

const ContentPage = () => {
  const [contentUploadDialogOpen, setContentUploadDialogOpen] = useState(false);

  const [groupedItems, setGroupedItems] = useState<GroupedContentCards[]>([]);

  useEffect(() => {
    getContentItems().then((contentItems) => {
      setGroupedItems(
        contentItems.reduce((prev, curr) => {
          const component: ContentCardProps = {
            createdAt: curr.createdAt,
            itemID: curr.id,
            itemType: curr.contentFormatCode,
            size: curr.size as DynamicGridSizes,
            title: curr.title,
            updatedAt: curr.updatedAt,
            description: curr.caption,
            imageSrc: curr.thumbnail,
          };
          const group = prev.find(
            (group) => group.title === dayjs(curr.updatedAt).format("MMMM YYYY")
          );
          if (group) {
            group.components.push(component);
          } else {
            prev.push({
              title: dayjs(curr.updatedAt).format("MMMM YYYY"),
              components: [component],
            });
          }
          return prev;
        }, [] as GroupedContentCards[])
      );
    });
  }, []);

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

        {groupedItems.map(({ components, title }) => (
          <Fragment key={`group-${title}`}>
            <DateLine date={title} />

            <DynamicGridContainer
              Component={ContentCard}
              propList={components}
            />
          </Fragment>
        ))}
      </Stack>
      <ContentUploadDialog
        open={contentUploadDialogOpen}
        setOpen={setContentUploadDialogOpen}
      />
    </PageContainer>
  );
};

export default ContentPage;
