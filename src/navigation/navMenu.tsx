import { Archive, Home } from "@mui/icons-material";
import { ReactNode } from "react";
import ContentPage from "../pages/content/content";

export type NavMenuItem = {
  path: string;
  icon: ReactNode;
  label: string;
  importPath?: string;
  staticComponent?: ReactNode;
  separator?: boolean;
};

export type NavItem = NavMenuItem;
const getNavMenu = async (): Promise<NavItem[]> => {
  return [
    {
      icon: <Home />,
      path: "/",
      label: "Home",
    },
    {
      icon: <Archive />,
      path: "/content",
      label: "Content",
      staticComponent: <ContentPage />,
    },
  ];
};

export default getNavMenu;
