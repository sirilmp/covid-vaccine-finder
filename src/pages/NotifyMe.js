import React, { useEffect } from "react";

function NotifyMe() {

    // const showNotification=()=>{
    //     const notification = new notification('hello',{
    //         body:'welcome'
    //     })
    // }

    //const PINCode= localStorage.getItem('PIN_code')



  useEffect(() => {
     
            // Swal.fire({
    //   title: "Enter email address",

    //   html: `<input type='number' id='dose_code' class='swal2-input focus:outline-none' placeholder='dose' ></input>`,
    //   preConfirm: () => {
    //     const null_dose_code
    //     const dose_code = Swal.getPopup().querySelector("#dose_code").value;
    //     if (dose_code && dose_code < 1 || dose_code > 2) {
    //       Swal.showValidationMessage(`Please enter "1" or "2"`);
    //     }
    //     else{
    //      const null_dose_code=1
    //     }
    //     return {dose_code,null_dose_code};
    //   },
    // }).then((result) => {
    //   //console.log( result.value.dose_code);
    //   localStorage.setItem("dose", result.value.dose_code);

    // });
      //const notification = new notification('hello')

    return () => {
    };
  }, []);



  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default NotifyMe;
