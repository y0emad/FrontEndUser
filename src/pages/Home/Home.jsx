import { useTranslation } from "react-i18next";
import bg from "../../images/bg.png";
import "../../index.css";
import "./home.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  function handleClick() {
    return <Link to="/LogIn" />;
  }
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="bg-cover bg-center h-[92vh] grid grid-cols-2 "
      >
        <div>
          <div className=" ltr:bg-gradient-to-r rtl:bg-gradient-to-l backdrop-blur-[2px] h-[92vh]  from-[#000915ad] to-transparent pt-[20%] pl-[10%] pr-[10%]">
            <h4 className="fontTwoLight text-[#B38F00] text-2xl">
              {t("Home.mYE")}
            </h4>
            <h1 className="font-bold text-gray-200 text-[48px] mt-2 mb-11">
              {t("Home.Helwan_Printing")}
            </h1>
            <h4 className="fontTwoLight text-[#B38F00] text-2xl">
              {t("Home.iIP")}
            </h4>
            <h2 className="fontOneLight text-gray-200 text-3xl mt-2 mb-5">
              {t("Home.content")}
            </h2>
            <button
              onClick={handleClick}
              className="relative px-8 mt-10 text-lg py-3 font-bold rounded-md bg-[#7f6727] isolation-auto z-10 border-2 border-[#000915]
      before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-gray-200 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 fontBold"
            >
              <Link to="/LogIn">{t("Home.Know_More")}</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
