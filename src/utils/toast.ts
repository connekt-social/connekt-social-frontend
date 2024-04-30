import { SnackbarValues } from "../components/CoolSnackbar";

export const toast = (values: SnackbarValues) => {
  const event = new CustomEvent("toast", { detail: values });
  window.dispatchEvent(event);
};
