import { Close } from "@mui/icons-material";
import {
  AppBar,
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
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const ContentUploadDialog: FC<Props> = ({ open, setOpen }) => {
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
            <Stepper>
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
            <Fade in>
              <Typography variant="h6">Choose content type</Typography>
            </Fade>
          </Stack>
        </Container>
      </Stack>
    </Dialog>
  );
};

export default ContentUploadDialog;
