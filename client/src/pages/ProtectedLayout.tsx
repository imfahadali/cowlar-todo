import { Outlet, Navigate } from "react-router-dom";

import TopBar from "../components/TopBar";

const Layout = () => {
  return (
    <>
      <TopBar />
      <div className="flex overflow-hidden h-[calc(100vh)]">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
