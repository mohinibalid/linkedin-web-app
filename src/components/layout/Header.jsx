import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import LinkedinIcon from "../../assets/linkedin-icon.svg";
import SearchIcon from "@mui/icons-material/Search";
import SmsIcon from "@mui/icons-material/Sms";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import NewPost from "../NewPost";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";


const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [isPosting, setIsPosting] = useState(false);
  const [toggleMe, setToggleMe] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);
  const location = useLocation();

  const navigate = useNavigate(); // Initialize navigate
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
  };

  useClickAway(containerRef, () => {
    setToggleMe(false);
  });

  useClickAway(sidebarRef, () => {
    setToggleSidebar(false);
  });

  if (isPosting || toggleSidebar) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const isActive = (path) => {
    if (path === location.pathname) {
      return true;
    }
    return false;
  };

  return (
    <div className="bg-white shadow fixed top-0 w-full z-10">
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center h-14 max-w-[1200px] mx-auto px-4">
        <div className="flex gap-1 items-center">
          <img src={LinkedinIcon} alt="LinkedIn" className="w-10" />
          <div className="flex items-center gap-1 bg-slate-100 p-2 rounded text-slate-600">
            
            <input
              type="text"
              className="w-56 bg-transparent text-sm placeholder:text-slate-500"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon sx={{ fontSize: "20px" }} onClick={handleSearch}/>
          </div>
        </div>
        <div className="flex w-[450px] h-full">
          <Link to="/" className="flex-1">
            <div
              className={`flex flex-col justify-center items-center h-full hover:text-black ${
                isActive("/")
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7z"></path>
              </svg>
              <div className="text-xs mt-[2px]">Home</div>
            </div>
          </Link>
          <Link to="/mynetwork" className="flex-1">
            <div className={`flex flex-col flex-1 justify-center items-center h-full text-gray-600 ${
                isActive("/mynetwork")
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600"
              }`}>
            
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
              </svg>
              <div className="text-xs mt-[2px]">My Network</div>
            
            </div>
          </Link>
          <Link to="/jobs" className="flex-1">
            <div className={`flex flex-col flex-1 justify-center items-center h-full text-gray-600 ${
                isActive("/jobs")
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600"
              }`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                <path d="M22.84 10.22L21 6h-3.95V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2l2.22 5.18A3 3 0 007 13h14a2 2 0 001.84-2.78zM15.05 6h-6V5a1 1 0 011-1h4a1 1 0 011 1zM7 14h15v3a3 3 0 01-3 3H5a3 3 0 01-3-3V8.54l1.3 3A4 4 0 007 14z"></path>
              </svg>
              <div className="text-xs mt-[2px]">Jobs</div>
            </div>
          </Link>
          <Link to="/messaging" className="flex-1">
            <div className={`flex flex-col flex-1 justify-center items-center h-full text-gray-600 ${
                isActive("/messaging")
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600"
              }`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
              <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z"></path>
            </svg>
            <div className="text-xs">Messaging</div>
            </div>
          </Link>
          <Link to="/notifications" className="flex-1">
            <div className={`flex flex-col flex-1 justify-center items-center h-full text-gray-600 ${
                isActive("/notifications")
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600"
              }`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
              <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
            </svg>
            <div className="text-xs mt-[2px]">Notifications</div>
          </div>
          </Link>
          <div
            className={`relative flex-1 flex flex-col justify-center items-center h-full cursor-pointer hover:text-black ${
              isActive(`/profile/${user.uid}`)
                ? "text-black border-b-2 border-black"
                : "text-gray-600"
            }`}
            onClick={() => setToggleMe(!toggleMe)}
            ref={containerRef}
          >
            <Avatar src={user?.photoURL} sx={{ width: 24, height: 24 }} />
            <div className="text-xs">
              Me <ArrowDropDownIcon className="-m-2" />
            </div>
            {toggleMe && (
              <div className="absolute top-11 left-0 bg-white rounded-lg shadow border z-10 whitespace-nowrap">
                <Link to={`/profile/${user.uid}`}>
                  <div className="text-sm cursor-pointer hover:bg-gray-100 py-2 px-6 text-slate-700 flex gap-2 items-center">
                    <PersonIcon sx={{ fontSize: 24 }} className="-ms-1" /> View
                    Profile
                  </div>
                </Link>
                <hr />
                <div
                  className="text-sm cursor-pointer hover:bg-gray-100 py-2 px-6 text-slate-700 flex gap-2 items-center"
                  onClick={() => signOut(auth)}
                >
                  <LogoutIcon sx={{ fontSize: 20 }} className="-ms-1" /> Sign
                  Out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden h-14 gap-3 items-center justify-between px-4">
        <Avatar src={user?.photoURL} onClick={() => setToggleSidebar(true)} />
        <div className="flex flex-1 items-center gap-1 bg-slate-100 p-2 rounded text-slate-600">
          <SearchIcon sx={{ fontSize: "20px" }} />
          <input
            type="text"
            className="w-full bg-transparent text-sm placeholder:text-slate-500"
            placeholder="Search"
          />
        </div>
        <SmsIcon className="text-gray-600" />
      </div>

      {/* Mobile Sidebar */}

      <div
        className={`absolute top-0 left-0 bottom-0 right-0 h-screen w-full z-30 flex md:hidden transition-transform duration-500 ${
          toggleSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="bg-white h-full w-[250px] flex flex-col justify-between"
          ref={sidebarRef}
        >
          <div className="p-6 border-b">
            <Link
              to={`/profile/${user.uid}`}
              onClick={() => setToggleSidebar(false)}
            >
              <Avatar src={user?.photoURL} sx={{ width: 65, height: 65 }} />
              <h4 className="mt-3 mb-1 font-semibold text-xl text-gray-900">
                {user.displayName}
              </h4>
              <p className="text-sm text-gray-500">View Profile</p>
            </Link>
          </div>
          <div
            className="p-6 border-t flex items-center gap-2 text-gray-700"
            onClick={() => signOut(auth)}
          >
            <LogoutIcon /> Sign Out
          </div>
        </div>
      </div>
      {toggleSidebar && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen z-20 bg-[rgba(0,0,0,0.6)]"
          onClick={() => setToggleSidebar(false)}
        ></div>
      )}

      {/* Mobile Posting */}
      {isPosting && (
        <NewPost isPosting={isPosting} setIsPosting={setIsPosting} />
      )}
    </div>
  );
};

export default Header;
