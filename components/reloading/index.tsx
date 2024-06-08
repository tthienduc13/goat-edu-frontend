"use client";
import "./style.css";

function Reloading() {
  return (
    <div className={`fixed top-0 w-full h-full z-[1000] animation-turn-off`}>
      <div className="flex h-full justify-center items-center bg-primary animate-fade-down-large">
        <div className="content flex justify-center items-center w-full animate-scale">
          <h2 className="text-[32px] md:text-[64px] lg:text-[64px] xl:text-[64px] text-white font-extrabold relative text-transparent">
            GOAT EDU
          </h2>
          <h2 className="text-[32px] md:text-[64px] lg:text-[64px] xl:text-[64px] text-white font-extrabold absolute">
            GOAT EDU
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Reloading;
