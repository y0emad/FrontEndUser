import "../../index.css";
export function About() {
  return (
    <>
      <div className="grid grid-cols-2 justify-items-center items-center">
        <div className="  relative ms-auto ">
          <div className=" w-[51px] h-[51px] rounded-full bg-[#504000] absolute top-16 left-[-1]  z-30"></div>
          <div className=" w-[103px] h-[103px] rounded-full bg-[#000915] absolute left-3 top-3 z-20"></div>
          <div className=" w-[81px] h-[81px] rounded-full bg-gray-200 absolute left-3  top-0 z-10"></div>
          <div className=" w-[85px] h-[74px] blur-3xl bg-[#504000] absolute left-7 top-2"></div>
          <div className=" w-[85px] h-[74px] blur-3xl bg-[#504000] absolute left-7 top-8"></div>
          <div className=" w-[85px] h-[74px] blur-3xl bg-[#504000] absolute left-52 top-2"></div>
          <div className=" relative z-50 top-10 left-14 text-gray-200 text-3xl font-bold text-wrap  w-1/2 ">
            Start your business with your own brand from here.
          </div>
        </div>
        <div className=" bg-white">yousef</div>
      </div>
    </>
  );
}
