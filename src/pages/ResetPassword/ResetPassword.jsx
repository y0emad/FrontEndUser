import { useNavigate } from "react-router-dom";
import Reset from "./resetPassword.module.css";
import axios from "axios";
import * as Yup from "yup";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ThreeCircles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function ResetPassword() {
  const [errorMeg, setErorrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  useEffect(() => {
    document.title = "Helwan Printing Press | Reset Password";
  }, []);
  async function sendingData(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "http://localhost:4000/auth/reset-password",
        values
      );
      console.log(data);

      if (data.message) {
        setSuccessMsg(data.message);
        setTimeout(function () {
          navigate("/LogIn");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      setErorrMsg(error.response.data.message);
    }
    setIsLoading(false);
  }

  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  let validationSchema = Yup.object({
    email: Yup.string()
      .email(t("SignUp.Emailshouldvalid"))
      .required(t("SignUp.Emailisrequired")),
    resetCode: Yup.string()
      .min(6, t("SignUp.Codemust"))
      .max(6, t("SignUp.Codemust"))
      .required(t("SignUp.Codeisrequired")),
    newPassword: Yup.string()
      .matches(passwordRegex, t("SignUp.Passwordatleast"))
      .required(t("SignUp.Passwordisrequired")),
  });
  let formikObj = useFormik({
    initialValues: {
      email: "",
      resetCode: "",
      newPassword: "",
    },
    validationSchema,
    validate: function () {
      setErorrMsg(null);
    },
    onSubmit: sendingData,
  });
  return (
    <div className="">
      <div className={Reset.section}>
        {errorMeg ? (
          <div
            className={
              Reset.alert +
              " text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 text-center"
            }
          >
            {t("SignUp.Invalidcode")}
          </div>
        ) : (
          ""
        )}
        {successMsg ? (
          <div
            className={
              Reset.alert +
              " text-red-200 shadow-inner rounded p-3 bg-green-300 mt-2 text-center"
            }
          >
            {t("SignUp.passwordsuccessfullyreset")}
          </div>
        ) : (
          ""
        )}
        <h2 className={Reset.header}>{t("SignUp.ResetPassword")}</h2>
        <form onSubmit={formikObj.handleSubmit}>
          <input
            type="email"
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            value={formikObj.values.email}
            name="email"
            className={
              Reset.input +
              " mt-5 border w-full text-base ps-8 py-2 px-2 focus:outline-5 focus:ring-3 focus:border-white-600 "
            }
            placeholder={t("Login.Email")}
          />
          <i
            className="fa-solid fa-envelope relative ltr:left-[10px] px-1 rtl:right-[10px]	 "
            style={{ color: "#7f6727", bottom: "33px" }}
          ></i>
          {formikObj.errors.email && formikObj.touched.email ? (
            <div
              className={
                Reset.alert +
                " text-red-200 shadow-inner rounded p-3 bg-red-300  "
              }
            >
              {formikObj.errors.email}
            </div>
          ) : (
            ""
          )}

          <input
            type="text"
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            value={formikObj.values.resetCode}
            name="resetCode"
            className={
              Reset.input +
              " mt-5 border w-full text-base ps-8 py-2 px-2 focus:outline-5 focus:ring-3 focus:border-white-600 "
            }
            placeholder={t("SignUp.Code")}
          />
          <i
            className="fa-solid fa-lock relative ltr:left-[10px] px-1 rtl:right-[10px]	"
            style={{ color: "#7f6727", bottom: "33px" }}
          ></i>
          {formikObj.errors.resetCode && formikObj.touched.resetCode ? (
            <div
              className={
                Reset.alert +
                " text-red-200 shadow-inner rounded p-3 bg-red-300  "
              }
            >
              {formikObj.errors.resetCode}
            </div>
          ) : (
            ""
          )}

          <input
            type="password"
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            value={formikObj.values.newPassword}
            name="newPassword"
            className={
              Reset.input +
              " mt-5 border w-full text-base ps-8 py-2 px-2 focus:outline-5 focus:ring-3 focus:border-white-600 "
            }
            placeholder={t("Login.Password")}
          />
          <i
            className="fa-solid fa-lock relative ltr:left-[10px] px-1 rtl:right-[10px]	 "
            style={{ color: "#7f6727", bottom: "33px" }}
          ></i>
          {formikObj.errors.newPassword && formikObj.touched.newPassword ? (
            <div
              className={
                Reset.alert +
                " text-red-200 shadow-inner rounded p-3 bg-red-300  "
              }
            >
              {formikObj.errors.newPassword}
            </div>
          ) : (
            ""
          )}

          <div className={Reset.containerbtns}>
            <button
              className={Reset.signupbtn}
              type="submit"
              disabled={
                formikObj.isValid === false || formikObj.dirty === false
              }
            >
              {isLoading ? (
                <ThreeCircles
                  visible={true}
                  height="30"
                  width="60"
                  color="#fff"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                t("SignUp.Submit")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
