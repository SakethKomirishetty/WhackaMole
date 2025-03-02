import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
function SinglePlayer() {
  let navigate = useNavigate();
  const [moleIndex, setMoleIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  let { currentUser } = useSelector((state) => state.userLogin);
  function navGame() {
    navigate("/game");
  }
  // Function to randomly place the mole
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const interval = setInterval(() => {
        setMoleIndex(Math.floor(Math.random() * 9));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (isGameOver) {
      const updateScore = async () => {
        try {
          let userObj = {
            user: currentUser,
            score: score,
          };

          await axios.post(
            "https://whackamole-1.onrender.com/user-api/update-score",
            userObj
          );
        } catch (error) {
          console.error("Error updating score:", error);
        }
      };
      updateScore();
    }
  }, [isGameOver, score]);

  // Countdown Timer
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
    }
  }, [timeLeft]);

  // Handle clicking on a box
  const handleClick = (index) => {
    if (index === moleIndex) {
      setScore(score + 1);
    }
  };

  // Start game when user selects time
  const startGame = (time) => {
    setSelectedTime(time);
    setTimeLeft(time);
    setScore(0);
    setIsGameOver(false);
  };

  // Restart game
  const restartGame = () => {
    setSelectedTime(null);
    setTimeLeft(null);
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div className="text-center mt-3">
      {/* Time Selection */}
      {!selectedTime && (
        <div className="mt-3">
          <h3 className="text-light">The Moles Won’t Stop… But Can You?</h3>
          <h4 className="text-light">Select Game Duration:</h4>
          <Button
            variant="primary"
            className="m-2 py-3"
            onClick={() => startGame(30)}
          >
            30s
          </Button>
          <Button
            variant="success"
            className="m-2 py-3"
            onClick={() => startGame(60)}
          >
            60s
          </Button>
          <Button
            variant="danger"
            className="m-2 py-3"
            onClick={() => startGame(120)}
          >
            120s
          </Button>
        </div>
      )}

      {/* Game Info */}
      {selectedTime && (
        <>
          <h2></h2>
          <h2 className="text-info fw-bold">⏳ Time Left: {timeLeft}s</h2>
          <h4 className="text-light fw-bold">💥 Score: {score}</h4>

          {/* Grid for Whack-a-Mole */}
          <div className="d-flex flex-column align-items-center">
            {[0, 1, 2].map((row) => (
              <div key={row} className="d-flex">
                {[0, 1, 2].map((col) => {
                  const index = row * 3 + col;
                  return (
                    <div
                      key={index}
                      className={`card m-2 ${
                        index === moleIndex ? "bg-success" : "bg-secondary"
                      }`}
                      style={{
                        height: 70,
                        width: 70,
                        cursor: "pointer",
                        borderRadius: "50%",
                      }}
                      onClick={() => handleClick(index)}
                    ></div>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}

      <Modal show={isGameOver} centered>
        <Modal.Header className="bg-dark text-light">
          <Modal.Title>🎉 Game Over! 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h4 className="text-danger fw-bold">Your Score: {score}</h4>
          <p className="text-dark">Time's up! Want to play again?</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="success"
            size="lg"
            className="fw-bold px-4 py-2"
            onClick={restartGame}
          >
            🔄 Play Again
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="fw-bold px-4 py-2"
            onClick={navGame}
          >
            🏆 Dashboard
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SinglePlayer;
