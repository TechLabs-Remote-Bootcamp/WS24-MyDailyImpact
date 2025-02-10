"use client";

import { useState } from "react";
import Content_LR from "../../core/ContentLR/Content_LR.jsx";
import LC_bigImage from "../../core/LC/LC_bigImage.jsx";
import RC_Profile from "./RC_Profile.jsx";
import RC_UpdateProfile from "./RC_UpdateProfile.jsx";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateComplete = () => {
    setIsEditing(false);
  };

  return (
    <Content_LR
      LeftComponent={
        <LC_bigImage rotationOn={false} overflowText="My Daily Impact" />
      }
      RightComponent={
        isEditing ? (
          <RC_UpdateProfile onUpdateComplete={handleUpdateComplete} />
        ) : (
          <RC_Profile onEditClick={handleEditClick} />
        )
      }
    />
  );
}
