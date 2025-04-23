import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LinkedInAvatar from "../assets/linkedin-avatar.svg";
import ProfileBgImage from "../assets/profile-bg-image.png";
import useUser from "../hooks/useUser";
import UpdateProfile from "./UpdateProfile";
import { Link } from "@mui/material";

const ProfileMain = () => {
  const { uid } = useParams();
  const { user, loading, error } = useUser(uid);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  if (isUpdating) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  if (loading) {
    return;
  }
  if (error) {
    navigate("/");
    return;
  }

  const isLoggedIn = currentUser.uid === user.uid;

  return (
    <div>
      {isUpdating && (
        <UpdateProfile setIsUpdating={setIsUpdating} user={user} />
      )}
      <div className="bg-white md:rounded-lg md:border overflow-hidden">
        <div
          className="flex justify-center items-center pt-[25%] bg-cover bg-center"
          style={{ backgroundImage: `url(${ProfileBgImage})` }}
        ></div>
        <div>
          <div className="flex justify-between items-end px-4 md:px-6 -mt-16 md:-mt-28">
            <div className="h-28 w-28 md:h-40 md:w-40 overflow-hidden flex items-center rounded-full border-white border-4">
              <img
                src={user?.photoURL ? user.photoURL : LinkedInAvatar}
                className="w-full h-full object-cover"
              />
            </div>
            {isLoggedIn && (
              <div
                className="text-gray-500 hover:bg-gray-100 rounded-full p-2 cursor-pointer -m-2"
                onClick={() => setIsUpdating(!isUpdating)}
              >
                <EditOutlinedIcon />
              </div>
            )}
          </div>
          <div className="mt-4 px-4 md:px-6">
            <h2 className="font-semibold text-2xl text-gray-900">
              {user.displayName}
            </h2>
            <p className="text-gray-700">
              {user.jobPosition
                ? user.jobPosition
                : "Software Engineer at Google"}
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Pune, Maharashtra, India . <b><Link>Contact info</Link></b>
            </p>
            <Link><p className="text-sm mt-3">
              500+ connections
            </p></Link>
            <div className="flex gap-2 mt-6 mb-8 flex-wrap">
              <button className="text-white bg-sky-600 py-1 px-4 rounded-full font-semibold cursor-default">
                {isLoggedIn ? (
                  "Open to"
                ) : (
                  <>
                    <PersonAddIcon sx={{ fontSize: 20 }} /> Connect
                  </>
                )}
              </button>
              <button className="text-sky-600 py-1 px-4 border border-sky-600 rounded-full font-semibold cursor-default">
                {isLoggedIn ? "Add profile section" : "Message"}
              </button>
              <button className="text-sky-600 py-1 px-4 border border-sky-600 rounded-full font-semibold cursor-default">
                {isLoggedIn ? "Enhance Profile" : "Message"}
              </button>
              <button className="text-gray-500 py-1 px-4 border border-gray-500 rounded-full font-semibold cursor-default">
                More
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white md:rounded-lg md:border p-6 mt-2">
        <h4 className="text-xl font-semibold text-gray-900">About</h4>
        <p className="text-sm text-gray-700 mt-3">
          My name is {user.displayName}. I am currently pursuing a masters degree in Computer Science in Indira group of institutes, Tathawde. I am Passionate about coding.
          I am quick learner.
          </p>
        <p className="text-sm text-gray-700 mt-3">
          Strengths:
          I am highly motivated and extremely passionate about developing. I take initiative and always try to solve a problem with all possible ways I could. I make sure to complete my assignments and projects ahead of deadline. I am versatile, determined, open minded and enjoy working with people.
        </p>
        
      </div>
    </div>
  );
};

export default ProfileMain;
