import React, { useState, useEffect } from "react";
import DesktopIcon from "./Components/DesktopIcon";
import "./App.css";
import ChatApp from "./Components/Chat";
import Files from "./Components/Files";
import Music from "./Components/Music";
import Scene from "./Components/Scene";

function App() {
  const [openItems, setOpenItems] = useState(new Set());
  const [activeIcon, setActiveIcon] = useState(null);

  const handleGameBack = () => {
    setOpenItems((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.delete(4); // Remove the value '4'
      return updatedSet; // Return the updated set
    });
  };

  const appStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    overflow: "hidden",
  };

  const contentStyle = {
    width: "75%",
    height: "70%",
    minHeight: "600px",
    position: "relative",
    minWidth: "900px",
    maxHeight: "800px",
    maxWidth: "1000px",
    background: "url(/backgrounds/bg8.png)",
    // backgroundColor: "#d0bad4",
    backgroundSize: "contain",
    border: "var(--chat-border)",
    backgroundPosition: "center",
    overflow: "hidden",
  };

  const windowStyle = {
    position: "absolute",
    top: "0%",
    left: "0%",
    pointerEvents: "none",
  };

  const handleDoubleClick = (id) => {
    setOpenItems((prevOpenItems) => {
      const updatedOpenItems = new Set(prevOpenItems);
      updatedOpenItems.add(id);
      return updatedOpenItems;
    });
  };

  const handleXClick = (id) => {
    setOpenItems((prevOpenItems) => {
      const updatedOpenItems = new Set(prevOpenItems);
      updatedOpenItems.delete(id);
      return updatedOpenItems;
    });
  };

  const handleIconClick = (id, event) => {
    event.stopPropagation();
    setActiveIcon(id);
  };

  const handleDocumentClick = () => {
    setActiveIcon(null);
  };

  const icons = [
    { id: 1, image: "/icons/file.png", caption: "Files" },
    { id: 2, image: "/icons/messages.png", caption: "Messages" },
    { id: 3, image: "/icons/music.png", caption: "Music" },
    { id: 4, image: "/icons/game.png", caption: "Game" },
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
        {openItems.has(4) && <Scene onBack={handleGameBack} />}
        {!openItems.has(4) && (
          <>
            {icons.map((icon) => (
              <DesktopIcon
                key={icon.id}
                image={icon.image}
                caption={icon.caption}
                isActive={activeIcon === icon.id}
                onClick={(e) => handleIconClick(icon.id, e)}
                onDoubleClick={() => handleDoubleClick(icon.id)}
              />
            ))}
            <div style={windowStyle}>
              {openItems.has(1) && <Files close={handleXClick} id={1} />}
            </div>
            <div style={windowStyle}>
              {openItems.has(2) && <ChatApp close={handleXClick} id={2} />}
            </div>
            <div style={windowStyle}>
              {openItems.has(3) && <Music close={handleXClick} id={3} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
