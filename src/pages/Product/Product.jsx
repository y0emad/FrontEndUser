import { useEffect, useState } from "react";
import imgBooks from "../../images/Boos.jpg";
import { Modal, Spin } from "antd";
import "./product.css";
import { jwtDecode } from "jwt-decode";
import {
  useLoaderData,
  Form,
  useNavigation,
  redirect,
  Link,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useContext } from "react";
import { authContext } from "./../../Context/authentication";
import { LoadingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const product = useLoaderData();

  const { state } = useNavigation();
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");
  const { token } = useContext(authContext);
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    document.title = `Helwan Printing Press | ${product.data.name}`;
  }, []);

  function errorMsg() {
    toast.error("YOU MUST LOGIN FIRST😒 ", {
      duration: 2000,
      position: "top-center",
    });
  }
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 text-gray-200  lg:mt-24 mt-5 mb-16">
      <div className=" p-10 mb-10 lg:mb-0">
        <h1 className=" text-3xl font-bold mb-5">{product.data.name}</h1>
        <h2 className=" text-lg mb-8">{product.data.description}</h2>
        <>
          {token ? (
            <>
              <button
                type="button"
                className="bg-[#7f6727] text-[#000915] text-lg font-medium rounded-2xl py-3 px-6 hover:bg-gray-200 transition-colors duration-300"
                onClick={showModal}
              >
                {t("Product.Make_Order")}
              </button>
              <Modal
                title={t("Product.Your_Details")}
                footer={null}
                open={isModalOpen}
                onCancel={handleCancel}
              >
                <Form
                  className=" mt-5"
                  method="post"
                  encType="multipart/form-data"
                >
                  <div className="grid gap-6 mb-6 grid-cols-1">
                    {product.data.requiredData.map((input) =>
                      input.hasChoices ? (
                        <div key={input._id}>
                          <label
                            htmlFor={input.name}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                          >
                            Select an {input.name}
                          </label>
                          <select
                            name={input.name}
                            id={input.name}
                            required={input.required}
                            className=" bg-gray-50  cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#7f6727] dark:focus:border-[#7f6727]"
                          >
                            {input.choices.map((choice) => (
                              <option key={choice} value={choice}>
                                {choice}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="mb-6" key={input._id}>
                          <label
                            htmlFor={input.name}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                          >
                            {input.name}
                          </label>
                          <input
                            required={input.required}
                            type="text"
                            name={input.name}
                            id={input.name}
                            className="bg-gray-50    border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={input.name}
                          />
                        </div>
                      )
                    )}
                    <div className="mb-6">
                      <label
                        htmlFor="Quantity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                      >
                        {t("Product.Quantity")}
                      </label>
                      <input
                        required
                        type="number"
                        name="Quantity"
                        id="Quantity"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={t("Product.Quantity")}
                        min="1"
                      />
                    </div>

                    <div>
                      <label
                        className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                      >
                        {t("Product.Upload_file")}
                      </label>
                      <input
                        id="file_input"
                        name="file_input"
                        required
                        type="file"
                        accept="application/pdf ,  application/msword,  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="w-full text-gray-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4  file:bg-gray-800 file:hover:bg-gray-700 file:text-gray-200 rounded"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="Notes"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                      >
                        Notes
                      </label>
                      <input
                        required
                        type="text"
                        name="Notes"
                        id="Notes"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Notes"
                      />
                    </div>
                  </div>
                  <button
                    disabled={state === "submitting" ? true : false}
                    className={`bg-[#7f6727] sm:ltr:mr-2 sm:rtl:ml-2 text-[#000915] border-2 ${
                      state === "submitting"
                        ? "cursor-not-allowed hover:!bg-[#7f6727] hover:!text-[#000915] hover:!border-[#7f6727]"
                        : "cursor-pointer"
                    } hover:border-gray-200 border-[#7f6727]  hover:!bg-gray-200 hover:!text-[#000915]    transition-colors duration-300  focus:outline-none mb-2 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center `}
                  >
                    {state === "submitting" ? (
                      <Spin
                        size="large"
                        indicator={
                          <LoadingOutlined
                            style={{
                              fontSize: 19,
                              color: "#000915",
                            }}
                            spin
                          />
                        }
                      />
                    ) : (
                      t("Product.Send")
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className=" bg-transparent   text-[#e5e7eb]  hover:!bg-transparent hover:!text-[#7f6727] hover:!border-[#7f6727] border-2  transition-colors duration-300  focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                  >
                    {t("Product.Cancel")}
                  </button>
                </Form>
              </Modal>{" "}
            </>
          ) : (
            <Link to={"/LogIn"}>
              <button
                type="button"
                className="bg-[#7f6727] text-[#000915] text-lg font-medium rounded-2xl py-3 px-6 hover:bg-gray-200 transition-colors duration-300"
                onClick={errorMsg}
              >
                {t("Product.Make_Order")}
              </button>
            </Link>
          )}
        </>
      </div>
      <div className="relative justify-self-center">
        <div className="absolute bg-transparent  border-2 border-[#B38F00] sm:w-[112.65px] w-10 h-7 sm:h-[94.85px] right-[-12%] top-[-12%] z-10"></div>
        <div className="absolute bg-transparent  border-2 border-[#B38F00] sm:w-[112.65px] w-10 h-7 sm:h-[94.85px] right-[-5%] top-[-5%] z-10"></div>
        <div className="absolute bg-transparent  border-2 border-[#B38F00] sm:w-[112.65px] w-10 h-7 sm:h-[94.85px] left-[-12%] bottom-[-12%] z-10"></div>
        <div className="absolute bg-transparent  border-2 border-[#B38F00] sm:w-[112.65px] w-10 h-7 sm:h-[94.85px] left-[-5%] bottom-[-5%] z-10"></div>
        <div className="relative sm:w-[394.23px] sm:h-[315.45px] w-[250px] h-[225px] z-30">
          <img
            src={product.data.image}
            alt={product.data.name}
            className="sm:w-[394.23px] sm:h-[315.45px] w-[250px] h-[225px] object-fit"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#00000061] to-[#00000023]"></div>
        </div>
      </div>
    </div>
  );
}

const loader = async ({ request: { signal }, params }) => {
  const product = await fetch(
    `http://localhost:4000/products/${params.product_id}`,
    signal
  ).then((res) => res.json());
  return product;
};
const action = async ({ request, params, signal }) => {
  const formData = await request.formData();
  const products = await fetch(
    `http://localhost:4000/products/${params.product_id}`,
    { signal }
  ).then((res) => res.json());
  const product_id = params.product_id;
  const file_input = formData.get("file_input");
  const Quantity = formData.get("Quantity");
  const Notes = formData.get("Notes");

  const token = localStorage.getItem("tkn");
  const tokenDecode = jwtDecode(token);
  const formBody = new FormData();
  const updatedData = products.data.requiredData.map((input, i = 0) => {
    formBody.set(`product[data][${i}][field_name]`, `${input.name}`);
    formBody.set(`product[data][${i}][value]`, `${formData.get(input.name)}`);
    i += 1;
    return {
      field_name: input.name,
      value: formData.get(input.name),
    };
  });

  formBody.set("product[File]", file_input);
  formBody.set("product[quantity]", Quantity);
  formBody.set("product[notes]", Notes);
  formBody.set("user_id", tokenDecode.userId);

  formBody.set("product[product_id]", product_id);

  const res = await fetch(`http://localhost:4000/orders/create`, {
    method: "post",
    signal: request.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  });

  return redirect("/MyProjects");
};

export const ProductFunc = { element: <Product />, loader, action };
