import "../index.css";
import "../styles.css";
import logo from "../images/logo.png";
import { Dropdown, Select, Popconfirm } from "antd";
import useLocalStorage from "../hooks/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import {
  GlobalOutlined,
  LoginOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  CloseOutlined,
  ReconciliationOutlined,
  LogoutOutlined,
  BellOutlined,
  SwitcherOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { authContext } from "../Context/authentication";
import { jwtDecode } from "jwt-decode";

export function NavBarMain() {
  const [t, i18n] = useTranslation("global");
  const [toggleMob, setToggleMob] = useState(true);
  const [lang, setLang] = useLocalStorage("lang", "ar");
  const [products, setProducts] = useState([]);
  const [Notificationdata, setNotificationData] = useState([]);
  const { token, setToken } = useContext(authContext);
  const NavFunc = useNavigate();

  function confirm() {
    return NavFunc("/Notification");
  }
  useEffect(() => {
    i18n.changeLanguage(lang);
    const htmlDir = document.documentElement.getAttribute("dir");
    lang === "ar"
      ? document.documentElement.setAttribute("dir", "rtl")
      : document.documentElement.setAttribute("dir", "ltr");
  }, [lang]);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch("http://localhost:4000/products/GetShownProducts", { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        data.message === "No Products found"
          ? setProducts([])
          : setProducts(data.data);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
        } else {
          console.error("Error fetching data:", error);
        }
      });
    return () => {
      abortController.abort();
    };
  }, []);
  useEffect(() => {
    if (!token) return;
    const abortController = new AbortController();
    const userId = jwtDecode(token).userId;
    const signal = abortController.signal;
    fetch(`http://localhost:4000/notifications/getLastThree/${userId}`, {
      signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        data.message === "Notifications fetched successfully"
          ? setNotificationData(data.data)
          : setNotificationData([]);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
        } else {
          console.error("Error fetching data:", error);
        }
      });
    return () => {
      abortController.abort();
    };
  }, [token]);
  const items = products.map((product) => {
    return {
      key: product._id,
      label: (
        <Link className="fontThreeLight" to={`/Product/${product._id}`}>
          {product.name}
        </Link>
      ),
    };
  });

  const handleChangeLang = (value) => {
    setLang(() => value);
    i18n.changeLanguage(value);
  };
  const handleToggle = () => {
    const navlinks = document?.querySelector(".nav-links");
    setToggleMob((e) => !e);
    navlinks?.classList.toggle("top-[100%]");
  };
  function logOut() {
    localStorage.removeItem("tkn");
    setToken(null);
    setTimeout(() => {
      NavFunc("/LogIn");
    }, 2000);
  }
  return (
    <nav
      className={
        "grid grid-cols-3 h-16 bg-[#000915] z-50 items-center mx-auto fixed top-0 w-full"
      }
    >
      <div
        className={`nav-links me-auto md:m-3 md:static  md:min-h-fit md:items-center absolute bg-[#000915] ${
          token ? "min-h-[20vh]" : "min-h-[12vh]"
        } bottom-[240%] grid  left-0 md:w-auto md:py-0  w-full  text-gray-200 fontMed `}
      >
        <ul className="flex md:flex-row flex-col md:justify-start  justify-center items-end gap-5 mr-5 ml-5   md:items-center ">
          <li>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <button className=" flex justify-center gap-2 items-center hover:text-[#7f6727]">
                {t("header.Services")} <ReconciliationOutlined />
              </button>
            </Dropdown>
          </li>

          {token ? (
            <>
              <li>
                <Link
                  to="/MyProjects"
                  className="flex justify-center gap-2 text-nowrap hover:text-[#7f6727]"
                >
                  {t("header.My_projects")} <AppstoreOutlined />{" "}
                </Link>
              </li>
              <li>
                <span
                  onClick={logOut}
                  className="flex  gap-2 justify-center text-nowrap  items-center  md:hidden hover:text-[#7f6727] cursor-pointer"
                >
                  <span>{t("header.Log_out")}</span>
                  <LogoutOutlined />
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/LogIn"
                  className="flex  gap-2 justify-center text-nowrap  items-center  md:hidden hover:text-[#7f6727]"
                >
                  <span>{t("header.Log_in")}</span>
                  <LoginOutlined />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div
        className=" text-gray-200 flex justify-center text-2xl me-auto m-3 md:hidden cursor-pointer"
        onClick={handleToggle}
      >
        {toggleMob ? <UnorderedListOutlined /> : <CloseOutlined />}
      </div>
      <div className="flex justify-center  items-center w-[100%] ">
        <Link to={"/"}>
          <img src={logo} alt="logo" className=" w-11" />
        </Link>
      </div>
      <div className="  flex  h-33 m-3  text-gray-200 ms-auto  gap-5  items-center justify-center">
        {token && (
          <div className=" w-fit justify-self-center  ">
            <div style={{ clear: "both", whiteSpace: "nowrap" }}>
              <Popconfirm
                placement="bottom"
                title={
                  <div>
                    {Notificationdata.length > 0
                      ? Notificationdata.map((data) => (
                          <div key={data._id}>
                            <div className="w-full p-3 mt-5 bg-gray-200 rounded flex">
                              <div
                                tabIndex="0"
                                aria-label="heart icon"
                                role="img"
                                className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
                              >
                                {data.title === "order_accept" ? (
                                  <CheckCircleOutlined className="text-xl text-green-900" />
                                ) : (
                                  <SwitcherOutlined className="text-xl text-[#000915]" />
                                )}
                              </div>
                              <div className="ps-3">
                                <p
                                  tabIndex="0"
                                  className="focus:outline-none text-sm leading-none"
                                >
                                  <span className="text-[#000915]">
                                    Helwan Printing Press
                                  </span>{" "}
                                  <span className="text-indigo-700">
                                    {data.title}
                                  </span>
                                </p>
                                <p
                                  tabIndex="0"
                                  className="focus:outline-none text-sm leading-none mt-1 mb-1"
                                >
                                  <span className="text-[#000915]">
                                    {data.message}
                                  </span>
                                </p>
                                <p
                                  tabIndex="0"
                                  className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                                >
                                  {data.timeAgo}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      : t("Notification.NoNotification")}
                  </div>
                }
                onConfirm={confirm}
                okText={t("Notification.MoreNotifications")}
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{
                  style: {
                    marginTop: "10px",
                    backgroundColor: "#000915",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    color: "#fff",
                    display: Notificationdata.length > 0 ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                }}
                icon={null}
              >
                <BellOutlined className="text-xl hover:text-[#7f6727] cursor-pointer " />
              </Popconfirm>
            </div>
          </div>
        )}
        <Select
          suffixIcon={
            <GlobalOutlined className=" text-gray-200 pointer-events: none " />
          }
          className="ms-auto"
          defaultValue={lang}
          style={{ width: 60 }}
          onChange={handleChangeLang}
          options={[
            {
              value: "ar",
              label: "AR",
            },
            {
              value: "en",
              label: "EN",
            },
          ]}
        />

        {token ? (
          <>
            <span
              onClick={logOut}
              className="md:flex  gap-2 justify-center  hover:text-[#7f6727] text-nowrap  items-center fontMed hidden cursor-pointer"
            >
              <span>{t("header.Log_out")}</span>
              <LogoutOutlined />
            </span>
          </>
        ) : (
          <>
            <Link
              to="/LogIn"
              className="md:flex  gap-2 justify-center  hover:text-[#7f6727] text-nowrap  items-center fontMed hidden"
            >
              <span>{t("header.Log_in")}</span>
              <LoginOutlined />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
