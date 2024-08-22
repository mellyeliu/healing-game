import React, { useState } from "react";
import Draggable from "react-draggable";
import "../App.css";

function Music({ close }) {
  // Styles
  const styles = {
    container: {
      // outline: "1px solid white" /* Outer border */,
      // outlineOffset: 0,
      width: "600px",
      pointerEvents: "auto",
    },
    draggable: {
      defaultPosition: { x: 250, y: 140 },
      style: {
        display: "flex",
        height: "300px",
        width: "400px",
        background: "var(--bg-color)",
        border: "var(--chat-border)",
        overflow: "hidden",
        fontFamily: "Pixelify Sans",
      },
    },
    header: {
      width: "390px",
      backgroundColor: "white",
      borderTop: "var(--chat-border)",
      borderLeft: "var(--chat-border)",
      borderRight: "var(--chat-border)",
      padding: "3px 5px",
      // background: "var(--accent-color)",
      background: "var(--accent-color)",
      height: "20px",
      verticalAlign: "center",
      color: "black",
      fontFamily: "Pixelify Sans",
    },
    browser: {
      // border: "1px solid black",
      height: 14,
      verticalAlign: "center",
      marginLeft: 5,
      color: "black",
      width: 14,
      marginTop: 3,
      display: "inline",
      lineHeight: "10px",
      cursor: "pointer",
      float: "right",
      // background: "white",
    },
  };

  return (
    <Draggable
      axis="both"
      handle=".handle2"
      defaultPosition={styles.draggable.defaultPosition}
      position={null}
      scale={1}
    >
      <div style={styles.container} className="handle2">
        <div style={styles.header}>
          Music
          <div
            onClick={() => {
              close(3);
            }}
            style={styles.browser}
          >
            <span>x</span>
          </div>
          {/* <div style={styles.browser}>o</div>
          <div style={styles.browser}>_</div> */}
        </div>
        <div style={styles.draggable.style}></div>
      </div>
    </Draggable>
  );
}

export default Music;
