import { useRoutes } from "react-router-dom";
import DashboardLayout from "./dashboard/layout";
import LoginPage from "./login";
import { useContext } from "react";
import { NavContext } from "../context/NavContext";

const AppRouter = () => {
  const { routes } = useContext(NavContext);
  const Element = useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: routes,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);

  return Element;
};

export default AppRouter;
