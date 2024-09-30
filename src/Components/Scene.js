import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera, useTexture } from "@react-three/drei";

// Wall component (remains unchanged)
function Wall({ position, scale }) {
  return (
    <mesh position={position}>
      <boxGeometry args={scale} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

// Sprite component (remains unchanged)
function Sprite({ walls }) {
  const ref = useRef();
  const [position, setPosition] = useState([0, 0, 0]);
  const texture = useTexture("/char.png");
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const speed = 0.05;
  const playerSize = { width: 1, height: 1 }; // Size of the player sprite

  // Check if the next position collides with a wall (considering player size)
  const checkCollision = (newX, newY) => {
    return walls.some(([wx, wy]) => {
      const wallSize = { width: 1, height: 1 }; // Wall size
      // Check if the player's bounding box overlaps with the wall's bounding box
      return (
        newX + playerSize.width / 2 > wx - wallSize.width / 2 &&
        newX - playerSize.width / 2 < wx + wallSize.width / 2 &&
        newY + playerSize.height / 2 > wy - wallSize.height / 2 &&
        newY - playerSize.height / 2 < wy + wallSize.height / 2
      );
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setDirection((prev) => ({ ...prev, y: 1 }));
          break;
        case "ArrowDown":
          setDirection((prev) => ({ ...prev, y: -1 }));
          break;
        case "ArrowLeft":
          setDirection((prev) => ({ ...prev, x: -1 }));
          break;
        case "ArrowRight":
          setDirection((prev) => ({ ...prev, x: 1 }));
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
          setDirection((prev) => ({ ...prev, y: 0 }));
          break;
        case "ArrowLeft":
        case "ArrowRight":
          setDirection((prev) => ({ ...prev, x: 0 }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Update the sprite's position based on direction and speed
  useFrame(() => {
    const newX = position[0] + direction.x * speed;
    const newY = position[1] + direction.y * speed;

    // Only move if no collision
    if (!checkCollision(newX, newY)) {
      setPosition([newX, newY, position[2]]);
    }
    ref.current.position.set(...position);
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[playerSize.width, playerSize.height]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  );
}

// Labyrinth Layout (remains unchanged)
function Labyrinth({ walls }) {
  return (
    <>
      {walls.map(([x, y], index) => (
        <Wall key={index} position={[x, y, 0]} scale={[1, 1, 1]} />
      ))}
    </>
  );
}

// Dialogue component
function Dialogue({ dialogues, characterImage }) {
  const [currentDialogue, setCurrentDialogue] = useState(0);

  // Advance dialogue when spacebar is pressed
  useEffect(() => {
    const handleSpacebar = (event) => {
      if (event.key === " ") {
        setCurrentDialogue((prev) => (prev + 1) % dialogues.length);
      }
    };

    window.addEventListener("keydown", handleSpacebar);
    return () => {
      window.removeEventListener("keydown", handleSpacebar);
    };
  }, [dialogues]);

  return (
    <div style={styles.dialogueBox}>
      <img src={characterImage} alt="Character" style={styles.characterImage} />
      <div style={styles.dialogueText}>{dialogues[currentDialogue]}</div>
    </div>
  );
}

// Main Scene component with Back button and Dialogue system
function Scene({ onBack }) {
  const walls = [
    // Trapezoid shape at the top of the screen
    [-3, 3],
    [-2, 3],
    [-1, 3],
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3], // Top row
    [-2.5, 2],
    [-1.5, 2],
    [-0.5, 2],
    [0.5, 2],
    [1.5, 2],
    [2.5, 2], // Middle row
    [-2, 1],
    [-1, 1],
    [0, 1],
    [1, 1],
    [2, 1], // Bottom row
  ];

  const dialogues = [
    "Hello there! Welcome to the game.",
    "Press the arrow keys to move around.",
    "Watch out for the walls!",
    "Have fun and good luck!",
  ];

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        style={{ width: "100%", height: "100%", background: "lightblue" }}
      >
        {/* Orthographic camera for 2D view */}
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} />

        {/* Add lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Sprite (Player) */}
        <Sprite walls={walls} />

        {/* Labyrinth Walls */}
        <Labyrinth walls={walls} />
      </Canvas>

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Back
      </button>

      {/* Dialogue */}
      <Dialogue dialogues={dialogues} characterImage="/char-face.png" />
    </div>
  );
}

// Simple styles for the dialogue box
const styles = {
  dialogueBox: {
    position: "absolute",
    bottom: "20px",
    left: "10px",
    width: "95%",
    height: "100px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "10px",
  },
  characterImage: {
    width: "80px",
    height: "80px",
    marginRight: "20px",
  },
  dialogueText: {
    fontSize: "18px",
  },
};

export default Scene;
