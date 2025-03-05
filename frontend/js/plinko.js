"use strict";

const { Engine, Render, Runner, Bodies, Body, Events, Composite, World } = Matter;

let engine, world, render, runner;
let hasInit = false;

// Running scoreboard
let scoreboard = 0;

// Called on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("playBtn");
  if (playBtn) {
    playBtn.addEventListener("click", playPlinko);
  }
  initMatter();
});

// initMatter sets up environment
function initMatter(forceReinit = false) {
  if (hasInit && !forceReinit) return;
  if (hasInit && forceReinit) {
    Composite.clear(world, false);
    Engine.clear(engine);
    hasInit = false;
  }

  hasInit = true;
  engine = Engine.create();
  world = engine.world;

  const canvas = document.getElementById("plinkoCanvas");
  render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: 800,
      height: 700,
      wireframes: false,
      background: "transparent"
    }
  });
  Render.run(render);

  runner = Runner.create();
  Runner.run(runner, engine);

  // Boundaries
  const floor = Bodies.rectangle(400, 690, 810, 20, {
    isStatic: true,
    render: {
      fillStyle: "transparent",
      strokeStyle: "transparent",
      lineWidth: 0
    }
  });
  
  const leftWall = Bodies.rectangle(-10, 350, 20, 700, { isStatic: true });
  const rightWall = Bodies.rectangle(810, 350, 20, 700, { isStatic: true });
  Composite.add(world, [floor, leftWall, rightWall]);

  // Pegs
  for (let y = 100; y < 500; y += 50) {
    let row = (y - 100) / 50;
    for (let x = 50; x < 750; x += 50) {
      let offset = row % 2 === 0 ? 0 : 30;
      let peg = Bodies.circle(x + offset, y, 5, {
        isStatic: true,
        render: { fillStyle: "purple" }
      });
      Composite.add(world, peg);
    }
  }

  // 10 baskets => 11 dividers
  const basketCount = 15;
  const basketWidth = 800 / basketCount;

  for (let i = 0; i <= basketCount; i++) {
    let divider = Bodies.rectangle(i * basketWidth, 650, 10, 40, {
      isStatic: true,
      render: { fillStyle: "#ffffff" }
    });
    Composite.add(world, divider);
  }

  // We create random multipliers (some negative, zero, or positive)
  // e.g. from -2..5 => 8 total possibilities
  let basketMultipliers = [];
  for (let i = 0; i < basketCount; i++) {
    let val = Math.floor(Math.random() * 8) - 2; // -2, -1, 0, 1..5
    basketMultipliers.push(val);
  }

  // VISUALLY show these multipliers under the canvas
  displayBasketMultipliers(basketMultipliers);

  // Check for slow balls => set static => immediate scoring
  setInterval(() => {
    Composite.allBodies(world).forEach(body => {
      if (body.label === "ball" && !body.isStatic) {
        if (body.speed < 0.5 && body.position.y > 640) {
          Body.setStatic(body, true);
          let index = Math.floor(body.position.x / basketWidth);
          let chosenMult = basketMultipliers[index];
          body.multiplier = chosenMult;
          // immediate scoreboard update
          if (!body.hasScored) {
            let bet = parseFloat(document.getElementById("betAmount").value) || 0;
            scoreboard += bet * chosenMult;
            body.hasScored = true;
            updateScoreboard();
          }
        }
      }
    });
  }, 800);
}

// Display basket multipliers in #basketLabels
function displayBasketMultipliers(multArray) {
  const labelsDiv = document.getElementById("basketLabels");
  if (!labelsDiv) return;

  labelsDiv.innerHTML = ""; // clear old
  multArray.forEach((val, i) => {
    // create a small box or text
    let label = document.createElement("div");
    label.style.width = "50px";
    label.style.textAlign = "center";
    label.innerHTML = `x${val}`;
    labelsDiv.appendChild(label);
  });
}

// user action to drop multiple balls
function playPlinko() {
  const betEl = document.getElementById("betAmount");
  const ballsEl = document.getElementById("numBalls");
  const outcomeEl = document.getElementById("plinkoOutcome");

  let bet = parseFloat(betEl.value);
  let numBalls = parseInt(ballsEl.value);

  if (isNaN(bet) || bet <= 0) {
    outcomeEl.textContent = "Please enter a valid bet > 0 CLC.";
    return;
  }
  if (isNaN(numBalls) || numBalls < 1 || numBalls > 10) {
    outcomeEl.textContent = "Number of balls must be between 1 and 10.";
    return;
  }

  // Re-init the world
  initMatter(true);


  updateScoreboard();

  outcomeEl.textContent = `Playing Plinko with ${numBalls} ball(s) at ${bet} CLC each. Some baskets are negative!`;

  // Drop each ball from near top center
  for (let i = 0; i < numBalls; i++) {
    let randomOffset = (Math.random() - 0.5) * 50;
    let ball = Bodies.circle(400 + randomOffset, 50, 10, {
      restitution: 0.9,
      friction: 0.001,
      frictionAir: 0.001,
      label: "ball",
      render: { fillStyle: "#ff0000" }
    });
    Composite.add(world, ball);
  }
}

// scoreboard & outcome updates
function updateScoreboard() {
  const scoreboardEl = document.getElementById("scoreboard");
  scoreboardEl.textContent = `${scoreboard.toFixed(2)} CLC`;
}

// Dummy connect wallet
function connectWallet() {
  alert("Connect Wallet (dummy).");
}
