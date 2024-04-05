import { NavBarMain } from "../components/NavBarMain";
import { Outlet, useNavigation } from "react-router-dom";

import { Loading } from "../pages/Loading/Loading";

export function LayoutMain() {
  const { state } = useNavigation();

  return (
    <>
      {state === "loading" ? (
        <div>
          <NavBarMain />
          <Loading />
        </div>
      ) : (
        <div>
          <NavBarMain />
          <div style={{ paddingTop: "4rem" }}>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
