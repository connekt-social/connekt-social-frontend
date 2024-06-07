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
import ContentFormatSelector from "../ContentTypeSelector/ContentTypeSelector";

import ContentUploadForm from "../ContentUploadForm/ContentUploadForm";
import ContentDataView from "../ContentDataView/ContentDataView";
import { uploadContentItem } from "../../../api/content/uploadContentItem";
import { toast } from "../../../utils/toast";
import {
  ContentFormat,
  getContentFormats,
} from "../../../api/content/getContentFormats";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const ContentUploadDialog: FC<Props> = ({ open, setOpen }) => {
  const [contentFormat, setContentFormat] = useState<ContentFormat | null>(
    null
  );
  const [activeStep, setActiveStep] = useState(0);
  const [contentFormats, setContentFormats] = useState<ContentFormat[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getContentFormats().then(setContentFormats).catch(console.error);
  }, []);

  const handleUpload = async () => {
    if (!contentFormat) return;
    setUploading(true);
    try {
      await uploadContentItem({
        contentFormatCode: contentFormat?.code,
        data: formData,
      });
      toast({
        message: "Content uploaded successfully",
        severity: "success",
      });

      setOpen(false);
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
                <StepLabel>Choose content format</StepLabel>
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
                  <Typography variant="h6">Choose content format</Typography>
                  <ContentFormatSelector
                    contentFormats={contentFormats}
                    onContentFormatSelect={(contentType) => {
                      console.log("onContentTypeSelect");
                      setActiveStep((prevActiveStep) => prevActiveStep + 1);
                      setContentFormat(contentType);
                    }}
                  />
                </Stack>
              </Fade>
            )}
            {activeStep === 1 && (
              <Fade in>
                <Stack spacing={4}>
                  <Typography variant="h6">Enter Details</Typography>
                  {contentFormat ? (
                    contentFormat.schema ? (
                      <ContentUploadForm
                        schema={contentFormat?.schema}
                        uiSchema={contentFormat?.uiSchema}
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
