import React from "react";
import CardShimmer from "./CardShimmer";
import "../styles/shimmer.scss"; // Assuming you have a CSS file for shimmer styles
const Shimmer = () => {
  return (
    <div className="shimmer">
      {[...Array(5)].map((_, sectionIdx) => (
        <div className="section" key={sectionIdx}>
          {[...Array(10)].map((_, cardIndex) => (
            <CardShimmer key={cardIndex} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
