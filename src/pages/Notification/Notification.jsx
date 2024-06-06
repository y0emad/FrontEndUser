import { CheckCircleOutlined, SwitcherOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";

export function Notification() {
  const all_Notificationdata = useLoaderData();
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  useEffect(() => {
    document.title = "Helwan Printing Press | Notifications";
  }, []);
  // console.log(all_Notificationdata);
  return (
    <div className="w-full h-full " id="chec-div">
      <div className="w-full  h-full ">
        <div className="2xl:w-4/12 h-screen overflow-y-auto p-8  ">
          <div className="flex items-center justify-between">
            <p
              tabIndex="0"
              className="focus:outline-none text-2xl font-semibold leading-6 text-gray-200"
            >
              {t("Notification.Notifications")}
            </p>
          </div>
          {all_Notificationdata?.map((data) => (
            <div
              className="w-full p-3 mt-5 bg-gray-200 rounded flex"
              key={data._id}
            >
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
                  <span className="text-[#000915]">Helwan Printing Press</span>{" "}
                  <span className="text-indigo-700">{data.title}</span>
                </p>
                <p
                  tabIndex="0"
                  className="focus:outline-none text-sm leading-none mt-1 mb-1"
                >
                  <span className="text-[#000915]">{data.message}</span>
                </p>
                <p
                  tabIndex="0"
                  className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                >
                  {data.timeAgo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const loader = async ({ request: { signal } }) => {
  const token = localStorage.getItem("tkn");
  const userId = jwtDecode(token).userId;
  const all_Notificationdata = await fetch(
    `http://localhost:4000/notifications/${userId}`,
    {
      signal,
    }
  ).then((res) => res.json());
  // console.log(all_Notificationdata);
  return all_Notificationdata.data;
};

export const NotificationFunc = { element: <Notification />, loader };
