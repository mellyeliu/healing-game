import React, { useState } from "react";
import Draggable from "react-draggable";
import "../App.css";

function ChatApp() {
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
  const chatAppStyles = {
    draggable: {
      defaultPosition: { x: 30, y: 30 },
      style: {
        display: "flex",
        height: "400px",
        width: "600px",
        background: "white",
        border: "1px solid #222",
        borderRadius: "10px",
        overflow: "hidden",
        fontFamily: "Pixelify Sans",
      },
    },
    tabContainer: {
      width: "100px",
      backgroundColor: "#f0f0f0",
      display: "flex",
      flexDirection: "column",
      font: "Pixelify Sans",
    },
    tab: (isActive) => ({
      padding: "10px",
      cursor: "pointer",
      borderBottom: "1px solid #222",
      backgroundColor: isActive ? "#ccc" : "transparent",
    }),
    messageContainer: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      fontFamily: "Pixelify Sans",
      borderLeft: "1px solid #222",
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
      backgroundColor: from === "me" ? "pink" : "#fff",
      border: "1px solid #222",
    }),
    responseContainer: {
      padding: "10px",
      borderTop: "1px solid #222",
      backgroundColor: "#f9f9f9",
    },
    responseButton: {
      padding: "10px",
      margin: "5px",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: "pink",
      fontFamily: "Pixelify Sans",
      color: "black",
      border: "1px solid #222",
    },
  };

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={chatAppStyles.draggable.defaultPosition}
      position={null}
      scale={1}
    >
      <div style={chatAppStyles.draggable.style} className="handle">
        <div style={chatAppStyles.tabContainer}>
          <div
            style={chatAppStyles.tab(activeTab === "chat1")}
            onClick={() => handleTabClick("chat1")}
          >
            Rainbow
          </div>
          <div
            style={chatAppStyles.tab(activeTab === "chat2")}
            onClick={() => handleTabClick("chat2")}
          >
            Cloud
          </div>
        </div>
        <div style={chatAppStyles.messageContainer}>
          <div style={chatAppStyles.messageList}>
            {messages[activeTab].map((msg, index) => (
              <div key={index} style={chatAppStyles.message(msg.from)}>
                {msg.text}
              </div>
            ))}
          </div>
          <div style={chatAppStyles.responseContainer}>
            {conversationMap[activeTab][currentStep].responses.length > 0 ? (
              <div>
                {conversationMap[activeTab][currentStep].responses.map(
                  (response, index) => (
                    <button
                      key={index}
                      onClick={() => handleResponseClick(response)}
                      style={chatAppStyles.responseButton}
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
    </Draggable>
  );
}

export default ChatApp;
