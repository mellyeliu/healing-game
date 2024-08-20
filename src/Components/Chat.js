import React, { useState } from "react";
import Draggable from "react-draggable";
import "../App.css";

function ChatApp({ close }) {
  const [activeTab, setActiveTab] = useState("chat1");
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState({
    chat1: [{ text: "Hello! How are you?", from: "them" }],
    chat2: [{ text: "Hi! Do you like coding?", from: "them" }],
  });

  const conversationMap = {
    chat1: [
      {
        from: "them",
        text: "Hello! How are you?",
        responses: [
          { text: "I'm good, thanks!", nextStep: 1 },
          { text: "Not so well...", nextStep: 2 },
        ],
      },
      {
        from: "them",
        text: "Great to hear! What are you up to?",
        responses: [
          { text: "Just working.", nextStep: 3 },
          { text: "Relaxing at home.", nextStep: 3 },
        ],
      },
      {
        from: "them",
        text: "I'm sorry to hear that. Anything I can do to help?",
        responses: [
          { text: "Just need some rest.", nextStep: 3 },
          { text: "Maybe a chat?", nextStep: 3 },
        ],
      },
      {
        from: "them",
        text: "Got it. Take care!",
        responses: [],
      },
    ],
    chat2: [
      {
        from: "them",
        text: "Hi! Do you like coding?",
        responses: [
          { text: "Yes, I love it!", nextStep: 1 },
          { text: "It's okay.", nextStep: 2 },
        ],
      },
      {
        from: "them",
        text: "That's awesome! What do you enjoy most?",
        responses: [
          { text: "Building projects.", nextStep: 3 },
          { text: "Solving problems.", nextStep: 3 },
        ],
      },
      {
        from: "them",
        text: "Gotcha. Everyone has their preferences.",
        responses: [
          { text: "True.", nextStep: 3 },
          { text: "Absolutely.", nextStep: 3 },
        ],
      },
      {
        from: "them",
        text: "Keep it up!",
        responses: [],
      },
    ],
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setCurrentStep(0);
  };

  const handleResponseClick = (response) => {
    setMessages({
      ...messages,
      [activeTab]: [
        ...messages[activeTab],
        { text: response.text, from: "me" },
      ],
    });

    setTimeout(() => {
      setCurrentStep(response.nextStep);
      setMessages({
        ...messages,
        [activeTab]: [
          ...messages[activeTab],
          { text: response.text, from: "me" },
          {
            text: conversationMap[activeTab][response.nextStep].text,
            from: "them",
          },
        ],
      });
    }, 500);
  };

  // Styles
  const styles = {
    container: {
      // outline: "1px solid white" /* Outer border */,
      // outlineOffset: 0,
      width: "600px",
      pointerEvents: "auto",
    },
    draggable: {
      defaultPosition: { x: 350, y: 150 },
      style: {
        display: "flex",
        height: "400px",
        width: "600px",
        background: "var(--bg-color)",
        border: "var(--chat-border)",
        overflow: "hidden",
        fontFamily: "Pixelify Sans",
      },
    },
    tabContainer: {
      width: "100px",
      backgroundColor: "var(--bg-color)",
      display: "flex",
      flexDirection: "column",
      font: "Pixelify Sans",
    },
    tab: (isActive) => ({
      padding: "10px",
      cursor: "pointer",
      color: "white",
      borderBottom: "var(--chat-border)",
      backgroundColor: isActive ? "#aaa " : "transparent",
    }),
    messageContainer: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      fontFamily: "Pixelify Sans",
      borderLeft: "var(--chat-border)",
    },
    messageList: {
      flexGrow: 1,
      padding: "10px",
      overflowY: "scroll",
    },
    message: (from) => ({
      margin: "5px",
      padding: "10px",
      borderRadius: "10px",
      maxWidth: "70%",
      alignSelf: from === "me" ? "flex-end" : "flex-start",
      backgroundColor: from === "me" ? "var(--accent-color)" : "#fff",
      border: "var(--chat-border)",
    }),
    responseContainer: {
      padding: "10px",
      borderTop: "var(--chat-border)",
      backgroundColor: "var(--bg-color)",
    },
    responseButton: {
      padding: "10px",
      margin: "5px",
      borderRadius: "10px",
      cursor: "pointer",
      backgroundColor: "var(--accent-color)",
      fontFamily: "Pixelify Sans",
      color: "black",
      border: "var(--chat-border)",
    },
    header: {
      width: "590px",
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
    header2: {
      width: "calc(100% - 10px)",
      height: "100%",
      padding: "0px 5px",
      // background: "var(--accent-color)",
      backgroundImage:
        "linear-gradient(to right, var(--accent-color), var(--accent-color-2))" /* pastel var(--accent-color) to pastel blue */,
      margin: "0px",
      border: "var(--chat-border)",
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
      handle=".handle"
      defaultPosition={styles.draggable.defaultPosition}
      position={null}
      scale={1}
    >
      <div style={styles.container} className="handle">
        <div style={styles.header}>
          {/* <div style={styles.header2}> */}
          Messages{" "}
          <div
            onClick={() => {
              close(2);
            }}
            style={styles.browser}
          >
            <span>x</span>
          </div>
          {/* <div style={styles.browser}>o</div>
          <div style={styles.browser}>_</div> */}
          {/* </div> */}
        </div>
        <div style={styles.draggable.style}>
          <div style={styles.tabContainer}>
            <div
              style={styles.tab(activeTab === "chat1")}
              onClick={() => handleTabClick("chat1")}
            >
              Rainbow
            </div>
            <div
              style={styles.tab(activeTab === "chat2")}
              onClick={() => handleTabClick("chat2")}
            >
              Cloud
            </div>
          </div>
          <div style={styles.messageContainer}>
            <div style={styles.messageList}>
              {messages[activeTab].map((msg, index) => (
                <div key={index} style={styles.message(msg.from)}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div style={styles.responseContainer}>
              {conversationMap[activeTab][currentStep].responses.length > 0 ? (
                <div>
                  {conversationMap[activeTab][currentStep].responses.map(
                    (response, index) => (
                      <button
                        key={index}
                        onClick={() => handleResponseClick(response)}
                        style={styles.responseButton}
                      >
                        {response.text}
                      </button>
                    )
                  )}
                </div>
              ) : (
                <div>No more responses available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default ChatApp;
