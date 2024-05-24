import { Close } from "@mui/icons-material";
import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const ContentUploadDialog: FC<Props> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
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
      <Typography>sss</Typography>
    </Dialog>
  );
};

export default ContentUploadDialog;
