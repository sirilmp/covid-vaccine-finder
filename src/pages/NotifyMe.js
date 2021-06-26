import React, { useEffect } from "react";

function NotifyMe() {

    // const showNotification=()=>{
    //     const notification = new notification('hello',{
    //         body:'welcome'
    //     })
    // }

    const PINCode= localStorage.getItem('PIN_code')



  useEffect(() => {
     
         
      const notification = new notification('hello')

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
