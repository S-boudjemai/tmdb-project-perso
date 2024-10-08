import { NavLink } from "react-router-dom";
import React from "react";

function ButtonHome() {
  return (
    <NavLink
      to="/"
      className=" mt-5 opacity-50 hover:opacity-100 hover:scale-105"
    >
      <span className="cursor-pointer p-3 bg-black rounded text-center z-10 text-white">
        Retour
      </span>
    </NavLink>
  );
}
export default ButtonHome;
