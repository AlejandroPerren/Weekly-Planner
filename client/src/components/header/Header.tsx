import React from "react";

const Header = () => {
  return (
    <div className="p-5 text-white bg-gray-900 flex justify-between items-center shadow-md">
      <div className=" ml-5">
        <h1 className="text-2xl font-bold">Weekly Planner</h1>
      </div>

      <div className="flex gap-6 mr-10 items-center">
        <div className="hover:text-gray-400 cursor-pointer">Personas</div>
        <h1 className="hover:text-gray-400 cursor-pointer">Profile</h1>
      </div>
    </div>
  );
};

export default Header;
