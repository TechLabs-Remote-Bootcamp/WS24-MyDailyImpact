// RC_Profile.jsx
import React, { useState, useEffect } from "react";
import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import styles from "./RC_Profile.module.scss";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../utils/api";

export default function RC_Profile() {
  // State management for profile data
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Get authentication data from useAuth hook
  const { user, error: authError } = useAuth();

  // Effect to fetch additional user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Log the attempt to fetch
        console.log("Attempting to fetch user details...");

        const response = await api.get("/user/profile");
        console.log("Received user details:", response);

        setUserDetails(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setFetchError(error.message);
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

  // Loading state
  if (loading) {
    return <div>Loading profile information...</div>;
  }

  // Error handling
  if (authError || fetchError) {
    return (
      <div>
        Error loading profile: {authError || fetchError}
        <pre>{JSON.stringify({ authError, fetchError }, null, 2)}</pre>
      </div>
    );
  }

  // Authentication check
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  // Combine data from auth and additional details
  const profileData = userDetails || user;

  return (
    <div className="RC_home">
      <ColoredContainers h2Text="User profile">
        <div className={styles["user-information-container"]}>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>First Name: </span>
            <span className={styles["input"]}>
              {profileData.firstName || "N/A"}
            </span>
          </li>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>Last Name: </span>
            <span className={styles["input"]}>
              {profileData.lastName || "N/A"}
            </span>
          </li>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>Birthday: </span>
            <span className={styles["input"]}>
              {profileData.birthday || "N/A"}
            </span>
          </li>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>Gender: </span>
            <span className={styles["input"]}>
              {profileData.gender || "N/A"}
            </span>
          </li>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>Country: </span>
            <span className={styles["input"]}>
              {profileData.country || "N/A"}
            </span>
          </li>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>Email: </span>
            <span className={styles["input"]}>
              {profileData.email || "N/A"}
            </span>
          </li>
          <li className={styles["user-information"]}>
            <span className={styles["field"]}>Password: </span>
            <span className={styles["input"]}>••••••••</span>
          </li>
        </div>
      </ColoredContainers>
    </div>
  );
}

// import React, { useState, useEffect} from "react";
// import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
// import { Link } from "react-router-dom";
// import styles from "./RC_Profile.module.scss";
// import { useAuth } from "../../../hooks/useAuth";
// import { api } from "../../../utils/api";

// export default function RC_Profile() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [fetchError, setFetchError] = useState(null);
//   const { user, error } = useAuth();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await api.get("/user/profile");
//         setUserDetails(response);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         setFetchError(error.message);
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchUserDetails();
//     }
//   }, [user]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error || fetchError) {
//     return <div>Error loading profile: {error || fetchError}</div>;
//   }

//   if (!user) {
//     return <div>Please log in to view your profile.</div>;
//   }

//   const profileData = userDetails || user;

//   return (
//     <div className="RC_home">
//       <ColoredContainers h2Text="User profile">
//         <div className={styles["user-information-container"]}>
//           <li className={styles["user-information"]}>
//             <span className={styles["field"]}>First Name: </span>
//             <span className={styles["input"]}>{user.firstName}</span>
//           </li>
//           <li className={styles["user-information"]}>
//             <span className={styles["field"]}>Last Name: </span>
//             <span className={styles["input"]}>{user.lastName}</span>
//           </li>
//           <li className={styles["user-information"]}>
//             <span className={styles["field"]}>Birthday: </span>
//             <span className={styles["input"]}>{user.birthday}</span>
//           </li>
//           <li className={styles["user-information"]}>
//             <span className={styles["field"]}>Gender: </span>
//             <span className={styles["input"]}>{user.gender}</span>
//           </li>
//           <li className={styles["user-information"]}>
//             <span className={styles["field"]}>Country: </span>
//             <span className={styles["input"]}>{user.country}</span>
//           </li>
//           <li className={styles["user-information"]}>
//             <span className={styles["field"]}>Email: </span>
//             <span className={styles["input"]}>{user.email}</span>
//           </li>
//           <li className={styles["user-information"]}>
//             <span className={styles["field"]}>Password: </span>
//             <span className={styles["input"]}>••••••••</span>
//           </li>
//         </div>
//       </ColoredContainers>
//     </div>
//   );
// }
