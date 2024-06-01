import { Close } from "@mui/icons-material";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Fade,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ContentTypeSelector from "../ContentTypeSelector/ContentTypeSelector";
import {
  ContentType,
  getContentTypes,
} from "../../../api/content/getContentTypes";
import ContentUploadForm from "../ContentUploadForm/ContentUploadForm";
import ContentDataView from "../ContentDataView/ContentDataView";
import { uploadContentItem } from "../../../api/content/uploadContentItem";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const ContentUploadDialog: FC<Props> = ({ open, setOpen }) => {
  const [contentType, setContentType] = useState<ContentType | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getContentTypes().then(setContentTypes).catch(console.error);
  }, []);

  const handleUpload = async () => {
    if (!contentType) return;
    setUploading(true);
    try {
      await uploadContentItem({
        contentTypeId: contentType?.id,
        data: formData,
      });
    } catch (error) {
      console.error(error);
    }
    setUploading(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
      <Stack
        spacing={4}
        sx={{
          alignItems: "center",
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography
              sx={{
                ml: 2,
                flex: 1,
                color: (theme) => theme.palette.primary.contrastText,
              }}
              variant="h6"
              component="div"
            >
              Upload Content
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stepper activeStep={activeStep}>
              <Step>
                <StepLabel>Choose content type</StepLabel>
              </Step>
              <Step>
                <StepLabel>Enter details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Review and Submit</StepLabel>
              </Step>
            </Stepper>
            {activeStep === 0 && (
              <Fade in>
                <Stack spacing={4}>
                  <Typography variant="h6">Choose content type</Typography>
                  <ContentTypeSelector
                    contentTypes={contentTypes}
                    onContentTypeSelect={(contentType) => {
                      console.log("onContentTypeSelect");
                      setActiveStep((prevActiveStep) => prevActiveStep + 1);
                      setContentType(contentType);
                    }}
                  />
                </Stack>
              </Fade>
            )}
            {activeStep === 1 && (
              <Fade in>
                <Stack spacing={4}>
                  <Typography variant="h6">Enter Details</Typography>
                  {contentType ? (
                    contentType.schema ? (
                      <ContentUploadForm
                        schema={contentType?.schema}
                        uiSchema={contentType?.uiSchema}
                        onSubmit={(data) => {
                          console.log("contentUploadForm submitted", data);
                          setFormData(data.formData);
                          setActiveStep((prevActiveStep) => prevActiveStep + 1);
                        }}
                      />
                    ) : (
                      <Typography variant="body1">
                        Content type is currently unsupported
                      </Typography>
                    )
                  ) : (
                    <Typography variant="body1">
                      Please select a content type
                    </Typography>
                  )}
                </Stack>
              </Fade>
            )}
            {activeStep === 2 && (
              <Fade in>
                <Stack spacing={4}>
                  <Typography variant="h6">Review and Submit</Typography>
                  <ContentDataView data={formData} />
                  <Button
                    onClick={() => {
                      handleUpload();
                    }}
                    sx={{
                      width: "fit-content",
                    }}
                    variant="contained"
                    disabled={uploading}
                    startIcon={uploading && <CircularProgress size={16} />}
                  >
                    Submit
                  </Button>
                </Stack>
              </Fade>
            )}
            {activeStep > 0 && (
              <Button
                onClick={() => {
                  setActiveStep((prevActiveStep) => prevActiveStep - 1);
                }}
                sx={{
                  width: "fit-content",
                }}
                size="small"
                variant="outlined"
              >
                Back
              </Button>
            )}
          </Stack>
        </Container>
      </Stack>
    </Dialog>
  );
};

export default ContentUploadDialog;
