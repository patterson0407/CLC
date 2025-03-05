"use strict";

// Global variables
let totalStaked = 0;
let dayCounter = 0;
let dailyRewardRate = 0.01; // 1% daily reward for demonstration
let stakingData = [];       // array of objects: { day, stakedAmount }
let stakingChart = null;

// On DOM load
document.addEventListener("DOMContentLoaded", () => {
  const stakeForm = document.getElementById("stakeForm");
  const stakeMessage = document.getElementById("stakeMessage");

  stakeForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let amount = parseFloat(document.getElementById("stakeAmount").value);
    if (isNaN(amount) || amount <= 0) {
      stakeMessage.textContent = "Invalid stake amount.";
      return;
    }
    totalStaked += amount;
    stakeMessage.textContent = `Staked ${amount} CLC (dummy). Total: ${totalStaked} CLC.`;

    // Immediately update chart
    addDataPoint();
  });
});

// Called by "Unstake" button
function unstakeTokens() {
  const stakeMessage = document.getElementById("stakeMessage");
  let amount = parseFloat(document.getElementById("stakeAmount").value);
  if (isNaN(amount) || amount <= 0) {
    stakeMessage.textContent = "Invalid unstake amount.";
    return;
  }
  // If user tries to unstake more than staked, clamp it
  if (amount > totalStaked) {
    amount = totalStaked;
  }
  totalStaked -= amount;
  stakeMessage.textContent = `Unstaked ${amount} CLC (dummy). Total: ${totalStaked} CLC.`;
  
  // Update chart
  addDataPoint();
}

// Create or update the line chart
function addDataPoint() {
  // Each time user stakes/unstakes, we consider it a "new day" for demonstration
  dayCounter++;

  // Calculate a daily reward (dummy: 1% of totalStaked)
  let dailyReward = totalStaked * dailyRewardRate;

  // Add that reward to totalStaked
  totalStaked += dailyReward;

  // Store the data: day, stakedAmount
  stakingData.push({
    day: dayCounter,
    staked: totalStaked
  });

  updateChart();
}

// Build or update Chart.js
function updateChart() {
  const ctx = document.getElementById("stakingChart").getContext("2d");

  // If we haven't created the chart yet, build it
  if (!stakingChart) {
    stakingChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: stakingData.map(d => `Day ${d.day}`),
        datasets: [
          {
            label: "Staked + Rewards (CLC)",
            data: stakingData.map(d => d.staked.toFixed(2)),
            fill: false,
            borderColor: "#00ff88",
            tension: 0.1
          }
        ]
      },
      options: {
        scales: {
          x: { title: { display: true, text: "Days" } },
          y: { title: { display: true, text: "CLC Staked" } }
        },
        plugins: {
          legend: { display: true }
        }
      }
    });
  } else {
    // If chart exists, just update data
    stakingChart.data.labels = stakingData.map(d => `Day ${d.day}`);
    stakingChart.data.datasets[0].data = stakingData.map(d => d.staked.toFixed(2));
    stakingChart.update();
  }
}

// Minimal connectWallet function (dummy)
function connectWallet() {
  alert("Connect Wallet (dummy). In real usage, call ethers.js or web3.js here.");
}
