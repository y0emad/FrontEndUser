import { Spin } from "antd";
import { useTranslation } from "react-i18next";

import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import {
  useLoaderData,
  Form,
  useNavigation,
  redirect,
  Link,
} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

let globalFile = "";
function UpdateOrder() {
  const { my_order, product } = useLoaderData();
  globalFile = my_order.data.product.file;
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");
  //   console.log("my order", my_order.data.product);
  //   console.log("my product", product);
  const { state } = useNavigation();
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className=" text-3xl font-bold text-gray-200 mb-8">
          {t("ModalMyPro.edit")}
        </h2>
        <Form method="put" encType="multipart/form-data">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-6">
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
                    defaultValue={
                      my_order.data.product.data.find(
                        (order) => order.field_name === input.name
                      )?.value
                    }
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
                    defaultValue={
                      my_order.data.product.data.find(
                        (order) => order.field_name === input.name
                      )?.value
                    }
                    id={input.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={input.name}
                  />
                </div>
              )
            )}
            <div className="sm:col-span-2 mb-6">
              <label
                htmlFor="Quantity"
                className="block mb-2 text-sm font-medium text-gray-200"
              >
                {t("ModalMyPro.Quantity")}
              </label>
              <input
                type="number"
                name="Quantity"
                id="Quantity"
                defaultValue={my_order.data.product.quantity}
                className="bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={t("ModalMyPro.Quantity")}
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label
              className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              {t("Product.Update_file")}
            </label>
            <input
              //   defaultValue={file}
              id="file_input"
              name="file_input"
              type="file"
              accept="application/pdf ,  application/msword,  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="w-full text-gray-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4  file:bg-gray-800 file:hover:bg-gray-700 file:text-gray-200 rounded"
            />
          </div>

          <button
            disabled={state === "submitting"}
            className="inline-flex items-center px-5 duration-300 py-2.5 mt-4 sm:mt-10 text-sm font-medium text-center text-[#000915] bg-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-200 hover:bg-[#7f6727]"
          >
            {state === "submitting" ? (
              <Spin
                size="large"
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                      color: "#000915",
                    }}
                    spin
                  />
                }
              />
            ) : (
              t("ModalMyPro.Update")
            )}
          </button>
          <Link
            to=".."
            className="inline-flex border-2 border-[#7f6727] items-center mx-5 px-5 duration-300 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-gray-200 bg-transparent rounded-lg focus:ring-2 focus:ring-[#7f6727] dark:focus:ring-[#7f6727] hover:bg-[#7f6727]"
          >
            {t("Product.Cancel")}
          </Link>
        </Form>
      </div>
    </section>
  );
}
const loader = async ({ request, params }) => {
  const token = localStorage.getItem("tkn");

  const my_order = await fetch(
    `http://localhost:4000/orders/${params.order_id}`,
    {
      signal: request.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  const product = await fetch(
    `http://localhost:4000/products/${my_order.data.product.product_id}`,
    { signal: request.signal }
  ).then((res) => res.json());

  return { my_order, product };
};
const action = async ({ request, params, signal }) => {
  const token = localStorage.getItem("tkn");

  const formData = await request.formData();

  const my_order = await fetch(
    `http://localhost:4000/orders/${params.order_id}`,
    {
      signal: request.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  const products = await fetch(
    `http://localhost:4000/products/${my_order.data.product.product_id}`,
    {
      signal,
    }
  ).then((res) => res.json());

  const file_input = formData.get("file_input");
  const Quantity = formData.get("Quantity");

  const formBody = new FormData();
  products.data.requiredData.forEach((input, i) => {
    formBody.set(`product[data][${i}][index]`, i);
    formBody.set(`product[data][${i}][value]`, formData.get(input.name));
  });

  if (file_input !== null) {
    formBody.set("product[File]", file_input);
  } else {
    formBody.set("product[File]", globalFile);
  }

  formBody.set("product[quantity]", Quantity);

  const res = await fetch(`http://localhost:4000/orders/${params.order_id}`, {
    method: "PUT",
    signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  }).then((res) => res.json());

  return redirect("/MyProjects");
};

export const UpdateOrderFunc = {
  action,
  element: (
    <ProtectedRoute>
      <UpdateOrder />
    </ProtectedRoute>
  ),
  loader,
};
