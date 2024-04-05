import "../index.css";
import "../styles.css";
import logo from "../images/logo.png";
import { Dropdown, Select } from "antd";
import useLocalStorage from "../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import {
  GlobalOutlined,
  LoginOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  CloseOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function NavBarMain() {
  const [t, i18n] = useTranslation("global");
  const [toggleMob, setToggleMob] = useState(true);
  const [lang, setLang] = useLocalStorage("lang", "ar");
  const items = [
    {
      key: "1",
      label: <a className="fontThreeLight">{t("header.Books")}</a>,
    },
    {
      key: "2",
      label: <a className="fontThreeLight">{t("header.Brochures")}</a>,
    },
  ];
  useEffect(() => {
    i18n.changeLanguage(lang);
    const htmlDir = document.documentElement.getAttribute("dir");
    lang === "ar"
      ? document.documentElement.setAttribute("dir", "ltr")
      : document.documentElement.setAttribute("dir", "rtl");
  }, [lang]);
  const handleChangeLang = (value) => {
    setLang(() => value);
    i18n.changeLanguage(value);
  };
  const handleToggle = () => {
    const navlinks = document?.querySelector(".nav-links");
    setToggleMob((e) => !e);
    navlinks?.classList.toggle("top-[100%]");
  };
  return (
    <nav
      className={
        "grid grid-cols-3 h-16 bg-[#000915] z-50 items-center mx-auto fixed top-0 w-full"
      }
    >
      <div className=" grid grid-cols-2 h-33 m-3  text-gray-200 me-auto gap-5  items-center justify-center">
        <Link
          to="/LogIn"
          className="md:flex  gap-2 justify-center  hover:text-[#7f6727] text-nowrap  items-center fontMed hidden"
        >
          <span>{t("header.Log_in")}</span>
          <LoginOutlined />
        </Link>
        <Select
          suffixIcon={<GlobalOutlined className=" text-gray-200 " />}
          defaultValue={lang}
          style={{ width: 120 }}
          onChange={handleChangeLang}
          options={[
            {
              value: "ar",
              label: "العربيه",
            },
            {
              value: "en",
              label: "English",
            },
          ]}
        />
      </div>
      <div className=" flex justify-center  items-center w-[100%] ">
        <Link to={"/"}>
          <img src={logo} alt="logo" className=" w-11" />
        </Link>
      </div>

      <div className="nav-links ms-auto md:static  md:min-h-fit md:items-center absolute bg-[#000915] min-h-[20vh] bottom-[240%] grid  left-0 md:w-auto md:py-0  w-full  text-gray-200 fontMed ">
        <ul className="flex md:flex-row flex-col  justify-center items-end gap-5 mr-5 ml-5 md:mr-0  md:items-center ">
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

          <li>
            <Link
              to="/MyProjects"
              href="#"
              className="flex justify-center gap-2 hover:text-[#7f6727]"
            >
              {t("header.My_projects")} <AppstoreOutlined />{" "}
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="flex  gap-2 justify-center text-nowrap  items-center  md:hidden hover:text-[#7f6727]"
            >
              <span>{t("header.Log_in")}</span>
              <LoginOutlined />
            </a>
          </li>
        </ul>
      </div>
      <div
        className=" text-gray-200 flex justify-center text-2xl ms-auto m-3 md:hidden cursor-pointer"
        onClick={handleToggle}
      >
        {toggleMob ? <UnorderedListOutlined /> : <CloseOutlined />}
      </div>
    </nav>
  );
}
