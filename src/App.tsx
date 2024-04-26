import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterProvider from "./context/MasterProvider";
import LoginPage from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);
function App() {
  return (
    <MasterProvider>
      <RouterProvider router={router} />
    </MasterProvider>
  );
}

export default App;
