import React from "react";

function DesktopIcon({ image, caption, isActive, onClick, onDoubleClick, id }) {
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
    backgroundColor: isActive ? "var(--accent-color)" : "transparent",
    color: isActive ? "black" : "white",
    padding: "0px 2px",
    fontFamily: "Pixelify Sans",
  };

  return (
    <div
      style={iconStyle}
      onClick={onClick}
      onDoubleClick={() => {
        onDoubleClick(id);
      }}
    >
      <img src={image} alt={caption} style={imageStyle} />
      <div style={captionStyle}>{caption}</div>
    </div>
  );
}

export default DesktopIcon;
