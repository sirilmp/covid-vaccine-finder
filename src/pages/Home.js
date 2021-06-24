import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import InputForm from "../components/InputForm";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <InputForm />
      <Footer/>
    </div>
  );
}

export default Home;
