import { Footer } from "antd/es/layout/layout";
import "../index.css";
import "../styles.css";
import helwanLogo from "../images/helwanLogo.png";
import fawryLogo from "../images/fawryLogo.svg";
import mezaLogo from "../images/mezaLogo.svg";
import amanLogo from "../images/amanLogo.png";

export function FooterMain() {
  return (
    <Footer className="p-3  w-full bg-[#000915] text-gray-200   h-[162px] grid grid-rows-3  justify-center items-center space-y-3">
      <div className="h-16 w-16 justify-self-center  ">
        <img
          src={helwanLogo}
          alt="Helwan University"
          className="h-full w-full"
        />
      </div>
      <div className="grid grid-cols-3   justify-center items-center w-17 h-16 justify-self-center gap-4">
        <div className="justify-self-center">
          <img src={fawryLogo} alt="fawryLogo" className=" w-17 h-16 " />
        </div>
        <div className="justify-self-center">
          <img src={mezaLogo} alt="mezaLogo" className=" w-16 h-16" />
        </div>
        <div className="justify-self-center">
          <img src={amanLogo} alt="amanLogo" className=" w-14 h-7 " />
        </div>
      </div>
      <div className="text-gray-200 text-center fontTwoLight h-fit">
        2024 جميع الحقوق محفوظة © البوابة الإلكترونية بمركز الحساب العلمي
      </div>
    </Footer>
  );
}
