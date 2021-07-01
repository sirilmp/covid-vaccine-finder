import React, { useState } from "react";
import Swal from "sweetalert2";
import getDate from "../constant/dateGenerator";
import { XIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";


function InputForm() {
  const [searchByPIN, setSearchByPIN] = useState(true);
  const [searchByDistrict, setSearchByDistrict] = useState(false);
  const [PINCode, setPINCode] = useState("");
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [districtCode, setDistrictCode] = useState("");
  const [autoChecker, setAutoChecker] = useState(false);
  const [notifyMe, setNotifyMe] = useState(false);
  const [doseCode, setDoseCode] = useState("");
  
  const [ageLimit, setAgeLimit] = useState("");
  const [vaccine, setVaccine] = useState("");

  const history = useHistory();

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "....." : string;
  }

  const searchByPINClick = (e) => {
    e.preventDefault();
    setSearchByPIN(true);
    setSearchByDistrict(false);
    setNotifyMe(false);
    setAutoChecker(false);
    setData([]);
    setWarning("");
    setLoading(false);
    setMessage("");
    setDoseCode("");
    
  };

  const searchByDistrictClick = (e) => {
    e.preventDefault();
    setSearchByPIN(false);
    setNotifyMe(false);
    setAutoChecker(false);
    setSearchByDistrict(true);
    setData([]);
    setAllDistricts([]);
    setWarning("");
    setLoading(false);
    setMessage("");
    setDoseCode("");
    
  };

  const inputPINBtn = async (e) => {
    e.preventDefault();
    if (!PINCode) {
      setWarning("Please enter your PIN Code !");
    } else {
      setWarning("");
      setPINCode("");
      setLoading(true);
      await fetch(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${PINCode}&date=${getDate()}`
      )
        .then((response) => {
          response.json().then((data) => {
            //console.log(data);
            setLoading(false);
            if (data.centers) {
              if (data.centers && data.centers.length === 0) {
                Swal.fire({
                  icon: "error",
                  title: `<p class="text-red-red font-mono opacity-60">Error !</p>`,
                  backdrop: "rgb(0,0,0,0.8)",
                  text: "No vaccination center !",
                  confirmButtonText: "OK",
                  buttonsStyling: false,
                  confirmButtonClass: "alert_button bg-red-red opacity-60",
                });
                setData([]);
              } else {
                setMessage("Available centers are...");
                setData(data.centers);
              }
            } else if (data.error) {
              Swal.fire({
                icon: "error",
                title: `<p class="text-red-red font-mono opacity-60">Error !</p>`,
                text: data.error,
                backdrop: "rgb(0,0,0,0.8)",
                confirmButtonText: "OK",
                buttonsStyling: false,
                confirmButtonClass: "alert_button bg-red-red opacity-60",
              });
              setData([]);
            } else {
              Swal.fire({
                icon: "error",
                title: `<p class="text-red-red font-mono opacity-60">Error !</p>`,
                backdrop: "rgb(0,0,0,0.8)",
                text: "Something want wrong please try latter !",
                confirmButtonText: "OK",
                buttonsStyling: false,
                confirmButtonClass: "alert_button bg-red-red opacity-60",
              });
              setData([]);
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: `<p class="text-red-red font-mono opacity-60">Error !</p>`,
            backdrop: "rgb(0,0,0,0.8)",
            html: `<p class="font-mono text-iconColor-black">Please check you're connection & try agin.</p>`,
            buttonsStyling: false,
            confirmButtonClass: "alert_button bg-red-red opacity-60",
          });
          setLoading(false);
        });
    }
  };

  const inputDistrictOptions = async (e) => {
    e.preventDefault();
    setData([]);
    setMessage("");
    await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/17`)
      .then((response) => {
        response.json().then((data) => {
          setAllDistricts(data.districts);
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: `<p class="text-red-red font-mono opacity-60">Error !</p>`,
          backdrop: "rgb(0,0,0,0.8)",
          buttonsStyling: false,
          html: `<p class="font-mono text-iconColor-black">Please check you're connection & try agin.</p>`,
          confirmButtonClass: "alert_button bg-red-red opacity-60",
        });
      });
  };

  const inputDistrictBtn = async (e) => {
    e.preventDefault();
    if (!districtCode) {
      setWarning("Please select a district !");
    } else {
      setWarning("");
      // setDistrictCode("");
      setLoading(true);
      await fetch(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtCode}&date=${getDate()}`
      )
        .then((response) => {
          response.json().then((data) => {
            //console.log(data);
            setLoading(false);
            if (data.centers) {
              if (data.centers && data.centers.length === 0) {
                Swal.fire({
                  icon: "error",
                  title: `<p class="text-red-red font-mono opacity-60">Error !</p>`,
                  backdrop: "rgb(0,0,0,0.8)",
                  text: "No vaccination center are available !",
                  confirmButtonText: "OK",
                  buttonsStyling: false,
                  confirmButtonClass: "alert_button bg-red-red opacity-60",
                });
                setData([]);
              } else {
                setMessage("Available centers are...");
                setData(data.centers);
              }
            } else if (data.error) {
              Swal.fire({
                icon: "error",
                title: `<p class="text-red-red font-mono opacity-60">Error !</p>`,
                backdrop: "rgb(0,0,0,0.8)",
                text: data.error,
                confirmButtonText: "OK",
                buttonsStyling: false,
                confirmButtonClass: "alert_button bg-red-red opacity-60",
              });
              setData([]);
            } else {
              Swal.fire({
                icon: "error",
                title: `<p class="text-red-red font-mono opacity-60">Error !</p>`,
                backdrop: "rgb(0,0,0,0.8)",
                text: "Something want wrong please try latter !",
                confirmButtonText: "OK",
                buttonsStyling: false,
                confirmButtonClass: "alert_button bg-red-red opacity-60",
              });
              setData([]);
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: `<p class="text-red-red font-mono opacity-60">Error !</p>`,
            html: `<p class="font-mono text-iconColor-black">Please check you're connection & try agin.</p>`,
            buttonsStyling: false,
            backdrop: "rgb(0,0,0,0.8)",
            confirmButtonClass: "alert_button bg-red-red opacity-60",
          });
          setLoading(false);
        });
    }
  };

  const notifyMeBtn = () => {
    setNotifyMe(true);
    setSearchByDistrict(false);
    setSearchByPIN(false);
    setAutoChecker(true);
    setData([]);
    setWarning("");
    setMessage("");
    setLoading(false);
    
    Swal.fire({
      icon: "warning",
      title: "How to use ?",
      html: `<p>Are you a new user ? ,then check <a class='text-iconColor-lightBlue ' href='/howtouse'>How to use ?</a> other wise ignore it. </p>`,
      confirmButtonText: "OK",
      buttonsStyling: false,
      confirmButtonClass: "alert_button",
      backdrop: "rgb(0,0,0,0.8)",
    });
  };

  const checkNotify = async (e) => {
    e.preventDefault();
    // console.log(PINCode, doseCode);
    if (!PINCode) {
      setWarning("Please enter your PIN Code !");
    } else {
      setWarning("");
      // setPINCode("");
      setLoading(true);
      await fetch(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${PINCode}&date=${getDate()}`
      )
        .then((response) => {
          response.json().then((data) => {
            //console.log(data);
            setLoading(false);
            if (data.centers) {
              if (data.centers && data.centers.length === 0) {
                Swal.fire({
                  icon: "warning",
                  title: "Searching...",
                  backdrop: "rgb(0,0,0,0.8)",
                  html: `<p class='font-mono text-iconColor-black'>Searching with <span class="text-red-red font-semibold">PIN: ${PINCode}</span>, <span class="text-red-red font-semibold">Dose: ${doseCode? doseCode : "All"}</span>, <span class="text-red-red font-semibold">Age limit: ${ageLimit? ageLimit>=45? "45+": "18-44" : "All"}</span> & <span class="text-red-red font-semibold">Vaccine: ${vaccine? vaccine : "All"}</span>.</p>`,
                  confirmButtonText: "Notify Me",
                  showCancelButton: true,
                  cancelButtonClass:
                    "alert_button bg-gray-300 ml-3 text-iconColor-black",
                  buttonsStyling: false,
                  confirmButtonClass: "alert_button",
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.setItem("PIN_code", PINCode);
                    localStorage.setItem("dose_id", doseCode);
                    localStorage.setItem("age_limit", ageLimit);
                    localStorage.setItem("vaccine", vaccine);
                    history.push("/notifyme");
                  }
                });
                setData([]);
                setMessage("");
              } else {
                // setMessage("Available centers are...");
                // //  alert('hai')
                // setData(data.centers);
                // setShowStartSearch(true);
                Swal.fire({
                  icon: "warning",
                  title: "Searching...",
                  backdrop: "rgb(0,0,0,0.8)",
                  html: `<p class='font-mono text-iconColor-black'>Searching with <span class="text-red-red font-semibold">PIN: ${PINCode}</span>, <span class="text-red-red font-semibold">Dose: ${doseCode? doseCode : "All"}</span>, <span class="text-red-red font-semibold">Age limit: ${ageLimit? ageLimit>=45? "45+": "18-44" : "All"}</span> & <span class="text-red-red font-semibold">Vaccine: ${vaccine? vaccine : "All"}</span>.</p>`,
                  confirmButtonText: "Notify Me",
                  showCancelButton: true,
                  cancelButtonClass:
                    "alert_button bg-gray-300 ml-3 text-iconColor-black",
                  buttonsStyling: false,
                  confirmButtonClass: "alert_button",
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.setItem("PIN_code", PINCode);
                    localStorage.setItem("dose_id", doseCode);
                    localStorage.setItem("age_limit", ageLimit);
                    localStorage.setItem("vaccine", vaccine);
                    history.push("/notifyme");
                  }
                });
              }
            } else if (data.error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.error,
                backdrop: "rgb(0,0,0,0.8)",
                confirmButtonText: "OK",
                buttonsStyling: false,
                confirmButtonClass: "alert_button",
              });
              setData([]);
              setMessage("");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                backdrop: "rgb(0,0,0,0.8)",
                text: "Something want wrong please try latter !",
                confirmButtonText: "OK",
                buttonsStyling: false,
                confirmButtonClass: "alert_button",
              });
              setData([]);
              setMessage("");
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: `<p class="text-red-red font-mono opacity-60">Error !</p>`,
            html: `<p class="font-mono text-iconColor-black">Please check you're connection & try agin.</p>`,
            buttonsStyling: false,
            backdrop: "rgb(0,0,0,0.8)",
            confirmButtonClass: "alert_button bg-red-red opacity-60",
          });
          setLoading(false);
        });
    }
  };

  return (
    <div className="">

      <div
        className={` sticky top-16 grid text-center bg-iconColor-lightGreen z-50 mb-10`}
      >
        <div className="">
          <button
            className={` mb-3 mt-3 md:mb-1 p-2 focus:outline-none rounded-full text_color_white border font-bold font-mono ml-1 max-w-sm transform translate duration-150 hover:scale-105 hover:bg-opacity-80 mr-2 ${
              searchByPIN && "bg-iconColor-white text-iconColor-lightGreen"
            }`}
            onClick={searchByPINClick}
          >
            Search by PIN
          </button>
          <button
            className={`mb-3 mt-3 md:mb-1 p-2 focus:outline-none rounded-full text_color_white border font-bold font-mono ml-1 max-w-sm transform translate duration-150 hover:scale-105 hover:bg-opacity-80 ${
              searchByDistrict && "bg-iconColor-white text-iconColor-lightGreen"
            }`}
            onClick={searchByDistrictClick}
          >
            Search by District
          </button>
          <button
            className={` mb-3 mt-3  p-2 ml-3 focus:outline-none rounded-full text_color_white border font-bold font-mono max-w-sm transform translate duration-150 hover:scale-105 hover:bg-opacity-80 ${
              notifyMe && "bg-iconColor-white text-iconColor-lightGreen"
            }`}
            onClick={notifyMeBtn}
          >
            Notify Me
          </button>
        </div>
      </div>

      {/* search by PIN active this code */}
      <div
        className={`grid text-center mb-8 px-2 ${
          searchByPIN ? "inline" : "hidden "
        }`}
      >
        <p className="text-red-red mb-3 font-mono font-semibold">{warning}</p>
        <form>
          <input
            className={`mr-4 h-12 mb-2 border-2 border-iconColor-lightGreen rounded-lg px-2 placeholder-iconColor-black font-mono focus:outline-none pr-10`}
            type="number"
            placeholder="PIN CODE"
            onChange={(e) => {
              setPINCode(e.target.value);
            }}
            value={PINCode}
          />
          {loading ? (
            <button
              className="focus:outline-none cursor-not-allowed absolute"
              disabled
            >
              <img
                className="bg-iconColor-lightGreen rounded-full w-10 relative p-1 animate-spin"
                src="../images/loading_spinner.png"
                alt="loading"
              />
            </button>
          ) : (
            <button
              className={`text-iconColor-white font-mono bg-iconColor-lightGreen rounded-md p-2 font-semibold transform translate duration-150 hover:scale-105 hover:bg-opacity-80 cursor-pointer focus:outline-none focus:bg-opacity-80`}
              onClick={inputPINBtn}
            >
              Search
            </button>
          )}
        </form>
      </div>

      {/* search by district active this code */}

      <div
        className={`grid text-center mb-8 px-2 bg-iconColor-white z-50 ${
          searchByDistrict ? "inline" : "hidden "
        }`}
      >
      <p className="text-red-red mb-3 font-mono font-semibold">{warning}</p>
        <form>
          <select
            onClick={inputDistrictOptions}
            onChange={(e) => {
              setDistrictCode(e.target.value);
            }}
            className="custom_selector mr-4 mb-3 cursor-pointer font-mono h-12 pl-3 pr-6 text-base border-iconColor-lightGreen  placeholder-gray-600 border-2 rounded-lg appearance-none focus:outline-none"
          >
            <option value="">Select a District</option>
            {allDistricts.map((district) => {
              return (
                // console.log(district),
                <option value={district.district_id}>
                  {district.district_name}
                </option>
              );
            })}
          </select>
          {loading ? (
            <button
              className="focus:outline-none mb-3 cursor-not-allowed absolute z-0"
              disabled
            >
              <img
                className="bg-iconColor-lightGreen rounded-full w-10 relative p-1 animate-spin"
                src="../images/loading_spinner.png"
                alt="loading"
              />
            </button>
          ) : (
            <button
              className={`text-iconColor-white mb-3 font-mono bg-iconColor-lightGreen rounded-md p-2 font-semibold transform translate duration-150 hover:scale-105 hover:bg-opacity-80 cursor-pointer focus:outline-none focus:bg-opacity-80`}
              onClick={inputDistrictBtn}
            >
              Search
            </button>
          )}
        </form>
      </div>

      {/* notify me active */}

      <div
        className={`grid text-center mb-8 px-2 ${
          autoChecker ? "inline" : "hidden "
        }`}
      >
        <p className="text-red-red mb-3 font-mono font-semibold">{warning}</p>
        <form>
          <input
            className={`mr-4 mb-2  w-36 h-12 border-2 border-iconColor-lightGreen rounded-lg px-2 placeholder-iconColor-black font-mono focus:outline-none pr-10`}
            type="number"
            placeholder="PIN CODE"
            onClick={() => {
              setPINCode("");
              setData([]);
              setMessage("");
            }}
            onChange={(e) => {
              setPINCode(e.target.value);
            }}
            value={PINCode}
          />
          <select
            className="mr-4 mb-2  cursor-pointer font-mono h-12 pl-3 pr-6 text-base border-iconColor-lightGreen  placeholder-gray-600 border-2 rounded-lg appearance-none focus:outline-none"
            onChange={(e) => setDoseCode(e.target.value)}
          >
            <option value="">DOSE</option>
            <option value="1">Dose 1</option>
            <option value="2">Dose 2</option>
          </select>

          <select
            className="mr-4 mb-2  cursor-pointer font-mono h-12 pl-3 pr-6 text-base border-iconColor-lightGreen  placeholder-gray-600 border-2 rounded-lg appearance-none focus:outline-none"
            onChange={(e) => setAgeLimit(e.target.value)}
          >
            <option value="">AGE</option>
            <option value="18">18-44</option>
            <option value="45">45+</option>
          </select>

          <select
            className="mr-4 mb-2 cursor-pointer font-mono h-12 pl-3 pr-6 text-base border-iconColor-lightGreen  placeholder-gray-600 border-2 rounded-lg appearance-none focus:outline-none"
            onChange={(e) => setVaccine(e.target.value)}
          >
            <option value="">VACCINE</option>
            <option value="COVISHIELD">COVISHIELD</option>
            <option value="COVAXIN">COVAXIN</option>
          </select>

          {loading ? (
            <button
              className="focus:outline-none cursor-not-allowed absolute"
              disabled
            >
              <img
                className="bg-iconColor-lightGreen rounded-full w-10 relative p-1 animate-spin"
                src="../images/loading_spinner.png"
                alt="loading"
              />
            </button>
          ) : (
            <button
              className={`text-iconColor-white font-mono bg-iconColor-lightGreen rounded-md p-2 font-semibold transform translate duration-150 hover:scale-105 hover:bg-opacity-80 cursor-pointer focus:outline-none focus:bg-opacity-80`}
              onClick={checkNotify}
            >
              Check
            </button>
          )}
        </form>
      </div>

      <div className="bg-iconColor-lightBlue mb-12">
        <p className="py-3 text-center text-iconColor-white">{message}</p>
      </div>
      <div className=''>
      {data.length > 0
        ? data.map((item) => {
            return (
              //console.log(item),
              
                <div className="w-auto  overflow-scroll scroll_bar_style mb-10 ml-1 mr-1">
                <table className="cursor-pointer">
                  <tbody>
                    <tr className=" white_space_style">
                      <td className="md:sticky font-mono left-0 bg-iconColor-lightGreenOP20 hover:bg-iconColor-lightGreenOP30 text-iconColor-black p-2 border">
                        Date
                      </td>
                      {item.sessions.map((session) => {
                        return (
                          //console.log(session),
                          <td className="font-mono p-2 border-l border-t border-r">
                            {session.date} <br />
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="white_space_style">
                      <div className="md:sticky left-0">
                        <tr>
                          <td className="leading-10  font-mono bg-iconColor-lightGreenOP20 hover:bg-iconColor-lightGreenOP30 text-iconColor-black  p-2 border-b border-l ">
                            {item.name}
                            <td className="whitespace-normal">
                              {truncate(item.address, 30)}
                            </td>
                            <td>{item.district_name},</td>
                            <td>{item.state_name},</td>
                            <td>{item.pincode}</td>
                            <br />

                            {item.fee_type === "Paid" ? (
                              <td className="align-middle text-center bg-iconColor-lightBlue p-2 rounded-lg text-iconColor-white">
                                {item.fee_type}
                              </td>
                            ) : (
                              <td className="align-middle text-center bg-iconColor-lightGreen p-2 rounded-lg text-iconColor-white">
                                {item.fee_type}
                              </td>
                            )}

                            {item.vaccine_fees
                              ? item.vaccine_fees.map((fee) => {
                                  return (
                                    // console.log(fee),
                                    <td className="align-middle text-center bg-iconColor-lightBlue p-2 rounded-lg text-iconColor-white">
                                      RS&#32;{fee.fee}/-
                                    </td>
                                  );
                                })
                              : null}
                          </td>
                        </tr>
                      </div>

                      {item.sessions.map((session) => {
                        return (
                          //console.log(session),
                          <td className="font-mono p-2 border border-gray-200 text-center align-top leading-8 ">
                            <div>
                              <td className="bg-iconColor-lightGreen p-2 text-iconColor-lightGreenOP20 px-2 rounded-lg">
                                Age {session.min_age_limit>=45 ? "45+":"18-45"}
                              </td>
                              <td className="bg-iconColor-lightGreen p-2 text-iconColor-lightGreenOP20 px-2 rounded-lg">
                                {session.vaccine}
                              </td>
                            </div>
                              <div className="grid grid-cols-2 gap-2 mt-3 place-items-center">
                                <td className="bg-iconColor-lightBlue text-iconColor-white p-2 rounded-lg">
                                  Dose 1
                                </td>

                                {session.available_capacity_dose1 === 0 ? (
                                  <XIcon className="h-5 text-red-red" />
                                ) : (
                                  <p>{session.available_capacity_dose1}</p>
                                )}

                                <td className="bg-iconColor-lightBlue p-2 rounded-lg text-iconColor-white">
                                  Dose 2
                                </td>
                                {session.available_capacity_dose2 === 0 ? (
                                  <XIcon className="h-5 text-red-red" />
                                ) : (
                                  <p>{session.available_capacity_dose2}</p>
                                )}
                              </div>
                       
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            
            );
          })
        : null}
          </div>
    </div>
  );
}

export default InputForm;
