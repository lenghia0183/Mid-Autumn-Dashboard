import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebaseConfig";
import { useTranslation } from "react-i18next";
import Backdrop from "./components/BackDrop";
import { useLoading } from "./context/loadingContext";
import LogoutListener from "./components/LogoutListener";

function App() {
  const { i18n } = useTranslation();
  auth.languageCode = i18n.language;
  const { isLoading } = useLoading();

  return (
    <>
      <ToastContainer style={{ zIndex: "9999999999" }} />
      <RouterProvider router={router}>
        <div className="App">
          <LogoutListener />
          <Backdrop open={isLoading} />
        </div>
      </RouterProvider>
    </>
  );
}

export default App;
