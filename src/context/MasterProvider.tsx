import { FC } from "react";
import { Settings, SettingsProvider } from "./SettingsContext";
import ThemeComponent from "../theme/ThemeComponent";
import CoolSnackbar from "../components/CoolSnackbar/CoolSnackbar";
import NavProvider from "./NavContext";
import ConfirmDialog from "../components/ConfirmDialog/ConfirmDialog";

type Props = {
  children: React.ReactNode;

  //This is for getting the theme from other sources eg story book
  settings?: Settings;
};
const MasterProvider: FC<Props> = ({ children, settings }) => {
  return (
    <SettingsProvider settings={settings}>
      <NavProvider>
        <ThemeComponent>
          {children}
          <CoolSnackbar />
          <ConfirmDialog />
        </ThemeComponent>
      </NavProvider>
    </SettingsProvider>
  );
};

export default MasterProvider;
