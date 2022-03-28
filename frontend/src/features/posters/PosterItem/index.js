import React from "react";
import "./style.scss";

export const PosterItem = ({ title, url }) => (
  <div className="poster-item">
    <img
      src={
        url !== "N/A"
          ? url
          : "https://www.blackfootfamilydentistry.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png"
      }
      alt="poster"
    />
    <span>{title}</span>
  </div>
);
