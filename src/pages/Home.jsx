import React from "react";
import LeftSidebar from "../components/layout/LeftSidebar";
import Feed from "./Feed";
import RightSidebar from "../components/layout/RightSidebar";

const Home = () => {
  return (
    <div className="flex gap-6">
      <div className="hidden md:block w-60">
        <LeftSidebar />
      </div>
      <div className="flex-1">
        <Feed />
      </div>
      <div className="hidden lg:block w-80">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
