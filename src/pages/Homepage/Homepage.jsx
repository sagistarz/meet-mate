import React from "react";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import homepage from "/homepage-img.png";
import Card from "../../components/Card/Card";
import Company from "../../components/Company/Company";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

export default function Homepage() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User is not logged in");
        }
      } else {
        console.log("No user is currently logged in");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="homepage-text">
        <h1>Welcome, {userDetails?.name || "User"}</h1>
        <p className="italic">Let's find the right workspace for you.</p>
      </div>
      <div className="homepage-image flex items-center justify-center">
        <img src={homepage} alt="homepage" style={{ width: "1280px", height: "302px" }} />
      </div>

      <div>
        <h1 className=" text-3xl font-semibold" style={{ margin: "30px 0px 20px 95px" }}>
          List of Room
        </h1>
        <Card />
        <Company />
        <Footer />
      </div>
    </div>
  );
}
