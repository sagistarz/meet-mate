import React from "react";
import { Link } from "react-router-dom";
import logoPerson from "/logo-person.png";
import logoWallet from "/logo-wallet.png";
import Small from "/room-small.png";
import Medium from "/room-medium.png";
import Large from "/room-large.png";
import VIP from "/room-vip.jpg";

const roomsData = [
  {
    name: "Small Room",
    description: "Professional, private spaces for interviewing candidates, annual appraisals, or running a research group.",
    capacity: 10,
    price: "150.000",
    image: Small,
  },
  {
    name: "Medium Room",
    description: "Perfect when you need a purpose-built space with desks, whiteboards, and screens for training sessions.",
    capacity: 20,
    price: "240.000",
    image: Medium,
  },
  {
    name: "Large Room",
    description: "Perfect places to meet, collaborate, and interview. Available by the hour, with our on-site team to support you.",
    capacity: 30,
    price: "345.000",
    image: Large,
  },
  {
    name: "VIP Room",
    description: "A professional on-demand office space. Perfect when you need to get your head down and do your best work.",
    capacity: 50,
    price: "500.000",
    image: VIP,
  },
];

export default function Card() {
  return (
    <Link to="/reservation" className="flex items-center justify-center flex-wrap gap-2">
      {roomsData.map((room, index) => (
        <div
          key={index}
          className="card mx-2 inline-block bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          style={{ width: "304px" }}
        >
          <img className="rounded-t-lg w-full" src={room.image} alt={room.name} style={{ height: "170px" }} />
          <div className="px-3 py-3">
            <h5 className="pb-2 font-bold tracking-tight text-gray-900 dark:text-white" style={{ fontSize: "16px" }}>
              {room.name}
            </h5>
            <p className="pb-2 text-gray-700 dark:text-gray-400" style={{ fontSize: "12px" }}>
              {room.description}
            </p>
            <div className="pb-4">
              <div className="flex flex-row items-center">
                <img src={logoPerson} alt="logo-person" style={{ width: "20px", height: "20px", marginBottom: "8px" }} />
                <p style={{ fontSize: "12px", fontWeight: "400", paddingLeft: "8px" }}>{room.capacity} persons</p>
              </div>
              <div className="flex flex-row items-center">
                <img src={logoWallet} alt="logo-wallet" style={{ width: "20px", height: "20px" }} />
                <p style={{ fontSize: "12px", fontWeight: "400", paddingLeft: "8px" }}>IDR {room.price}/hour</p>
              </div>
            </div>
            <button
              className="inline-flex items-center px-3 py-2 text-center text-white rounded-lg bg-[#3C7CB8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              style={{ fontSize: "14px", fontWeight: "600" }}
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </Link>
  );
}
