import React, { useEffect, useState } from "react";

function HowToUse() {
  const [showShadow, setShowShadow] = useState();
  const [computer, setComputer] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [howToInstall, setHowToInstall] = useState(false);
  const [howToNotifyMe, setHowToNotifyMe] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 60) {
      setShowShadow(true);
    } else {
      setShowShadow(false);
    }
  };

  const computerActive = () => {
    setComputer(true);
    setMobile(false);
  };
  const mobileActive = () => {
    setComputer(false);
    setMobile(true);
  };

  const howToInstallActive = () => {
    setHowToInstall(!howToInstall);
    setHowToNotifyMe(false);
  };

  const howToNotifyMeActive = () => {
    setHowToNotifyMe(!howToNotifyMe);
    setHowToInstall(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  return (
    <div>
      <nav
        className={`z-10 flex justify-between p-3 md:px-5 lg:px-10 items-center bg-iconColor-white flex-grow top-0 sticky transform translate duration-150 ${
          showShadow && "shadow-xl transform translate duration-150"
        }`}
      >
        <a href="/">
          <img
            className="w-12 cursor-pointer"
            src="../images/logo.png"
            alt="logo"
          />
        </a>
        <button className="text-iconColor-white font-mono bg-iconColor-lightBlue rounded-md p-2 font-semibold transform translate duration-150 hover:scale-105 focus:scale-y-105 hover:bg-opacity-80 cursor-pointer focus:outline-none focus:bg-opacity-80">
          <a href="/">Home</a>
        </button>
      </nav>

      <div className="grid place-items-left sm:place-items-center ml-10">
        <h1 className="text-4xl text-iconColor-lightGreen sm:ml-8 mt-10 opacity-50 md:text-6xl font-extrabold">
          How to use ?
        </h1>
        <div className="bg-iconColor-lightGreen text-center rounded-lg mt-3 max-h-1 h-1 w-36 sm:ml-8 opacity-50"></div>
      </div>
      <div
        className={`p-10 bg-gray-100 max-w-4xl sm:mx-auto m-2 mt-8 rounded-lg cursor-pointer hover:shadow-md hover:border-1 transform translate duration-200 ${
          howToInstall && "shadow-md"
        }`}
      >
        <div onClick={howToInstallActive} className="grid place-items-start">
          <h4
            className={`font-bold font-mono text-xl cursor-pointer transform translate duration-150 hover:text-iconColor-lightGreen ${
              howToInstall && "text-iconColor-lightGreen"
            }`}
          >
            How to install ?
          </h4>
          <div className="bg-iconColor-lightGreen text-center rounded-lg mt-3 max-h-1 h-1 w-36 opacity-50"></div>
        </div>
        {howToInstall ? (
          <>
            <div className="mt-8 font-semibold font-mono">
              <li>
                Its a{" "}
                <a
                  className="text-iconColor-lightBlue"
                  href="https://en.wikipedia.org/wiki/Progressive_web_application"
                >
                  Progressive web Application(PWA)
                </a>
                , So you can easily install this application on your devices.
              </li>
            </div>
            <div className="grid grid-flow-col font-mono font-semibold mt-6 border-b-2 text-center">
              <h4
                onClick={computerActive}
                className={`hover:bg-gray-200 mr-1 p-2 rounded-sm ${
                  computer &&
                  "border-b-4 border-iconColor-lightGreen bg-gray-200"
                }`}
              >
                Computer
              </h4>
              <h4
                onClick={mobileActive}
                className={`hover:bg-gray-200 ml-1 p-2 rounded-sm ${
                  mobile && "border-b-4 border-iconColor-lightGreen bg-gray-200"
                }`}
              >
                Mobile
              </h4>
            </div>
            {computer ? (
              <>
                <div className="mt-8 font-semibold font-mono">
                  <li>
                    Click on the small download icon next to Url in your chrome
                    browser. Like 👇
                  </li>
                  <img
                    className="mt-3 mb-3"
                    src="../images/info_1.jpeg"
                    alt="info_img"
                  />
                  <li>
                    Then you will get a pop up message to install, then click on
                    the install button. Like 👇
                  </li>
                  <img
                    className="mt-3 mb-3"
                    src="../images/info_2.jpeg"
                    alt="info_img"
                  />
                  <li>
                    After the successful installation, the 'COVID VACCINE
                    FINDER' application will appear on your desktop. You can use
                    it for future uses.
                  </li>
                </div>
              </>
            ) : (
              <>
                <div className="mt-8 font-semibold font-mono">
                  <li>
                    When you open the website in your chrome browser you will
                    get a pop up for installation. Like 👇
                  </li>
                  <img
                    className="mt-3 mb-3"
                    src="../images/info_6.jpeg"
                    alt="info_img"
                  />
                  <h4 className="text-center text-lg mt-2 mb-2">OR</h4>
                  <li>
                    Click on the three vertical dots in the top right corner of
                    the chrome browser. Like 👇
                  </li>
                  <img
                    className="mt-3 mb-3"
                    src="../images/info_4.jpeg"
                    alt="info_img"
                  />
                  <li>Then click on 'Install app'. Like 👇</li>
                  <img
                    className="mt-3 mb-3"
                    src="../images/info_3.jpeg"
                    alt="info_img"
                  />
                  <li>
                    Then you will get a pop up message to install, then click on
                    the install button. Like 👇
                  </li>
                  <img
                    className="mt-3 mb-3"
                    src="../images/info_5.jpeg"
                    alt="info_img"
                  />
                  <li>
                    After the successful installation, the 'COVID VACCINE
                    FINDER' application will appear on your home screen. You can
                    use it for future uses.
                  </li>
                </div>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>

      <div
        className={`p-10 bg-gray-100 max-w-4xl sm:mx-auto m-2 mt-8 rounded-lg cursor-pointer hover:shadow-md hover:border-1 transform translate duration-200 ${
          howToNotifyMe && "shadow-md"
        }`}
      >
        <div onClick={howToNotifyMeActive} className="grid place-items-start">
          <h4
            className={`font-bold font-mono text-xl cursor-pointer transform translate duration-150 hover:text-iconColor-lightGreen ${
              howToNotifyMe && "text-iconColor-lightGreen"
            }`}
          >
            How to use Notify Me ?
          </h4>
          <div className="bg-iconColor-lightGreen text-center rounded-lg mt-3 max-h-1 h-1 w-36 opacity-50"></div>
        </div>
        {howToNotifyMe ? (
          <>
            <div className="mt-8 font-semibold font-mono leading-10">
              <li className="text-red-red">
                You must have the 'COVID VACCINE FINDER' application installed
                on our device before you activate Notify Me. For that you can
                follow the above instructions.👆
              </li>
              <li className="text-red-red">
                Only one Notify Me can active in a browser at a time.
              </li>
              <li className="text-red-red">Notify Me, Internet is required.</li>
              <li className="text-red-red">
                Do not close the 'COVID VACCINE FINDER' application after
                activating Notify Me.
              </li>
              <li className="text-red-red">
                Notify Me search with PIN code and also you can add additional
                some conditions like Dose, Age limit and Vaccine but its not
                required.
              </li>
              <li className="text-red-red">
                Make sure that your device is not in silent mode because you
                will get a notification with sound alert when your center is
                ready for book.
              </li>
              <li className="text-red-red">
                {" "}
                You can terminate notify me at any time. Open notify me page and
                click on cancel button in the pop up message
              </li>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="mt-28 p-10">
        <a
          className="p-2 mr-2 font-mono font-semibold text-iconColor-black rounded-md transform translate duration-150   hover:bg-gray-100 hover:shadow-sm"
          href="mailto: sirilmp.online@gmail.com"
        >
          Support
        </a>
        <a
          className="p-2 ml-2 font-mono font-semibold text-iconColor-black rounded-md transform translate duration-150   hover:bg-gray-100 hover:shadow-sm"
          href="https://sirilmp.online/"
        >
          Developer
        </a>
      </div>
    </div>
  );
}

export default HowToUse;
