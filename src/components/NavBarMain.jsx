import "../index.css";
import "../styles.css";
import logo from "../images/logo.png";
import { Dropdown, Select } from "antd";
import {
  GlobalOutlined,
  LoginOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  CloseOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const items = [
  {
    key: "1",
    label: <a className="fontThreeLight">كتب</a>,
  },
  {
    key: "2",
    label: <a className="fontThreeLight">منشورات</a>,
  },
];
export function NavBarMain() {
  const [toggleMob, setToggleMob] = useState(true);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleToggle = () => {
    const navlinks = document?.querySelector(".nav-links");
    setToggleMob((e) => !e);
    navlinks?.classList.toggle("bottom-[-250%]");
  };
  return (
    <div className=" grid grid-cols-3  h-16 bg-[#000915]  items-center mx-auto fixed top-0 w-full">
      <div className=" grid grid-cols-2 h-33 ml-5 text-gray-200 mr-auto gap-5  items-center justify-center">
        <a
          href="#"
          className="md:flex  gap-2 justify-center text-nowrap  items-center fontMed hidden"
        >
          <span>تسجيل الدخول </span>
          <LoginOutlined />
        </a>
        <Select
          suffixIcon={<GlobalOutlined className=" text-gray-200 " />}
          defaultValue="AR"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            {
              value: "AR",
              label: "العربيه",
            },
            {
              value: "EN",
              label: "English",
            },
          ]}
        />
      </div>
      <div className=" flex justify-center  items-center w-[100%] ">
        <a href="#">
          <img src={logo} alt="logo" className=" w-11" />
        </a>
      </div>

      <div className="nav-links ml-auto md:static md:min-h-fit md:items-center absolute bg-[#000915] min-h-[20vh] bottom-[100%]  left-0 md:w-auto md:py-0 py-6 w-full text-gray-200 fontMed ">
        <ul className="flex md:flex-row flex-col  items-end gap-5 mr-5 md:mr-0 md:items-center">
          <li>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <button className=" flex justify-center gap-2 items-center">
                الخدمات <ReconciliationOutlined />
              </button>
            </Dropdown>
          </li>

          <li>
            <a href="#" className="flex justify-center gap-2">
              مشاريعي <AppstoreOutlined />{" "}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex  gap-2 justify-center text-nowrap  items-center  md:hidden"
            >
              <span>تسجيل الدخول </span>
              <LoginOutlined />
            </a>
          </li>
        </ul>
      </div>
      <div
        className=" text-gray-200 flex justify-center text-2xl ml-auto mr-5 md:hidden cursor-pointer"
        onClick={handleToggle}
      >
        {toggleMob ? <UnorderedListOutlined /> : <CloseOutlined />}
      </div>
    </div>
  );
}
