import "./Home.css";

function Home() {
  return (
    <div className="container-fluid home-container">
      <h1 className="text-center text-info cinematic-text">
        {"Welcome to Whack-a-Mole Madness!".split("").map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
      <h2 className="text-center text-light">How to Play?</h2>
      <p className="text-center text-light">
        <div class="game-intro text-center">
    <h4> The sneaky moles are popping up everywhere – do you have what it takes to stop them?</h4>
    <h4> Grab your hammer and get ready for some fast-paced, whack-tastic action!</h4>
    <h4> Hit as many moles as you can before time runs out and climb the leaderboard!</h4>
    <h4> Reflexes, speed, and precision will be your best weapons. Are you ready?</h4>
    <h4 style={{color:"green"}}> Let the Whacking Begin! 🚀</h4>
</div>

      </p>
    </div>
  );
}

export default Home;
