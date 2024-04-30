import { FC } from "react";
import { SettingsProvider } from "./SettingsContext";
import ThemeComponent from "../theme/ThemeComponent";
import CoolSnackbar from "../components/CoolSnackbar";

type Props = {
  children: React.ReactNode;
};
const MasterProvider: FC<Props> = ({ children }) => {
  return (
    <SettingsProvider>
      <ThemeComponent>
        {children}
        <CoolSnackbar />
      </ThemeComponent>
    </SettingsProvider>
  );
};

export default MasterProvider;
