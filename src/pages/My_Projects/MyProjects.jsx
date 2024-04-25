import ModalMyPro from "../../components/ModalMyPro";
export function MyProjects() {
  return (
    <div>
      {" "}
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-gray-200">
            My Projects
          </h2>
          <div className="hidden lg:grid grid-cols-2 py-6">
            <div className="font-normal text-xl leading-8 text-gray-200">
              Product
            </div>
            <p className="font-normal text-xl leading-8 text-gray-200 justify-evenly flex items-center  ">
              <span className="w-full max-w-[176px] text-center">Details</span>
              <span className="w-full max-w-[176px] text-center">Status</span>
            </p>
          </div>

          <ModalMyPro num={1} />
          <ModalMyPro num={2} />
        </div>
      </section>
    </div>
  );
}
