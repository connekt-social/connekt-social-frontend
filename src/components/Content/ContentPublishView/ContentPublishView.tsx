import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { confirmAction } from "../../../utils/confirm";
import { publishContentItem } from "../../../api/content/publishContentItem";
import {
  ContentType,
  getContentTypes,
} from "../../../api/content/getContentTypes";
import { ContentItem } from "../../../api/content/getContentItems";
import getErrorMessage from "../../../utils/getErrorMessage";
import { toast } from "../../../utils/toast";

type Props = {
  contentItem: ContentItem;
};
const ContentPublishView: FC<Props> = ({ contentItem }) => {
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getContentTypes(contentItem.contentFormatCode).then(setContentTypes);
  }, [contentItem]);

  const handlePublish = (contentTypes: number[]) => {
    confirmAction({
      action: async () => {
        setLoading(true);
        setDialogOpen(true);
        publishContentItem({
          contentTypes,
          itemId: contentItem.id,
        })
          .then(() => {
            setResult("Item published successfully");
            toast({
              message: "Item published successfully",
              severity: "success",
            });
          })
          .catch((error) => {
            setResult(getErrorMessage(error, "Failed to publish item"));
          })
          .finally(() => {
            setLoading(false);
          });
      },
      confirmationText: (
        <Typography variant="body1" component={"span"}>
          Are you sure you want to publish?
        </Typography>
      ),
      headerText: "Publish",
    });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 6,
      }}
    >
      <Stack spacing={3}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Publish</Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handlePublish(contentTypes.map(({ id }) => id));
            }}
          >
            Publish on all platforms
          </Button>
        </Stack>
        {contentTypes.map((contentType) => (
          <Card key={`consta-${contentType.id}`}>
            <CardActionArea
              onClick={() => {
                handlePublish([contentType.id]);
              }}
              disabled={loading}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Stack
                    direction={"row"}
                    sx={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack>
                      <Typography variant="h6">{contentType.name}</Typography>
                      <Typography>{contentType.description}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
      <Dialog
        open={dialogOpen}
        maxWidth="xs"
        fullWidth
        onClose={() => {
          if (!loading) {
            setDialogOpen(false);
          }
        }}
      >
        <DialogTitle>Publish {contentItem.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {loading ? (
              <>
                <CircularProgress size={16} /> Publishing...
              </>
            ) : (
              result
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={loading}
            onClick={() => {
              if (!loading) {
                setDialogOpen(false);
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContentPublishView;
