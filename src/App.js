import React, { useState, useEffect } from "react";
import DesktopIcon from "./Components/DesktopIcon";
import "./App.css";

function App() {
  const appStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  };

  const contentStyle = {
    width: "75%",
    height: "70%",
    minHeight: "600px",
    minWidth: "900px",
    maxHeight: "800px",
    maxWidth: "1000px",
    backgroundColor: "#d0bad4",
    backgroundSize: "cover",
    border: "1px solid white",
    backgroundPosition: "center",
  };

  const handleIconClick = (id, event) => {
    event.stopPropagation();
    setActiveIcon(id);
  };

  const handleDocumentClick = () => {
    setActiveIcon(null);
  };

  const [activeIcon, setActiveIcon] = useState(null);

  const icons = [
    { id: 1, image: "/icons/file.png", caption: "File" },
    { id: 2, image: "/icons/messages.png", caption: "Messages" },
    { id: 3, image: "/icons/music.png", caption: "Music" },
  ];

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div style={appStyle}>
      <div style={contentStyle}>
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            image={icon.image}
            caption={icon.caption}
            isActive={activeIcon === icon.id}
            onClick={(e) => handleIconClick(icon.id, e)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
