import React from "react";

function DesktopIcon({ image, caption, isActive, onClick }) {
  const iconStyle = {
    width: "100px",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
    cursor: "pointer",
    borderRadius: "10px",
    padding: "5px",
    boxSizing: "border-box",
  };

  const imageStyle = {
    width: "60px",
    height: "60px",
    marginBottom: "5px",
  };

  const captionStyle = {
    display: "inline-block",
    textAlign: "center",
    backgroundColor: isActive ? "blue" : "transparent",
    color: isActive ? "white" : "black",
    padding: "0px 2px",
    fontFamily: "Pixelify Sans",
  };

  return (
    <div style={iconStyle} onClick={onClick}>
      <img src={image} alt={caption} style={imageStyle} />
      <div style={captionStyle}>{caption}</div>
    </div>
  );
}

export default DesktopIcon;
