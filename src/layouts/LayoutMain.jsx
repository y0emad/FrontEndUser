import { NavBarMain } from "../components/NavBarMain";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

import { Loading } from "../pages/Loading/Loading";
import { FooterMain } from "../components/FooterMain";
import { calc } from "antd/es/theme/internal";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";

export function LayoutMain() {
  const { state } = useNavigation();
  const isChatPage = location.pathname === "/UserChats";
  return (
    <>
      <NavBarMain />
      {state === "loading" ? (
        <Loading />
      ) : isChatPage ? (
        <div
          style={{
            // paddingTop: "4rem",
            minHeight: "calc(100vh - 4rem )",
          }}
        >
          <Outlet />
        </div>
      ) : (
        <>
          <ScrollRestoration />
          <div
            style={{
              paddingTop: "4rem",
              minHeight: "calc(100vh - 4rem - 138px)",
            }}
          >
            <Outlet />
          </div>
          <div style={{ paddingTop: "4rem" }}>
            <FooterMain />
            <Toaster />
          </div>
        </>
      )}
    </>
  );
}
