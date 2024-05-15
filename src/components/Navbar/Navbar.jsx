import React from "react";
import Logo from "/logo-website.png";
import userLogo from "/user-navbar.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-8 shadow-lg" style={{ height: "80px" }}>
        <div>
          <Link to="/homepage">
            <img src={Logo} alt="meet mate logo" style={{ width: "80px", height: "auto" }} />
          </Link>
        </div>
        <div className="flex">
          <ul className="flex flex-row gap-4 font-semibold items-center" style={{ fontSize: "16px" }}>
            <Link to="/homepage">
              <li className="hover:text-[#3C7CB8]">Home</li>
            </Link>
            <Link to="/reservation">
              <li className="hover:text-[#3C7CB8]">Order</li>
            </Link>
            <Link to="/chatbot">
              <li className="hover:text-[#3C7CB8]">Chatbot</li>
            </Link>
            <li>
              <Link to="/profile">
                <img src={userLogo} alt="user logo" className="hover:text-[#3C7CB8]" style={{ height: "40px" }} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
