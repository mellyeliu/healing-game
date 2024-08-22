import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "../App.css";

function ChatApp({ close }) {
  const [activeTab, setActiveTab] = useState("chat1");
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState({
    chat1: [{ text: "u showed up in my dream again...", from: "them" }],
    chat2: [{ text: "Hi! Do you like coding?", from: "them" }],
  });

  const conversationMap = {
    chat1: [
      {
        from: "them",
        text: "u showed up in my dream again...",
        responses: [{ text: "what were we doing?", nextStep: 1 }],
      },
      {
        from: "them",
        text: "all i remember is we were laying in a field, looking at the sky.",
        responses: [
          { text: "did i show u my favourite constellation?", nextStep: 2 },
        ],
      },
      {
        from: "them",
        text: "no. you started crying and i didnt know what to do :((",
        responses: [{ text: "oh....", nextStep: 3 }],
      },
      {
        from: "them",
        text: "that reminds me, i got something for u (sends rings)",
        responses: [
          {
            text: "omg!! they're beautiful!! where did u get those from?",
            nextStep: 4,
          },
        ],
      },
      {
        from: "them",
        text: "from the lady in the dream-market. i was telling her about u. she says if you give them to someone you love, you'll be able to dream together.",
        responses: [
          { text: "should we give them a try next time?", nextStep: 5 },
        ],
      },
      {
        from: "them",
        text: "i'd love to <3",
        responses: [
          { text: "okk, im gonna go to sleep now. see u soon!!", nextStep: 6 },
        ],
      },
      {
        from: "them",
        text: "<3 i'll be waiting for you",
        responses: [],
      },
    ],
    chat2: [
      {
        from: "them",
        text: "i wish i could go back and throw stars in the sky for u. just to see u smile.",
        responses: [
          {
            text: "remember when we used to fold stars together?",
            nextStep: 1,
          },
        ],
      },
      {
        from: "them",
        text: "how could i forget.. i still have the jar of stars you gave me.",
        responses: [],
      },
    ],
  };

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      // Scroll to bottom whenever messages change
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
    }, 1000);
  };

  // Styles
  const styles = {
    container: {
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
      marginLeft: from === "me" ? "auto" : "5px",
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
            <div ref={scrollRef} style={styles.messageList}>
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
