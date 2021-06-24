import React from "react";
import Navbar from "./Navbar";

function Banner() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 sm:gap-1 p-2 sm:px-5 mt-10 items-center justify-between w-full overflow-hidden mb-14">
        <div className=" flex items justify-center items-baseline ">
          <h2 className="text-5xl font_banner_main text-iconColor-lightBlue font-bold tracking-wide">
            Find Your
          </h2>
          <h5 className="text-2xl ml-5 sm:ml-2 md:ml-5 sm:mt-2 font_banner_sub text-iconColor-lightGreen font-bold leading-10 tracking-wide">
            Vaccine
          </h5>
        </div>
        <img
          className=" sm:w-full sm:h-full object-cover w-180"
          src="../images/banner.jpg"
          alt="banner image"
        />
      </div>
    </div>
  );
}

export default Banner;
