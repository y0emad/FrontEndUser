import axios from "axios";
import Forget from "./forgetPassword.module.css";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function ForgetPassword() {
  const [errorMeg, setErorrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");
  const navigate = useNavigate();
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  useEffect(() => {
    document.title = "Helwan Printing Press | Forgot Password";
  }, []);
  async function sendingData(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "http://localhost:4000/auth/forgot-password",
        values
      );
      console.log(data);
      // https://printing-sys-fojo.vercel.app/auth/register
      //https://ecommerce.routemisr.com/api/v1/auth/signup
      if (data.message) {
        setSuccessMsg(data.message);
        setTimeout(function () {
          navigate("/ResetPassword");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      setErorrMsg(error.response.data.message);
    }
    setIsLoading(false);
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .email(t("SignUp.Emailshouldvalid"))
      .required(t("SignUp.Emailisrequired")),
  });
  let formikObj = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    validate: function () {
      setErorrMsg(null);
    },
    onSubmit: sendingData,
  });
  return (
    <div className={Forget.container}>
      <div className={Forget.section}>
        {errorMeg ? (
          <div
            className={
              Forget.alert +
              " text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 text-center"
            }
          >
            {t("SignUp.Usernotfound")}
          </div>
        ) : (
          ""
        )}
        {successMsg ? (
          <div
            className={
              Forget.alert +
              " text-red-200 shadow-inner rounded p-3 bg-green-300 mt-2 text-center"
            }
          >
            {t("SignUp.Passwordresetsent")}
          </div>
        ) : (
          ""
        )}
        <h2 className={Forget.header}>{t("SignUp.ForgetPassword")}</h2>
        <form onSubmit={formikObj.handleSubmit}>
          <input
            type="email"
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            value={formikObj.values.email}
            name="email"
            className={
              Forget.input +
              "  mt-5 border w-full text-base ps-8 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 "
            }
            placeholder={t("Login.Email")}
          />
          <i
            className="fa-solid fa-envelope relative	 "
            style={{ color: "#7f6727", bottom: "33px", left: "10px" }}
          ></i>

          {formikObj.errors.email && formikObj.touched.email ? (
            <div
              className={
                Forget.alert +
                " text-red-200 shadow-inner rounded p-3 bg-red-300  "
              }
            >
              {formikObj.errors.email}
            </div>
          ) : (
            ""
          )}

          <div className={Forget.containerbtns}>
            <button
              className={Forget.signupbtn}
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
