import { createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/NotFound";

import { PATH } from "../constants/path";
import Test from "../pages/Test";

import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";

import { checkNotLoggedIn, checkLoggedIn } from "../loaders/authentications";
import AuthLayout from "./../layouts/AuthLayout/index";
import ProductList from "./../pages/Product/ProductList/index";
import ProductDetail from "../pages/Product/ProductDetail";
import ProductEdit from "../pages/Product/ProductEdit";
import ProductCreate from "./../pages/Product/ProductCreate/index";

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
        path: PATH.PRODUCT,
        children: [
          {
            path: PATH.PRODUCT_LIST,
            element: <ProductList />,
            loader: checkNotLoggedIn,
          },
          {
            path: PATH.PRODUCT_DETAIL,
            element: <ProductDetail />,
            loader: checkNotLoggedIn,
          },
          {
            path: PATH.PRODUCT_EDIT,
            element: <ProductEdit />,
            loader: checkNotLoggedIn,
          },
          {
            path: PATH.PRODUCT_CREATE,
            element: <ProductCreate />,
            loader: checkNotLoggedIn,
          },
        ],
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
