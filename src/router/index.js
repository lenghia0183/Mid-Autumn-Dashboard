import { createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/NotFound";

import { PATH } from "../constants/path";
import Test from "../pages/Test";

import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";

import AuthLayout from "../layouts/AuthLayout";

import { checkNotLoggedIn, checkLoggedIn } from "../loaders/authentications";
import Home from "../pages/Home";

const router = createBrowserRouter([
  // main layout
  {
    path: "/",
    element: <MainLayout />,
    // loader: checkNotLoggedIn,
    children: [
      {
        path: PATH.TEST,
        element: <Test />,
      },
      {
        path: PATH.HOME,
        element: <Home />,
      },
    ],
  },

  // auth layout
  {
    path: PATH.AUTH,
    element: <AuthLayout />,
    children: [
      {
        path: PATH.LOGIN,
        element: <Login />,
        loader: checkLoggedIn,
      },
    ],
  },

  // not found
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
