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
import CategoryList from "../pages/Category/CategoryList";
import CategoryDetail from "../pages/Category/CategoryDetail";
import CategoryEdit from "../pages/Category/CategoryEdit";
import CategoryCreate from "../pages/Category/CategoryCreate";

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
          // product
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
      {
        path: PATH.CATEGORY,
        children: [
          // category
          {
            path: PATH.CATEGORY_LIST,
            element: <CategoryList />,
            loader: checkNotLoggedIn,
          },
          {
            path: PATH.CATEGORY_DETAIL,
            element: <CategoryDetail />,
            loader: checkNotLoggedIn,
          },
          {
            path: PATH.CATEGORY_EDIT,
            element: <CategoryEdit />,
            loader: checkNotLoggedIn,
          },
          {
            path: PATH.CATEGORY_CREATE,
            element: <CategoryCreate />,
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
