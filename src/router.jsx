import { createBrowserRouter } from "react-router-dom";
import { HomeFunc } from "./pages/Home/Home";
import { LayoutMain } from "./layouts/LayoutMain";
import { LayoutError } from "./layouts/LayoutError";
import { LogIn } from "./pages/Log_in/LogIn";
import { MyProjects } from "./pages/My_Projects/MyProjects";
import { About } from "./pages/About/About";
import { ProductFunc } from "./pages/Product/Product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    errorElement: <LayoutError />,
    children: [
      {
        index: true,
        ...HomeFunc,
      },

      { path: "/MyProjects", element: <MyProjects /> },
      { path: "/About", element: <About /> },
      {
        path: "/Product/:product_id",
        ...ProductFunc,
      },
    ],
  },
]);
