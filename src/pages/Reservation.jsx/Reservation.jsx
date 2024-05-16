import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, addDoc, doc, updateDoc, getDocs, deleteDoc, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import Navbar from "../../components/Navbar/Navbar";
import { getAuth } from "firebase/auth";

export default function Reservation() {
  const location = useLocation();
  const [formData, setFormData] = useState(
    location.state?.formData || {
      name: "",
      email: "",
      date: "",
      timeStart: "",
      timeUntil: "",
      room: "",
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editDocId, setEditDocId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [roomOptions] = useState(["Small Room", "Medium Room", "Large Room", "VIP Room"]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "reservation"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      const reservationData = [];
      querySnapshot.forEach((doc) => {
        reservationData.push({ id: doc.id, ...doc.data() });
      });
      setReservations(reservationData);
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const confirmReservation = window.confirm("Are you sure you want to make this reservation?");
      if (confirmReservation) {
        if (editMode && editDocId) {
          await updateDoc(doc(db, "reservation", editDocId), formData);
          setEditMode(false);
          setEditDocId(null);
        } else {
          await addDoc(collection(db, "reservation"), formData);
        }
        setFormData({ name: "", email: "", date: "", timeStart: "", timeUntil: "", room: "" });
        const querySnapshot = await getDocs(collection(db, "reservation"));
        setReservations(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    } catch (error) {
      console.error("Error saving reservation:", error);
      alert("Failed to send reservation. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (docId, data) => {
    setEditMode(true);
    setEditDocId(docId);
    setFormData(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      await deleteDoc(doc(db, "reservation", id));
      setReservations(reservations.filter((reservation) => reservation.id !== id));
    }
  };

  const getRoomPrice = (roomType) => {
    const prices = {
      "Small Room": "Rp150.000/hour",
      "Medium Room": "Rp240.000/hour",
      "Large Room": "Rp345.000/hour",
      "VIP Room": "Rp500.000/hour",
    };
    return prices[roomType] || "Unknown";
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`2024-05-10T${startTime}`);
    const end = new Date(`2024-05-10T${endTime}`);
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours ${minutes} minutes`;
  };

  return (
    <div>
      <Navbar />
      <div className=" ">
        <div className="pt-4 ml-6 ">
          <Link to="/homepage">
            <section className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
              </svg>
              <p>Back</p>
            </section>
          </Link>
        </div>
        <div className="container mx-auto">
          <div className="w-full lg:w-[422px] mx-auto mt-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-lg font-semibold mb-4">Reservation Form</h2>
              {["name", "email", "date", "timeStart", "timeUntil"].map((field, idx) => (
                <div className="mb-4" key={idx}>
                  <label htmlFor={field} className="block text-gray-700 text-sm font-bold mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "date" ? "date" : field.includes("time") ? "time" : "text"}
                    name={field}
                    id={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="input input-bordered w-full h-10"
                  />
                </div>
              ))}
              <div className="mb-4">
                <label htmlFor="room" className="block text-gray-700 text-sm font-bold mb-2">
                  Room Option
                </label>
                <select className="select select-bordered w-full h-10" name="room" value={formData.room} onChange={handleChange}>
                  <option disabled value="">
                    Rooms Option
                  </option>
                  {roomOptions.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="btn bg-[#3C7CB8] hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded" disabled={isLoading}>
                  {isLoading ? <span className="loading loading-dots loading-sm"></span> : "Reserve"}
                </button>
                {editMode && (
                  <button type="button" onClick={() => setEditMode(false)} className="btn bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="container mx-auto mt-10">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Reservations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="max-w-xs w-full">
                  <div className="bg-white shadow-md rounded p-4 border border-gray-200">
                    <h2 className="text-lg font-semibold mb-2">{reservation.name}</h2>
                    <p className="text-black mb-2">Email: {reservation.email}</p>
                    <p className="text-black-600 mb-2">Date: {reservation.date}</p>
                    <p className="text-black-600 mb-2">Time Start: {reservation.timeStart}</p>
                    <p className="text-black-600 mb-2">Time Until: {reservation.timeUntil}</p>
                    <p className="text-black-600 mb-2">Duration: {calculateDuration(reservation.timeStart, reservation.timeUntil)}</p>
                    <p className="text-black-600 mb-2">Room Option: {reservation.room}</p>
                    <p className="text-black-600 mb-2">Price: {getRoomPrice(reservation.room)}</p>
                    <div className="flex space-x-2 items-center mt-4">
                      <button className="btn bg-[#3C7CB8] hover:bg-blue-800 text-white font-semibold rounded" onClick={() => handleEdit(reservation.id, reservation)}>
                        <BiEditAlt className="inline-block" />
                      </button>
                      <button className="btn bg-red-500 hover:bg-red-700 text-white font-semi bold rounded" onClick={() => handleDelete(reservation.id)}>
                        <BiTrash className="inline-block" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
