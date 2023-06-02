import React, { ChangeEvent } from "react";

type Props = {
  handleTimeframeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  hideTodos: boolean;
  setHideTodos: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavigationBar = ({
  handleTimeframeChange,
  hideTodos,
  setHideTodos,
}: Props) => {
  return (
    <div className="flex justify-between items-center px-2 py-3 mb-3 bg-[#B5AB92] border-t border-[#f0f0f091] text-sm text-white shadow-lg rounded-md opacity-75 backdrop-filter backdrop-blur-lg">
      
      <div className="relative z-20 inline-block flex">
        <span className="absolute top-1/2 left-2 z-10 -translate-y-1/2">
          <img src="/src/assets/hamburger.svg" width={16} alt="" />
        </span>
        <select
          name="#"
          id="#"
          className="text-shadow relative z-20 inline-flex appearance-none bg-transparent py-1 pr-3 pl-10 text-sm font-medium outline-none"
          onChange={handleTimeframeChange}
          //   style={{
          //     textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          //   }}
        >
          <option value="today" className="bg-gray-900 ">
            To do Today
          </option>
          <option value="week" className="bg-gray-900 hover:bg-white">
            To do this week
          </option>
          <option
            value="month"
            className="bg-gray-900 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]]"
          >
            To do this month
          </option>
        </select>
      </div>
      <img
        src="/src/assets/dropdown-logo.svg"
        className={`${hideTodos ? "" : "scale-y-[-1]"} transition-all ease-in-out	cursor-pointer`}
        width={16}
        alt=""
        onClick={() => setHideTodos((prev) => !prev)}
      />
    </div>
  );
};

export default NavigationBar;
