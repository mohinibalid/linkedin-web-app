import { Avatar } from "@mui/material";
import React from "react";
import TurnedInRoundedIcon from "@mui/icons-material/TurnedInRounded";
import ProfileBgImage from "../../assets/profile-bg-image.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="fixed w-60">
      <div className="bg-white rounded-lg overflow-hidden border">
        <div
          className="pt-[25%] bg-cover bg-center"
          style={{ backgroundImage: `url(${ProfileBgImage})` }}
        ></div>
        <div className="text-center flex flex-col items-center mt-[-40px] px-3">
          <Link to={`/profile/${user.uid}`}>
            <Avatar src={user?.photoURL} sx={{ width: 70, height: 70 }} />
          </Link>
          <Link to={`/profile/${user.uid}`}>
            <h4 className="font-semibold text-gray-800 mt-4 mb-1">
              {user.displayName}
            </h4>
          </Link>
          <p className="text-xs text-gray-400 mb-4">
          {user.jobPosition
            ? user.jobPosition
            : "Software Engineer at Google"}
          </p>
        </div>
        <hr />
        <div className="py-2">
          <div className="flex text-xs justify-between font-semibold cursor-default py-2 px-3 hover:bg-gray-100">
            <p className="text-gray-500">Profile viewers</p>
            <p className="text-sky-600">10</p>
          </div>
          <div className="flex text-xs justify-between font-semibold cursor-default py-2 px-3 hover:bg-gray-100">
            <p className="text-gray-500">Post Impressions</p>
            <p className="text-sky-600">40</p>
          </div>
        </div>
        <hr />
        <div className="py-2 px-3 flex gap-2 items-center text-xs text-gray-600 cursor-default hover:bg-gray-100">
          <TurnedInRoundedIcon />
          <p>Saved Items</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
