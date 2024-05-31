import { Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { Steps } from "antd";

import { useTranslation } from "react-i18next";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
export default function ModalMyPro(order, { state }) {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isMsgOpen, setIsMsgOpen] = useState(false);

  const [invoiceMsg, setInvoiceMsg] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [loading, setloading] = useState(false);

  const token = localStorage.getItem("tkn");
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  useEffect(() => {
    setloading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(`http://localhost:4000/orders/${order._id}/invoice`, {
      signal,
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching invoice");
        }
        return res.json();
      })
      .then((data) => {
        setInvoiceMsg(data.message);
        setInvoice(data);
      })
      .finally(() => setloading(false))
      .catch((error) => {
        if (error.name === "AbortError") {
        } else {
          setinvNotFound(error);
        }
      });
    return () => {
      abortController.abort();
    };
  }, [order._id, token]);

  const showModal = (key) => {
    return key === "Details"
      ? setIsModalOpen(true)
      : key === "Status"
      ? setIsStatusOpen(true)
      : setIsMsgOpen(true);
  };
  const handleOk = (key) => {
    return key === "Details"
      ? setIsModalOpen(false)
      : key === "Status"
      ? setIsStatusOpen(false)
      : setIsMsgOpen(false);
  };
  const handleCancel = (key) => {
    return key === "Details"
      ? setIsModalOpen(false)
      : key === "Status"
      ? setIsStatusOpen(false)
      : setIsMsgOpen(false);
  };

  const getDateOnly = (isoString) => {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const dateOnly = getDateOnly(invoice?.deliveryTime);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-7 border-t border-[#7f6727] py-6">
        <div className="flex items-center  flex-col   min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full justify-center lg:justify-start lg:max-w-xl lg:mx-auto">
          <div className="pro-data  max-w-sm w-auto  ">
            <h5 className="font-semibold text-xl  leading-8 text-gray-200 max-[550px]:text-center">
              {order.product.product_name}
            </h5>
          </div>
        </div>
        <div className="flex items-center justify-evenly flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
          <h6 className="font-manrope font-bold text-2xl  leading-9 text-gray-200 w-full max-w-[176px] text-center">
            <button
              onClick={() => showModal("Details")}
              className="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-gray-200"
            >
              <span className="font-bold text-[#000915] text-xl relative z-10 group-hover:text-gray-200 duration-500">
                {t("ModalMyPro.Details")}
              </span>
              <span className="absolute top-0 left-0 w-full bg-gray-200 duration-500 group-hover:-translate-x-full h-full"></span>
              <span className="absolute top-0 left-0 w-full bg-gray-200 duration-500 group-hover:translate-x-full h-full"></span>

              <span className="absolute top-0 left-0 w-full bg-gray-200 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
              <span className="absolute delay-300 top-0 left-0 w-full bg-gray-200 duration-500 group-hover:translate-y-full h-full"></span>
            </button>
          </h6>
          <Modal
            title={t("ModalMyPro.Details")}
            open={isModalOpen}
            onOk={() => handleOk("Details")}
            key="Details"
            footer={null}
            onCancel={() => handleCancel("Details")}
          >
            {state === "loading" ? (
              <Spin
                size="large"
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                      color: "#e5e7eb",
                    }}
                    spin
                  />
                }
              />
            ) : (
              <div className="flex flex-wrap gap-5 mt-8  items-center">
                <div className=" w-full flex flex-wrap gap-2 items-start ">
                  {" "}
                  <h1 className="text-2xl font-medium text-[#ad8d36]">
                    {t("ModalMyPro.Name")} :
                  </h1>{" "}
                  <h1 className=" text-xl text-gray-200  min-w-[80px]  max-w-[72%]">
                    {order.product.product_name}
                  </h1>
                </div>
                <div className=" w-full flex flex-wrap gap-2 items-start ">
                  {" "}
                  <h1 className="text-2xl font-medium text-[#ad8d36]">
                    Order Id :
                  </h1>{" "}
                  <h1 className=" text-xl text-gray-200  min-w-[80px]  max-w-[72%]">
                    {order._id}
                  </h1>
                </div>
                <div className=" w-full flex flex-wrap gap-2 items-start">
                  {" "}
                  <h1 className="text-2xl font-medium text-[#ad8d36]  ">
                    {t("ModalMyPro.Quantity")} :
                  </h1>{" "}
                  <h1 className=" text-xl text-gray-200  min-w-[80px]  max-w-[72%]">
                    {order.product.quantity}
                  </h1>
                </div>
                <div className=" w-full flex flex-wrap gap-2 items-start ">
                  {" "}
                  <h1 className="text-2xl font-medium text-[#ad8d36] ">
                    {t("ModalMyPro.File_Name")} :
                  </h1>{" "}
                  <h1 className=" text-xl text-gray-200  min-w-[80px]  max-w-[72%]">
                    <Link to={order.product.file}>{order.product.file}</Link>
                  </h1>
                </div>
                <h1 className="text-2xl font-medium text-gray-200 w-full my-4 ">
                  Required Data
                </h1>{" "}
                {order.product.data?.map((field) => (
                  <div key={field._id} className=" space-y-3">
                    <div className="w-full flex flex-wrap gap-12 items-start">
                      <div className=" flex items-center gap-2">
                        <h1 className="text-2xl font-medium text-[#ad8d36]">
                          {field.field_name} :
                        </h1>{" "}
                        <h1 className="text-xl text-gray-200  min-w-[80px]  max-w-[72%]">
                          {field.value}
                        </h1>
                      </div>
                    </div>
                    <div className="w-full flex flex-wrap gap-2 items-center"></div>
                  </div>
                ))}
              </div>
            )}
          </Modal>

          <h6 className="text-gray-200 font-manrope  font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
            <button
              onClick={() => showModal("Status")}
              className="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-gray-200"
            >
              <span className="font-bold text-[#000915] text-xl relative z-10 group-hover:text-gray-200 duration-500">
                {t("ModalMyPro.Status")}
              </span>
              <span className="absolute top-0 left-0 w-full bg-gray-200 duration-500 group-hover:-translate-x-full h-full"></span>
              <span className="absolute top-0 left-0 w-full bg-gray-200 duration-500 group-hover:translate-x-full h-full"></span>

              <span className="absolute top-0 left-0 w-full bg-gray-200 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
              <span className="absolute delay-300 top-0 left-0 w-full bg-gray-200 duration-500 group-hover:translate-y-full h-full"></span>
            </button>
          </h6>
          {/* <h6 className="text-gray-200 disabled font-manrope   font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
            <button className=" bg-[#7f6727]  border-2 px-5 py-2 cursor-auto  text-nowrap border-[#7f6727]">
              <span className="font-bold text-gray-200 text-xl mx-2 ">
                {t("ModalMyPro.Received")}
              </span>
              <CheckCircleFilled className=" text-lg" />
            </button>
          </h6> */}
          <Modal
            title={t("ModalMyPro.Status")}
            open={isStatusOpen}
            onOk={() => handleOk("Status")}
            key="status"
            footer={null}
            onCancel={() => handleCancel("Status")}
          >
            {loading ? (
              <Spin
                size="large"
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                      color: "#e5e7eb",
                    }}
                    spin
                  />
                }
              />
            ) : invoiceMsg === "No invoice found for the order." ? (
              <h1 className="mt-9 text-2xl font-bold items-center text-nowrap gap-2">
                <span className="text-[#b99638]">
                  {t("ModalMyPro.StatusOfAccept")} :
                </span>{" "}
                <span className="sm:inline-flex flex flex-wrap items-center gap-2">
                  <h2> {t("ModalMyPro.Waiting")} </h2>
                  <ClockCircleFilled className="text-lg text-[#b99638]" />
                </span>
              </h1>
            ) : (
              <>
                {order.accepted ? (
                  <h1 className="mt-9 text-2xl font-bold items-center text-nowrap gap-2">
                    <span className="text-[#b99638]">
                      {t("ModalMyPro.StatusOfAccept")} :
                    </span>{" "}
                    <span className="sm:inline-flex flex flex-wrap items-center gap-2">
                      <h2> {t("ModalMyPro.Accept")} </h2>
                      <CheckCircleFilled className="text-lg text-green-500" />
                    </span>
                    <div className="flex flex-wrap gap-5 mt-8  items-center">
                      <div className=" w-full flex flex-wrap gap-2 items-center ">
                        {" "}
                        <h1 className="text-2xl font-medium text-[#ad8d36]">
                          Total Cost :
                        </h1>{" "}
                        <h1 className=" text-xl text-gray-200  min-w-[80px]  max-w-[72%]">
                          {invoice?.totalCost}
                        </h1>
                      </div>
                      <div className=" w-full flex flex-wrap gap-2 items-center ">
                        {" "}
                        <h1 className="text-2xl font-medium text-[#ad8d36]">
                          Payment Code :
                        </h1>{" "}
                        <h1 className=" text-xl text-gray-200  min-w-[80px]  max-w-[72%]">
                          {invoice?.paymentCode}
                        </h1>
                      </div>
                      <div className=" w-full flex flex-wrap gap-2 items-center ">
                        {" "}
                        <h1 className="text-2xl font-medium text-[#ad8d36]">
                          Delivery Time :
                        </h1>{" "}
                        <h1 className=" text-xl text-gray-200  min-w-[80px]  max-w-[72%]">
                          {dateOnly}
                        </h1>
                      </div>
                    </div>
                  </h1>
                ) : (
                  <h1 className="mt-9 text-2xl font-bold items-center text-nowrap gap-2">
                    <span className="text-[#b99638]">
                      {t("ModalMyPro.StatusOfAccept")} :
                    </span>{" "}
                    <span className="sm:inline-flex flex flex-wrap items-center gap-2">
                      <h2> {t("ModalMyPro.Deny")} </h2>
                      <CloseCircleFilled className="text-lg text-red-500" />
                    </span>
                  </h1>
                )}
              </>
            )}
            <Steps
              className=" mt-10 "
              current={order.status}
              direction="vertical"
              size="large"
              items={[
                {
                  title: t("ModalMyPro.stat1"),
                },
                {
                  title: t("ModalMyPro.stat2"),
                },
                {
                  title: t("ModalMyPro.stat3"),
                },
                {
                  title: t("ModalMyPro.stat4"),
                },
              ]}
            />
          </Modal>
          <h6 className="text-gray-200 font-manrope  font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
            <button
              onClick={() => showModal("Messages")}
              className="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-[#7f6727] "
            >
              <span className="font-bold text-[#000915] text-xl relative z-10 group-hover:text-gray-200 duration-500">
                Messages
              </span>
              <span className="absolute top-0 left-0 w-full bg-[#7f6727] duration-500 group-hover:-translate-x-full h-full"></span>
              <span className="absolute top-0 left-0 w-full bg-[#7f6727] duration-500 group-hover:translate-x-full h-full"></span>

              <span className="absolute top-0 left-0 w-full bg-[#7f6727] duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
              <span className="absolute delay-300 top-0 left-0 w-full bg-[#7f6727] duration-500 group-hover:translate-y-full h-full"></span>
            </button>
          </h6>
          <Modal
            title="Messages"
            open={isMsgOpen}
            onOk={() => handleOk("Messages")}
            key="Messages"
            footer={null}
            onCancel={() => handleCancel("Messages")}
          >
            {state === "loading" ? (
              <Spin
                size="large"
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                      color: "#e5e7eb",
                    }}
                    spin
                  />
                }
              />
            ) : (
              <div className="block space-y-3 gap-2.5 mt-9 ">
                {order.adminMessages.length > 0 ? (
                  order.adminMessages.map((msg, index) => (
                    <div
                      key={index}
                      className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
                    >
                      <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                        {msg}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className=" font-bold text-xl">No Messages</p>
                )}
              </div>
            )}
          </Modal>
          <></>
        </div>
      </div>
    </>
  );
}
