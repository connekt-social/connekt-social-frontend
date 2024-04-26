import { FC } from "react";
import { SettingsProvider } from "./SettingsContext";
import ThemeComponent from "../theme/ThemeComponent";

type Props = {
  children: React.ReactNode;
};
const MasterProvider: FC<Props> = ({ children }) => {
  return (
    <SettingsProvider>
      <ThemeComponent>{children}</ThemeComponent>
    </SettingsProvider>
  );
};

export default MasterProvider;
