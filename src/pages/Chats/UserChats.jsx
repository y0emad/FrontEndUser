import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Chats } from "./Chats";
import { authContext } from "../../Context/authentication";

function UserChats() {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");
  const { token } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Helwan Printing Press | Contact Us";
  }, []);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <>
      {token ? (
        <div className="flex h-[100vh] antialiased text-gray-200">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <Chats />
          </div>
        </div>
      ) : (
        navigate("/LogIn")
      )}
    </>
  );
}

export const UserChatsFunc = {
  element: (
    <ProtectedRoute>
      <UserChats />
    </ProtectedRoute>
  ),
};
