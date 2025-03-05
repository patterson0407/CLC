"use strict";

async function fetchPriceData() {
  return [
    { time: "12:00", price: 1.00 },
    { time: "12:05", price: 0.98 },
    { time: "12:10", price: 1.02 },
    { time: "12:15", price: 1.01 },
    { time: "12:20", price: 0.99 },
    { time: "12:25", price: 1.00 },
    { time: "12:30", price: 1.03 },
    { time: "12:35", price: 0.97 },
    { time: "12:40", price: 1.02 },
    { time: "12:45", price: 1.01 },
  ];
}

async function initPriceChart() {
  const ctx = document.getElementById("clcPriceChart").getContext("2d");
  const data = await fetchPriceData();
  const labels = data.map(d => d.time);
  const prices = data.map(d => d.price);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "CLC Price (USD)",
          data: prices,
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          tension: 0.1,
          pointRadius: 3
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { min: 0.90, max: 1.10 },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", initPriceChart);

function buyWithCard() {
  window.open("https://your-fiat-onramp.com", "_blank");
}

async function buyWithCrypto() {
  alert("Crypto purchase functionality coming soon!");
}
