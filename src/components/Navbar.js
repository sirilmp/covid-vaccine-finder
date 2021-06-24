import React, { useEffect, useState } from "react";



function Navbar() {

    const [showShadow,setShowShadow]=useState()

    const transitionNavBar = () => {
        if (window.scrollY > 60) {
            setShowShadow(true);
        } else {
            setShowShadow(false);
        }
      };

      useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => {
          window.removeEventListener("scroll", transitionNavBar);
        };
      }, []);
    
    
  return (
    <nav className={`z-10 flex justify-between p-3 md:px-5 lg:px-10 items-center bg-iconColor-white flex-grow top-0 sticky transform translate duration-150 ${ showShadow && "shadow-xl transform translate duration-150"}`}>
     <a href="/">
     <img className="w-12 cursor-pointer" src="../images/logo.png" alt="logo" />
     </a>
      <button className="text-iconColor-white font-mono bg-iconColor-lightBlue rounded-md p-2 font-semibold transform translate duration-150 hover:scale-105 focus:scale-y-105 hover:bg-opacity-80 cursor-pointer focus:outline-none focus:bg-opacity-80">
         <a href="https://selfregistration.cowin.gov.in/">Register Vaccine</a>
      </button>
    </nav>
  );
}

export default Navbar;


// $(document).ready(function(){
//     $(window).scroll(function(){
//         var scroll = $(window).scrollTop();
//         if (scroll > 50) {
//           $(".navbar").css('bg-iconColor-lightBlue');
//         }
//     })
//   })