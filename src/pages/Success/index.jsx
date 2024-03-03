import React from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl text-[#1677ff] font-bold">
          Successfully submitted
        </h1>
        <Confetti />
      </div>
    </div>
  );
};

export default SuccessPage;
