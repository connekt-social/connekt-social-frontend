import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  Suspense,
  createContext,
  lazy,
  useEffect,
  useState,
} from "react";
import getNavMenu, { NavItem } from "../navigation/navMenu";
import { RouteObject } from "react-router-dom";

export type NavContextType = {
  navMenu: NavItem[];
  setNavMenu: Dispatch<SetStateAction<NavItem[]>>;
  routes: RouteObject[];
  setRoutes: Dispatch<SetStateAction<RouteObject[]>>;
};
export const NavContext = createContext<NavContextType>({
  navMenu: [],
  setNavMenu: () => {},
  routes: [],
  setRoutes: () => {},
});

type Props = {
  children?: ReactNode[] | ReactNode;
};

const NavProvider: FC<Props> = ({ children }) => {
  const [navMenu, setNavMenu] = useState<NavItem[]>([]);
  const [routes, setRoutes] = useState<RouteObject[]>([]);

  useEffect(() => {
    getNavMenu().then((menu) => {
      setNavMenu(menu);
      setRoutes(
        menu
          .filter(
            (item) =>
              !item.separator && (item.importPath || item.staticComponent)
          )
          .map((item) => ({
            path: item.path,
            element: item.importPath ? (
              <Suspense fallback={<>...</>}>
                {lazy(() => import(item.importPath!))({})}
              </Suspense>
            ) : (
              item.staticComponent
            ),
          }))
      );
    });
  }, []);
  return (
    <NavContext.Provider
      value={{
        navMenu,
        setNavMenu,
        routes,
        setRoutes,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export default NavProvider;
