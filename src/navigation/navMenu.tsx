import { Archive, Extension, Home } from "@mui/icons-material";
import { ReactNode } from "react";
import ContentPage from "../pages/content";
import PluginsPage from "../pages/plugins";
import HomePage from "../pages/home";

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
      staticComponent: <HomePage />,
    },
    {
      icon: <Archive />,
      path: "/content",
      label: "Content",
      staticComponent: <ContentPage />,
    },
    {
      icon: <Extension />,
      path: "/plugins",
      label: "Plugins",
      staticComponent: <PluginsPage />,
    },
  ];
};

export default getNavMenu;
