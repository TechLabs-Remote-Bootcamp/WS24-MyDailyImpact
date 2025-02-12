"use client";

import React, { useState, useEffect } from "react";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import styles from "./RC_Profile.module.scss";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../utils/api";

export default function RC_Profile({ onEditClick }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { user, error: authError } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("Fetching user details...");
        const response = await api.get("/auth/current-user");
        console.log("User details received:", response);
        setUserDetails(response);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if user is authenticated
    if (user) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div>Loading profile information...</div>;
  if (authError || fetchError) {
    return <div>Error loading profile: {authError || fetchError}</div>;
  }
  if (!user) return <div>Please log in to view your profile.</div>;

  const profileData = userDetails || user;

  const getPasswordDots = (password) => "•".repeat(password?.length || 10);

  const formatBirthday = (birthday) => {
    if (!birthday) return "N/A";
    const date = new Date(birthday);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <ColoredContainers h2Text="User profile">
        <div className={styles["user-information-container"]}>
          {[
            { label: "First Name", value: profileData.firstName },
            { label: "Last Name", value: profileData.lastName },
            { label: "Birthday", value: formatBirthday(profileData.birthday) },
            { label: "Gender", value: profileData.gender },
            { label: "Country", value: profileData.country },
            { label: "Email", value: profileData.email },
            { label: "Password", value: getPasswordDots(profileData.password) },
          ].map(({ label, value }) => (
            <li key={label} className={styles["user-information"]}>
              <span className={styles["field"]}>{label}: </span>
              <span className={styles["input"]}>{value || "N/A"}</span>
            </li>
          ))}
        </div>
        <Button onClick={onEditClick}>Edit Profile</Button>
      </ColoredContainers>
    </div>
  );

  // return (
  //   <div className="RC_home">
  //     <ColoredContainers h2Text="User profile">
  //       <div className={styles["user-information-container"]}>
  //         <li className={styles["user-information"]}>
  //           <span className={styles["field"]}>First Name: </span>
  //           <span className={styles["input"]}>
  //             {profileData.firstName || "N/A"}
  //           </span>
  //         </li>
  //         <li className={styles["user-information"]}>
  //           <span className={styles["field"]}>Last Name: </span>
  //           <span className={styles["input"]}>
  //             {profileData.lastName || "N/A"}
  //           </span>
  //         </li>
  //         <li className={styles["user-information"]}>
  //           <span className={styles["field"]}>Birthday: </span>
  //           <span className={styles["input"]}>
  //             {profileData.birthday || "N/A"}
  //           </span>
  //         </li>
  //         <li className={styles["user-information"]}>
  //           <span className={styles["field"]}>Gender: </span>
  //           <span className={styles["input"]}>
  //             {profileData.gender || "N/A"}
  //           </span>
  //         </li>
  //         <li className={styles["user-information"]}>
  //           <span className={styles["field"]}>Country: </span>
  //           <span className={styles["input"]}>
  //             {profileData.country || "N/A"}
  //           </span>
  //         </li>
  //         <li className={styles["user-information"]}>
  //           <span className={styles["field"]}>Email: </span>
  //           <span className={styles["input"]}>
  //             {profileData.email || "N/A"}
  //           </span>
  //         </li>
  //         <li className={styles["user-information"]}>
  //           <span className={styles["field"]}>Password: </span>
  //           <span className={styles["input"]}>••••••••</span>
  //         </li>
  //       </div>
  //     </ColoredContainers>
  //   </div>
  // );
}
