const express = require("express");
const axios = require("axios");
const router = express.Router();
const Log = require("../logging_middleware/logger");

const BASE_URL = "http://20.207.122.201/evaluation-service";

// HARDCODED FRESH TOKEN (replace when expired)
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsYWtzaG1pcHJhdmFsbGlrYV9rYXR0YW11cmlAc3JtYXAuZWR1LmluIiwiZXhwIjoxNzc3NzAzOTIzLCJpYXQiOjE3Nzc3MDMwMjMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJjMzI5NTIxNy1kMWI4LTQ2NTItYmY3MC1iYWRlZDU4ODAxYTQiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJsYWtzaG1pIHByYXZhbGxpa2EiLCJzdWIiOiJiNzk3MDA1NC1jZjNlLTQ0NmMtOWFhMy1iM2Q2NGNiNzg5MzMifSwiZW1haWwiOiJsYWtzaG1pcHJhdmFsbGlrYV9rYXR0YW11cmlAc3JtYXAuZWR1LmluIiwibmFtZSI6Imxha3NobWkgcHJhdmFsbGlrYSIsInJvbGxObyI6ImFwMjMxMTAwMTE2MjUiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJiNzk3MDA1NC1jZjNlLTQ0NmMtOWFhMy1iM2Q2NGNiNzg5MzMiLCJjbGllbnRTZWNyZXQiOiJtcXZYZEhwZHhhVFR5ZWNWIn0.Z5omRlgX1SXtKgJWQgDFeYWOTGQyIGly-3sjPOCA3ro";

function knapsack(vehicles, capacity) {
  const n = vehicles.length;
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { Duration, Impact } = vehicles[i - 1];
    for (let w = 0; w <= capacity; w++) {
      if (Duration <= w) {
        dp[i][w] = Math.max(Impact + dp[i - 1][w - Duration], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  let w = capacity;
  let selected = [];
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(vehicles[i - 1]);
      w -= vehicles[i - 1].Duration;
    }
  }

  return {
    selectedTasks: selected.map(v => ({
      TaskID: v.TaskID || v.ID,
      Duration: v.Duration,
      Impact: v.Impact
    })),
    totalImpact: dp[n][capacity],
    totalDuration: selected.reduce((sum, v) => sum + v.Duration, 0)
  };
}

router.get("/optimize-vehicles", async (req, res) => {
  await Log("backend", "info", "route", "Vehicle optimization started");

  try {
    const headers = { Authorization: `Bearer ${TOKEN}` };

    const depotRes = await axios.get(`${BASE_URL}/depots`, { headers });
    const depots = depotRes.data.depots;
    await Log("backend", "info", "service", "Fetched depots");

    const vehicleRes = await axios.get(`${BASE_URL}/vehicles`, { headers });
    const vehicles = vehicleRes.data.vehicles;
    await Log("backend", "info", "service", "Fetched vehicles");

    const results = depots.map(depot => ({
      depotID: depot.ID,
      mechanicHours: depot.MechanicHours,
      ...knapsack(vehicles, depot.MechanicHours)
    }));

    await Log("backend", "info", "service", "Optimization done for all depots");

    res.json({ results });

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);
    await Log("backend", "error", "route", error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

module.exports = router;