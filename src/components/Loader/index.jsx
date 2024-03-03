import React from "react";
import loader from "../../assets/images/loader.gif";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <img src={loader} alt="Loader" />
    </div>
  );
};

export default Loader;
