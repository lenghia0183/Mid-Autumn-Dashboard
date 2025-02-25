import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import { PATH } from "../constants/path";
import Test from "../pages/Test";
import Products from "../pages/Products";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AuthLayout from "../layouts/AuthLayout";
import Cart from "../pages/Carts";
import ProfileLayout from "../layouts/ProfileLayout";
import ProfileEdit from "../pages/ProfileEdit";
import ChangePassword from "../pages/ChangePassword";
import Favorite from "../pages/Favorite";
import ViewedProduct from "../pages/ViewedProduct";
import Order from "../pages/Order";
import ContactUs from "../pages/Contact";
import Checkout from "../pages/Checkout";
import ProductDetail from "../pages/ProductDetail";
import { checkNotLoggedIn, checkLoggedIn } from "../loaders/authentications";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyForgotOTP from "../pages/VerifyForgotOTP";
import ResetPassword from "../pages/ResetPassword";

const router = createBrowserRouter([
  // main layout
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: PATH.HOME,
        element: <Home />,
      },
      {
        path: PATH.PRODUCTS,
        element: <Products />,
      },
      {
        path: PATH.PRODUCT_DETAIL,
        element: <ProductDetail />,
      },
      {
        path: PATH.ABOUT,
        element: <About />,
      },
      {
        path: PATH.CART,
        element: <Cart />,
        loader: checkNotLoggedIn,
      },
      {
        path: PATH.CONTACT,
        element: <ContactUs />,
      },
      {
        path: PATH.CHECKOUT,
        element: <Checkout />,
        loader: checkNotLoggedIn,
      },
      {
        path: PATH.TEST,
        element: <Test />,
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
      {
        path: PATH.SIGN_UP,
        element: <SignUp />,
        loader: checkLoggedIn,
      },
      {
        path: PATH.FORGOT_PASSWORD,
        element: <ForgotPassword />,
        loader: checkLoggedIn,
      },
      {
        path: PATH.VERIFY_FORGOT_OTP,
        element: <VerifyForgotOTP />,
        loader: checkLoggedIn,
      },
      {
        path: PATH.RESET_PASSWORD,
        element: <ResetPassword />,
        loader: checkLoggedIn,
      },
    ],
  },

  // profile layout
  {
    path: PATH.PROFILE,
    element: <ProfileLayout />,
    children: [
      {
        path: PATH.PROFILE_EDIT,
        element: <ProfileEdit />,
        loader: checkNotLoggedIn,
      },
      {
        path: PATH.CHANGE_PASSWORD,
        element: <ChangePassword />,
        loader: checkNotLoggedIn,
      },
      {
        path: PATH.FAVORITE,
        element: <Favorite />,
        loader: checkNotLoggedIn,
      },
      {
        path: PATH.VIEWED_PRODUCTS,
        element: <ViewedProduct />,
        loader: checkNotLoggedIn,
      },
      {
        path: PATH.ORDER,
        element: <Order />,
        loader: checkNotLoggedIn,
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
