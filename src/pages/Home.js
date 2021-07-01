import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import InputForm from "../components/InputForm";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className=''>
      <Navbar />
      <Banner />
      <InputForm className='max-h-96' />
      <Footer/>
    </div>
  );
}

export default Home;
