import React from "react";
import ProfileMain from "./ProfileMain";
import ProfileSidebar from "./ProfileSidebar";

const Profile = () => {
  return (
      <div className="flex gap-6">
        <div className="flex-1">
          <ProfileMain />
        </div>
        <div className="hidden lg:block w-80">
          <ProfileSidebar />
        </div>
      </div>
  );
};

export default Profile;
