import React from "react";
import AnnouncementRoundedIcon from "@mui/icons-material/AnnouncementRounded";

const RightSidebar = () => {
  const News = ({ title, hour }) => {
    return (
      <div className="flex gap-2 py-1 px-3 hover:bg-gray-100 cursor-default">
        <div>
          <h5 className="font-semibold text-sm text-gray-600">{title}</h5>
          <p className="text-xs text-gray-400 mt-1">{hour}h ago . 4567 readers</p>
        </div>
      </div>
    );
  };
  return (
    <div className="fixed w-80">
      <div className="bg-white rounded-lg overflow-hidden border py-4">
        <div className="flex justify-between mb-2 px-3">
          <h3 className="text-md font-semibold text-gray-600">LinkedIn News</h3>
          <AnnouncementRoundedIcon sx={{ fontSize: 18 }} />
        </div>
        <h5 className="text-xs text-gray-400 px-3 mb-2">
          Top stories
        </h5>
        <News title="Flipkart shifts base back to India" hour={5} />
        <News title="IMF cuts India growth forecast" hour={5} />
        <News title="Midsize GCCs make a big impact" hour={5} />
        <News title="EV players charge up battery tech" hour={5} />
        <News title="Mutual funds market sees a shift" hour={5} />
      </div>
    </div>
  );
};

export default RightSidebar;
