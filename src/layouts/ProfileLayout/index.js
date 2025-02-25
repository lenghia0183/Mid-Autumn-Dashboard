import { Outlet, useLocation } from "react-router-dom";
import Header from "./../../components/Header/index";
import GoToTop from "./../../components/GoToTop/index";
import Footer from "./../../components/Footer/index";
import SideBar from "./SideBar";
import Breadcrumb from "./../../components/Breadcrumb/index";
import { PAGE_TITLE, PATH } from "../../constants/path";
import { useLoading } from "../../context/loadingContext";
import Backdrop from "../../components/BackDrop";

function ProfileLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isLoading } = useLoading();

  const breadcrumbData = {
    [PATH.PROFILE_EDIT]: [
      { label: PAGE_TITLE.HOME, to: PATH.HOME },
      { label: PAGE_TITLE.PROFILE_EDIT, to: PATH.PROFILE_EDIT },
    ],
    [PATH.CHANGE_PASSWORD]: [
      { label: PAGE_TITLE.HOME, to: PATH.HOME },
      { label: PAGE_TITLE.CHANGE_PASSWORD, to: PATH.CHANGE_PASSWORD },
    ],
    [PATH.ORDER]: [
      { label: PAGE_TITLE.HOME, to: PATH.HOME },
      { label: PAGE_TITLE.ORDER, to: PATH.ORDER },
    ],
    [PATH.VIEWED_PRODUCTS]: [
      { label: PAGE_TITLE.HOME, to: PATH.HOME },
      { label: PAGE_TITLE.VIEWED_PRODUCTS, to: PATH.VIEWED_PRODUCTS },
    ],
    [PATH.FAVORITE]: [
      { label: PAGE_TITLE.HOME, to: PATH.HOME },
      { label: PAGE_TITLE.FAVORITE, to: PATH.FAVORITE },
    ],
  };

  const breadcrumbProfile = breadcrumbData[currentPath] || [];

  return (
    <>
      <Backdrop open={isLoading} />
      <Header />
      <Breadcrumb items={breadcrumbProfile} />
      <main className="container grid grid-cols-12 gap-4 py-14">
        {/* SideBar chiếm 3 cột */}
        <aside className="lg:col-span-3 col-span-full rounded-md shadow-md">
          <SideBar />
        </aside>

        {/* Nội dung chính chiếm 9 cột */}
        <section className="lg:col-span-9 col-span-full">
          <Outlet />
        </section>
      </main>
      <Footer />
      <GoToTop />
    </>
  );
}

// SideBar Component

export default ProfileLayout;
