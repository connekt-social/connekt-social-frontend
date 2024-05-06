import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export type SnackbarValues = {
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

const CoolSnackbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<SnackbarValues>({
    severity: "success",
    message: "message",
  });

  useEffect(() => {
    window.addEventListener("toast", ((e: CustomEvent<SnackbarValues>) => {
      setOpen(true);
      setValues(e.detail);
    }) as EventListener);
  }, []);

  return (
    <Snackbar
      sx={{
        width: "fit-content",
      }}
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={5000}
    >
      <Alert severity={values.severity}>{values.message}</Alert>
    </Snackbar>
  );
};
export default CoolSnackbar;
