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
} from "@ant-design/icons";
import { useState } from "react";

const items = [
  {
    key: "1",
    label: <a className="fontThreeLight">كتب</a>,
  },
  {
    key: "2",
    label: <a className="fontOneLight">منشورات</a>,
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
    navlinks?.classList.toggle("top-[-100%]");
  };
  return (
    <div className="flex flex-row  h-16 bg-slate-950 justify-between items-center mx-auto">
      <div className="flex-none w-22 h-33 ml-5 text-black">
        <Select
          suffixIcon={<GlobalOutlined className="text-slate-950 text-xl" />}
          defaultValue="AR"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: "AR",
              label: "AR",
            },
            {
              value: "EN",
              label: "EN",
            },
          ]}
        />
      </div>
      <div className="flex-none w-11 mx-auto my-auto ">
        <a href="#">
          <img src={logo} alt="logo" />
        </a>
      </div>

      <div className="nav-links md:static md:min-h-fit flex-none absolute bg-slate-950 min-h-[20vh] top-[8%]  left-0 md:w-auto md:py-0 py-6 w-full text-gray-200 fontMed mr-5">
        <ul className="flex md:flex-row flex-col  items-end gap-4 mr-5">
          <li>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <button>الخدمات</button>
            </Dropdown>
          </li>
          <li>
            <a href="#" className=" flex  gap-2 justify-center">
              تسجيل الدخول <LoginOutlined />{" "}
            </a>
          </li>
          <li>
            <a href="#" className="flex justify-center gap-2">
              مشاريعي <AppstoreOutlined />{" "}
            </a>
          </li>
        </ul>
      </div>
      <div
        className=" text-gray-200 flex justify-center text-2xl mr-5 md:hidden cursor-pointer"
        onClick={handleToggle}
      >
        {toggleMob ? <CloseOutlined /> : <UnorderedListOutlined />}
      </div>
    </div>
  );
}
