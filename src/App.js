import React, { useState } from "react";
import "./App.css"; // assuming you have some CSS file for styling

const getRandomColor = () => {
  const colors = ["#e0d2fd"]; // define your colors here
  return colors[Math.floor(Math.random() * colors.length)];
};

function App() {
  const [hoveredBox, setHoveredBox] = useState({ x: null, y: null });

  const highlightNeighbors = (x, y) => {
    const neighbors = [
      [x, y], // current box
      [x-1, y], // left
      [x+1, y], // right
      [x - 1, y + 1], // down-left
      [x + 1, y - 1], // up-right
    ];

    neighbors.forEach(([nx, ny]) => {
      const box = document.getElementById(`${nx}-${ny}`);
      if (box) {
        box.style.backgroundColor = getRandomColor();
      }
    });
  };

  const clearColors = () => {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.style.backgroundColor = "";
    });
  };

  const handleMouseOver = (x, y) => {
    setHoveredBox({ x, y });
    clearColors();
    highlightNeighbors(x, y);
  };

  const handleMouseLeave = () => {
    clearColors();
  };

  var m=35;
  var n=20;
  return (
    <div className="App">
      {[...Array(n)].map((_, i) => (
        <div key={i} className="row">
          {[...Array(m)].map((_, j) => (
            <div
              key={`${i}-${j}`}
              id={`${i}-${j}`}
              className={`box animate ${
                hoveredBox.x === i && hoveredBox.y === j ? "hovered" : ""
              }`}
              onMouseOver={() => handleMouseOver(i, j)}
              onMouseLeave={handleMouseLeave}
            >
              {j % 2 === 0 && i % 2 === 0 && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >

                </svg>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
