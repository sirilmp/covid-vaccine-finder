import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import getDate from "../constant/dateGenerator";
function NotifyMe() {
  const PINCode = localStorage.getItem("PIN_code");
  const doseId = localStorage.getItem("dose_id");
  const ageLimit = localStorage.getItem("age_limit");
  const vaccine = localStorage.getItem("vaccine");
  const [outData, setOutData] = useState([]);
  const [loading, setLoading] = useState(false);

  let totalDose = 0;
  let timerInterval;
  const history = useHistory();

  if(PINCode=== null){
    history.push('/')
  }

  //get API

  async function getData() {
    setLoading(true);
    await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${PINCode}&date=${getDate()}`
    )
      .then((response) => {
        response.json().then((data) => {
          setOutData(data.centers);

          if (data.centers) {
            if (data.centers && data.centers.length === 0) {
              Swal.fire({
                title: "Auto Refreshing !",
                html: `Refresh in <b></b>. <br><br>Do you want cancel auto searching, <span class='text-iconColor-black font-semibold'>PIN:</span> <span class='text-red-red font-bold'> ${PINCode}<span/> <span class='font-normal text-iconColor-black opacity-70'>&</span> <span class='text-iconColor-black font-semibold'>Dose:</span> ${doseId}`,
                timer: 360000,
                timerProgressBar: true,
                allowOutsideClick: false,
                confirmButtonText: "Cancel",
                backdrop: "rgb(0,0,0,0.8)",
                buttonsStyling: false,
                confirmButtonClass: "alert_button bg-gray-300",

                didOpen: () => {
                  // Swal.showLoading();
                  timerInterval = setInterval(() => {
                    const content = Swal.getHtmlContainer();
                    if (content) {
                      const b = content.querySelector("b");
                      if (b) {
                        var time = Swal.getTimerLeft() / 60000;
                        b.textContent = time.toFixed(2);
                      }
                    }
                  }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                  window.location.reload();
                }
                if (result.isConfirmed) {
                  localStorage.clear();
                  Swal.fire({
                    title: "Canceled !",
                    allowOutsideClick: false,
                    text: "Auto search canceled successfully.",
                    buttonsStyling: false,
                    confirmButtonClass: "alert_button",
                    backdrop: "rgb(0,0,0,0.8)",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      history.push("/");
                    }
                  });
                }
              });
            }
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          timer: 60000,
          title: `<p class="text-red-red font-mono opacity-60">Connection failed !</p>`,
          backdrop: "rgb(0,0,0,0.8)",

          html: `<p class="font-mono text-iconColor-black">Please check you're internet connection & refresh manually. <iframe title="title alert_sound" class='w-0' src="../images/alert_sound.mp3" allow="autoplay"></iframe></p> `,
          buttonsStyling: false,
          confirmButtonClass: "alert_button bg-red-red opacity-60",
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            window.location.reload();
          }
        });
      });

    setLoading(false);
  }

  useEffect( () => {
    getData();
  }, []);

  outData.map((items) => {
    for (let i = 0; i < items.sessions.length; i++) {
     // console.log(items.sessions[i]);
      // console.log("loop 1");
      //console.log(vaccine, items.sessions[i].vaccine);

      if (vaccine) {
        if (vaccine === items.sessions[i].vaccine) {
          if (ageLimit === "18") {
            if (items.sessions[i].min_age_limit <= 44) {
              if (doseId === "2") {
                if (items.sessions[i].available_capacity_dose2 > 0) {
                  //console.log("dose is ready");
                  totalDose =
                    items.sessions[i].available_capacity_dose2 + totalDose;
                }
              } else if (doseId === "1") {
                if (items.sessions[i].available_capacity_dose1 > 0) {
                  //console.log("dose is ready");
                  totalDose =
                    items.sessions[i].available_capacity_dose1 + totalDose;
                }
              } else if (!doseId) {
                if (items.sessions[i].available_capacity > 0) {
                  //console.log("dose is ready");
                  totalDose = items.sessions[i].available_capacity + totalDose;
                }
              }
            }
          }

          if (ageLimit === "45") {
            if (items.sessions[i].min_age_limit >= 45) {
              if (doseId === "2") {
                if (items.sessions[i].available_capacity_dose2 > 0) {
                  //console.log("dose is ready");
                  totalDose =
                    items.sessions[i].available_capacity_dose2 + totalDose;
                }
              } else if (doseId === "1") {
                if (items.sessions[i].available_capacity_dose1 > 0) {
                  //console.log("dose is ready");
                  totalDose =
                    items.sessions[i].available_capacity_dose1 + totalDose;
                }
              } else if (!doseId) {
                if (items.sessions[i].available_capacity > 0) {
                  //console.log("dose is ready");
                  totalDose = items.sessions[i].available_capacity + totalDose;
                }
              }
            }
          }

          if (!ageLimit) {
            if (doseId === "2") {
              if (items.sessions[i].available_capacity_dose2 > 0) {
                //console.log("dose is ready");
                totalDose =
                  items.sessions[i].available_capacity_dose2 + totalDose;
              }
            } else if (doseId === "1") {
              if (items.sessions[i].available_capacity_dose1 > 0) {
                //console.log("dose is ready");
                totalDose =
                  items.sessions[i].available_capacity_dose1 + totalDose;
              }
            } else if (!doseId) {
              if (items.sessions[i].available_capacity > 0) {
                //console.log("dose is ready");
                totalDose = items.sessions[i].available_capacity + totalDose;
              }
            }
          }
        }
      } else if (!vaccine) {
        if (ageLimit === "18") {
          if (items.sessions[i].min_age_limit <= 44) {
            if (doseId === "2") {
              if (items.sessions[i].available_capacity_dose2 > 0) {
                //console.log("dose is ready");
                totalDose =
                  items.sessions[i].available_capacity_dose2 + totalDose;
              }
            } else if (doseId === "1") {
              if (items.sessions[i].available_capacity_dose1 > 0) {
                //console.log("dose is ready");
                totalDose =
                  items.sessions[i].available_capacity_dose1 + totalDose;
              }
            } else if (!doseId) {
              if (items.sessions[i].available_capacity > 0) {
                //console.log("dose is ready");
                totalDose = items.sessions[i].available_capacity + totalDose;
              }
            }
          }
        }

        if (ageLimit === "45") {
          if (items.sessions[i].min_age_limit >= 45) {
            if (doseId === "2") {
              if (items.sessions[i].available_capacity_dose2 > 0) {
                //console.log("dose is ready");
                totalDose =
                  items.sessions[i].available_capacity_dose2 + totalDose;
              }
            } else if (doseId === "1") {
              if (items.sessions[i].available_capacity_dose1 > 0) {
                //console.log("dose is ready");
                totalDose =
                  items.sessions[i].available_capacity_dose1 + totalDose;
              }
            } else if (!doseId) {
              if (items.sessions[i].available_capacity > 0) {
                //console.log("dose is ready");
                totalDose = items.sessions[i].available_capacity + totalDose;
              }
            }
          }
        }

        if (!ageLimit) {
          if (doseId === "2") {
            if (items.sessions[i].available_capacity_dose2 > 0) {
              //console.log("dose is ready");
              totalDose =
                items.sessions[i].available_capacity_dose2 + totalDose;
            }
          } else if (doseId === "1") {
            if (items.sessions[i].available_capacity_dose1 > 0) {
              //console.log("dose is ready");
              totalDose =
                items.sessions[i].available_capacity_dose1 + totalDose;
            }
          } else if (!doseId) {
            if (items.sessions[i].available_capacity > 0) {
              //console.log("dose is ready");
              totalDose = items.sessions[i].available_capacity + totalDose;
            }
          }
        }
      }
      // console.log(ageLimit);
    }

    //console.log(totalDose);
    if (!doseId) {
     // console.log("dose id");
    } else {
      //console.log("no dose id");
    }
    //console.log("after for loop");

    if (totalDose !== 0) {
      Swal.fire({
        icon: "success",
        title: `<span class="text-iconColor-lightGreen font-mono">Hurry up !</span>`,
        html: `<span class='text-red-red font-mono'>PIN: ${PINCode}, Dose: ${
          doseId ? doseId : "All results"
        } </span><span class='text-iconColor-black font-mono'>is ready for book </span> <span class="text-red-red font-mono">Available Doses: ${totalDose}</span>  <iframe title="title alert_sound" class='w-0' src="../images/alert_sound.mp3" allow="autoplay" allow="loop"></iframe>`,
        backdrop: "rgb(0,0,0,0.8)",
        showCancelButton: true,
        cancelButtonText: "Book later",
        cancelButtonClass: "alert_button bg-gray-300 ml-2 text-iconColor-black",
        buttonsStyling: false,
        showConfirmButton: true,
        confirmButtonClass: "alert_button",
        confirmButtonText: "Book Now",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "https://selfregistration.cowin.gov.in/";
          localStorage.clear();
        }
        if (result.isDismissed) {
          localStorage.clear();
          history.push("/");
        }
      });
    } else if (totalDose === 0 || outData[0]) {
      Swal.fire({
        title: "Auto Refreshing !",
        html: `<p class='font-mono'>Refresh in <b></b><br><br>Do you want cancel auto searching, <span class='text-iconColor-black font-semibold'>PIN:</span> <span class='text-red-red font-bold'> ${PINCode}<span/> , <span class='text-iconColor-black font-semibold'> <span class="text-red-red font-semibold">Dose: ${doseId? doseId : "All"}</span>, <span class="text-red-red font-semibold">Age limit: ${ageLimit? ageLimit>=45? "45+": "18-44" : "All"}</span> <span class='font-normal text-iconColor-black opacity-70'>&</span> <span class="text-red-red font-semibold">Vaccine: ${vaccine? vaccine : "All"}</span>.</p>`,
        timer: 360000,
        timerProgressBar: true,
        allowOutsideClick: false,
        confirmButtonText: "Cancel",
        backdrop: "rgb(0,0,0,0.8)",
        buttonsStyling: false,
        confirmButtonClass: "alert_button bg-gray-300",

        didOpen: () => {
          // Swal.showLoading();
          timerInterval = setInterval(() => {
            const content = Swal.getHtmlContainer();
            if (content) {
              const b = content.querySelector("b");
              if (b) {
                var time = Swal.getTimerLeft() / 60000;
                b.textContent = time.toFixed(2);
              }
            }
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.reload();
        }
        if (result.isConfirmed) {
          localStorage.clear();
          Swal.fire({
            title: "Canceled !",
            allowOutsideClick: false,
            html: "<p class='font-mono'>Auto search canceled successfully.</p>",
            buttonsStyling: false,
            confirmButtonClass: "alert_button",
            backdrop: "rgb(0,0,0,0.8)",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/");
            }
          });
        }
      });
    }
  });


  const cancel_home=(e)=>{
e.preventDefault()
localStorage.clear();
history.push("/");
  }

  return (
    <div className="">
      <nav
        className={`z-10 flex justify-between p-3 md:px-5 lg:px-10 items-center bg-iconColor-white flex-grow top-0 sticky transform translate duration-150 `}
      >
        <a href="/">
          <img
            className="w-12 cursor-pointer"
            src="../images/logo.png"
            alt="logo"
          />
        </a>
        <button className="text-iconColor-white font-mono bg-iconColor-lightBlue rounded-md p-2 font-semibold transform translate duration-150 hover:scale-105 focus:scale-y-105 hover:bg-opacity-80 cursor-pointer focus:outline-none focus:bg-opacity-80">
          <a onClick={cancel_home} href="/">Cancel</a>
        </button>
      </nav>
      <div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 sm:gap-1 p-2 sm:px-5 mt-10 items-center justify-between w-full overflow-hidden mb-14">
          <div className=" flex items justify-center items-center h-20 ">
            <h2 className="text-5xl font_banner_main text-iconColor-lightBlue font-bold tracking-wide">
              Searching
            </h2>
            <div className="w-16 ml-1 text-center mt-7">
              <div class="load-wrapp">
                <div class="load-1">
                  <div class="line"></div>
                  <div class="line"></div>
                  <div class="line"></div>
                </div>
              </div>
            </div>
          </div>
          <img
            className=" sm:w-full sm:h-full max-w-md object-cover w-180"
            src="../images/notify_bg.jpg"
            alt="banner img"
          />
        </div>
      </div>

      {loading ? (
        <>
          <div class="multi-spinner-container">
            <div class="multi-spinner">
              <div class="multi-spinner">
                <div class="multi-spinner">
                  <div class="multi-spinner">
                    <div class="multi-spinner">
                      <div class="multi-spinner"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default NotifyMe;
