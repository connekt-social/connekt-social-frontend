import { useRoutes } from "react-router-dom";
import DashboardLayout from "./dashboard/layout";
import LoginPage from "./login";
import { useContext } from "react";
import { NavContext } from "../context/NavContext";
import PluginPage from "./plugins/pluginPage";

const AppRouter = () => {
  const { routes } = useContext(NavContext);
  const Element = useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        //Routes that are visible in the sidebar
        ...routes,

        //Routes that are not visible in the sidebar
        {
          path: "/plugins/:id",
          element: <PluginPage />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);

  return Element;
};

export default AppRouter;
