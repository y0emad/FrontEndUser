import { Link, useNavigate } from "react-router-dom";
import SignUp from "./registeration.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ThreeCircles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Registeration() {
  const [errorMeg, setErorrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Helwan Printing Press | Sign Up";
  }, []);
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  async function sendingData(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "http://localhost:4000/auth/register",
        values
      );
      console.log(data);

      if (data.message) {
        setSuccessMsg(data.message);
        setTimeout(function () {
          navigate("/VerifyEmail");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.ValidationError[0]);
      setErorrMsg(error.response.data.ValidationError[0]);
    }
    setIsLoading(false);
  }

  let phoneRegex = /^01[0125][0-9]{8}$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  let validationSchema = Yup.object({
    username: Yup.string()
      .min(6, t("SignUp.Must"))
      .max(20, t("SignUp.Must"))
      .required(t("SignUp.Nameisrequired")),
    email: Yup.string()
      .email(t("SignUp.Emailshould"))
      .required(t("SignUp.Emailisrequired")),
    phoneNumber: Yup.string()
      .matches(phoneRegex, t("SignUp.Thephonenumber"))
      .required(t("SignUp.Phoneisrequired")),
    password: Yup.string()
      .matches(passwordRegex, t("SignUp.Passwordatleast"))
      .required(t("SignUp.Passwordisrequired")),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], t("SignUp.Passwordandrepassword"))
      .required(t("SignUp.Repasswordisrequired")),
  });
  let formikObj = useFormik({
    initialValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    validate: function () {
      setErorrMsg(null);
    },
    onSubmit: sendingData,
  });
  return (
    <div className={SignUp.section}>
      {errorMeg ? (
        <div
          className={
            SignUp.alert +
            " text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 text-center"
          }
        >
          {t("SignUp.Emailalready")}
        </div>
      ) : (
        ""
      )}
      {successMsg ? (
        <div
          className={
            SignUp.alert +
            " text-red-200 shadow-inner rounded p-3 bg-green-300 mt-2 text-center"
          }
        >
          {t("SignUp.Userregisteredsuccessfully")}
        </div>
      ) : (
        ""
      )}
      <h2 className={SignUp.header}>{t("Login.Signup")}</h2>
      <form onSubmit={formikObj.handleSubmit}>
        <input
          type="text"
          onChange={formikObj.handleChange}
          onBlur={formikObj.handleBlur}
          value={formikObj.values.username}
          name="username"
          className={
            SignUp.input +
            " mt-5 border w-full text-base ps-8 py-2 px-2 focus:outline-5 focus:ring-3 focus:border-white-600 "
          }
          placeholder={t("SignUp.Username")}
        />
        <i
          className="fa-solid fa-user relative ltr:left-[10px] px-1 rtl:right-[10px] "
          style={{ color: "#7f6727", bottom: "33px" }}
        ></i>
        {formikObj.errors.username && formikObj.touched.username ? (
          <div
            className={
              SignUp.alert +
              " text-red-200 shadow-inner rounded p-3 bg-red-300 "
            }
          >
            {formikObj.errors.username}
          </div>
        ) : (
          ""
        )}

        <input
          type="email"
          onChange={formikObj.handleChange}
          onBlur={formikObj.handleBlur}
          value={formikObj.values.email}
          name="email"
          className={
            SignUp.input +
            " mt-5 border w-full text-base ps-8 py-2 px-2  focus:outline-5 focus:ring-3 focus:border-white-600 "
          }
          placeholder={t("Login.Email")}
        />
        <i
          className="fa-solid fa-envelope relative ltr:left-[10px] px-1 rtl:right-[10px] "
          style={{ color: "#7f6727", bottom: "33px" }}
        ></i>
        {formikObj.errors.email && formikObj.touched.email ? (
          <div
            className={
              SignUp.alert +
              " text-red-200 shadow-inner rounded p-3 bg-red-300  "
            }
          >
            {formikObj.errors.email}
          </div>
        ) : (
          ""
        )}

        <input
          type="password"
          onChange={formikObj.handleChange}
          onBlur={formikObj.handleBlur}
          value={formikObj.values.password}
          name="password"
          className={
            SignUp.input +
            " mt-5 border w-full text-base ps-8 py-2 px-2 focus:outline-5 focus:ring-3 focus:border-white-600 "
          }
          placeholder={t("Login.Password")}
        />
        <i
          className="fa-solid fa-lock relative ltr:left-[10px] px-1 rtl:right-[10px] "
          style={{ color: "#7f6727", bottom: "33px" }}
        ></i>
        {formikObj.errors.password && formikObj.touched.password ? (
          <div
            className={
              SignUp.alert +
              " text-red-200 shadow-inner rounded p-3 bg-red-300  "
            }
          >
            {formikObj.errors.password}
          </div>
        ) : (
          ""
        )}

        <input
          type="password"
          onChange={formikObj.handleChange}
          onBlur={formikObj.handleBlur}
          value={formikObj.values.passwordConfirm}
          className={
            SignUp.input +
            " mt-5 border w-full text-base ps-8 py-2 px-2 focus:outline-5 focus:ring-3 focus:border-white-600 "
          }
          name="passwordConfirm"
          placeholder={t("SignUp.RePassword")}
        />
        <i
          className="fa-solid fa-lock relative ltr:left-[10px] px-1 rtl:right-[10px] "
          style={{ color: "#7f6727", bottom: "33px" }}
        ></i>
        {formikObj.errors.passwordConfirm &&
        formikObj.touched.passwordConfirm ? (
          <div
            className={
              SignUp.alert +
              " text-red-200 shadow-inner rounded p-3 bg-red-300 "
            }
          >
            {formikObj.errors.passwordConfirm}
          </div>
        ) : (
          ""
        )}

        <input
          type="tel"
          onChange={formikObj.handleChange}
          onBlur={formikObj.handleBlur}
          value={formikObj.values.phoneNumber}
          name="phoneNumber"
          className={
            SignUp.input +
            " mt-5 border w-full text-base ps-8 py-2 focus:outline-5 px-2 focus:ring-3 focus:border-white-600 "
          }
          placeholder={t("SignUp.Phonenumber")}
        />
        <i
          className="fa-solid fa-phone relative ltr:left-[10px] px-1 rtl:right-[10px] "
          style={{ color: "#7f6727", bottom: "33px" }}
        ></i>
        {formikObj.errors.phoneNumber && formikObj.touched.phoneNumber ? (
          <div
            className={
              SignUp.alert +
              " text-red-200 shadow-inner rounded p-3 bg-red-300 "
            }
          >
            {formikObj.errors.phoneNumber}
          </div>
        ) : (
          ""
        )}

        <div className={SignUp.containerbtns}>
          <button
            className={SignUp.signupbtn}
            type="submit"
            disabled={formikObj.isValid === false || formikObj.dirty === false}
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
              t("Login.Signup")
            )}
          </button>
          <Link className={SignUp.fancy} to={"/LogIn"}>
            <span className={SignUp.topKey}></span>
            <span className={SignUp.text}>{t("Login.Login")}</span>
            <span className={SignUp.bottomKey1}></span>
            <span className={SignUp.bottomKey2}></span>
          </Link>
        </div>
      </form>
    </div>
  );
  // http://localhost:4000/auth/register
  // https://printing-sys-fojo.vercel.app/auth/register
  // https://ecommerce.routemisr.com/api/v1/auth/signup
}
