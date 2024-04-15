import { NavBarMain } from "../components/NavBarMain";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

import { Loading } from "../pages/Loading/Loading";
import { FooterMain } from "../components/FooterMain";

export function LayoutMain() {
  const { state } = useNavigation();

  return (
    <>
      {state === "loading" ? (
        <div>
          <NavBarMain />
          <Loading />
          <div style={{ paddingTop: "4rem" }}>
            <FooterMain />
          </div>
        </div>
      ) : (
        <div>
          <NavBarMain />
          <ScrollRestoration />
          <div style={{ paddingTop: "4rem" }}>
            <Outlet />
          </div>
          <div style={{ paddingTop: "4rem" }}>
            <FooterMain />
          </div>
        </div>
      )}
    </>
  );
}
