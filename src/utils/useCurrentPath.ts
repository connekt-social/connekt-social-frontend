import { useContext } from "react";
import { matchRoutes, useLocation } from "react-router-dom";
import { NavContext } from "../context/NavContext";

const useCurrentPath = () => {
  const location = useLocation();

  const { routes } = useContext(NavContext);
  const result = matchRoutes(
    [
      {
        path: "/",
        children: routes,
      },
    ],
    location
  );

  console.log("current path result", result);

  return result?.[result?.length - 1]?.route.path;
};

export default useCurrentPath;
