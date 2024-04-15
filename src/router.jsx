import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { LayoutMain } from "./layouts/LayoutMain";
import { LayoutError } from "./layouts/LayoutError";
import { LogIn } from "./pages/Log_in/LogIn";
import { MyProjects } from "./pages/My_Projects/MyProjects";
import { About } from "./pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    errorElement: <LayoutError />,
    children: [
      { index: true, element: <Home /> },
      { path: "/LogIn", element: <LogIn /> },
      { path: "/MyProjects", element: <MyProjects /> },
      { path: "/About", element: <About /> },
    ],
  },
]);
