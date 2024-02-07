import React from "react";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
});

const HomeSection = () => {
  return (
    <section className="relative w-full flex flex-col">
      <div
        className={`absolute top-[200px] left-1/2 transform -translate-x-1/2 flex flex-col text-background uppercase ${anton.className}`}
      >
        <p className="font-extrabold text-11xl leading-[12rem] text-center">
          Sport
        </p>
        <p className="font-extrabold text-11xl leading-[12rem] text-center">
          Booking
        </p>
      </div>
    </section>
  );
};

export default HomeSection;
