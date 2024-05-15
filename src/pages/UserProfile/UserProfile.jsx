import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import profil from "/profil.jpg";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User data not found");
        }
      } else {
        console.log("User is not logged in");
      }
    };

    const unsubscribe = auth.onAuthStateChanged(fetchUserData);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
    } catch (error) {
      console.log("Error logging out:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-4 ml-6">
        <Link to="/homepage" className="flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
          </svg>
          <p className="ml-2">Back</p>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center h-screen -mt-20">
        <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="pb-4 text-3xl font-bold">Profile</h1>
          {userDetails ? (
            <>
              <div className="flex flex-col items-center mb-4">
                <img src={profil} alt="Profile" className="w-32 h-32 rounded-full shadow-md mb-4" />
                <h3 className="text-xl font-semibold">
                  Welcome to Meet Mate,
                  <span className="font-bold"> {userDetails.name}</span>
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">Name:</span> {userDetails.name}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Email:</span> {userDetails.email}
                </p>
              </div>
              <button className="mt-6 px-5 py-2 text-white rounded-full font-semibold bg-[#3C7CB8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
