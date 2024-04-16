import "../../index.css";
import hu_printing from "../../images/hu-printing.png";
import helwanLogo from "../../images/helwanLogo.png";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useLocalStorage from "../../hooks/useLocalStorage";
import divOne from "../../images/divOne.jpg";
import divTwo from "../../images/divTwo.png";
export function About() {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 justify-items-center items-center">
        <div>
          <div className=" relative  w-[500px] h-[300px] mt-[16%]">
            <div className=" w-[51px] h-[51px] rounded-full bg-[#504000] absolute top-16 ltr:left-[-1px]  rtl:right-[-1px] z-3=20"></div>
            <div className=" w-[103px] h-[103px] rounded-full bg-[#000915] absolute ltr:left-3 rtl:right-[3px] top-3 z-10"></div>
            <div className=" w-[81px] h-[81px] rounded-full bg-gray-200 absolute ltr:left-3  rtl:right-[3px] top-0 z-0"></div>
            <div className=" w-[85px] h-[74px] blur-3xl bg-[#504000] absolute ltr:left-7  rtl:right-7 top-2"></div>
            <div className=" w-[85px] h-[74px] blur-3xl bg-[#504000] absolute ltr:left-7  rtl:right-7 top-12"></div>
            <div className=" w-[85px] h-[74px] blur-3xl bg-[#504000] absolute ltr:left-52 rtl:right-52 top-2"></div>
            <div className=" absolute z-30 top-12 ltr:left-16 rtl:right-16 text-gray-200 text-4xl font-bold text-wrap  w-[323px] ">
              {t("About.header")}
            </div>
          </div>
        </div>
        <div>
          <div className=" border-2 w-[411px] h-[115px] z-0 border-l-gray-200 justify-items-center items-center relative">
            {" "}
            <div className="   w-[65px] h-[69px] top-[73%] left-[41%]    bg-gradient-to-b to-[#021631] from-[#000915] z-10 absolute">
              {" "}
              <img
                src={helwanLogo}
                alt="helwanLogo"
                className=" w-full h-full "
              />
            </div>
            <div className="">
              {" "}
              <img src={hu_printing} alt="hu_printing" className=" p-5 pt-8" />
            </div>
          </div>
        </div>
      </div>{" "}
      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            <div className="img-box">
              <img
                src={divOne}
                alt="About Us"
                className="max-lg:mx-auto rounded-lg"
              />
            </div>
            <div className="lg:pl-[100px] flex items-center">
              <div className="data w-full">
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-gray-200 mb-9 max-lg:text-center relative">
                  About Us{" "}
                </h2>
                <p className=" GEThreeLight  text-xl  leading-8 text-gray-200 max-lg:text-center max-w-2xl mx-auto">
                  {t("About.divOne")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 ">
            <div className="lg:pr-24 flex items-center">
              <div className="data w-full">
                <img
                  src={divTwo}
                  alt="About Us image"
                  className="block lg:hidden mb-9 mx-auto"
                />
                {/* <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-gray-200 mb-9 max-lg:text-center">
                  We are Creative Since 2005
                </h2> */}
                <p className="GEThreeLight text-xl  leading-8 text-gray-200 max-lg:text-center max-w-2xl mx-auto">
                  {t("About.divTwo")}
                </p>
              </div>
            </div>
            <div className="img-box ">
              <img src={divTwo} alt="About Us" className="hidden lg:block " />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
