const express = require("express");
const axios = require("axios");
const router = express.Router();
const Log = require("../logging_middleware/logger");

const BASE_URL = "http://20.207.122.201/evaluation-service";

// ✅ YOUR NEW TOKEN
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsYWtzaG1pcHJhdmFsbGlrYV9rYXR0YW11cmlAc3JtYXAuZWR1LmluIiwiZXhwIjoxNzc3NzA1Mzg1LCJpYXQiOjE3Nzc3MDQ0ODUsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiZDcwZWFiNC00YmU5LTQ0OTItYWYyZS1lZDk3NWU0N2RiMGMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJsYWtzaG1pIHByYXZhbGxpa2EiLCJzdWIiOiJiNzk3MDA1NC1jZjNlLTQ0NmMtOWFhMy1iM2Q2NGNiNzg5MzMifSwiZW1haWwiOiJsYWtzaG1pcHJhdmFsbGlrYV9rYXR0YW11cmlAc3JtYXAuZWR1LmluIiwibmFtZSI6Imxha3NobWkgcHJhdmFsbGlrYSIsInJvbGxObyI6ImFwMjMxMTAwMTE2MjUiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJiNzk3MDA1NC1jZjNlLTQ0NmMtOWFhMy1iM2Q2NGNiNzg5MzMiLCJjbGllbnRTZWNyZXQiOiJtcXZYZEhwZHhhVFR5ZWNWIn0.EUUT_yWA7-FjxANoz8nGhvkUED_LCB68WPESHIhjyYI";

// Priority weights
const PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1
};

router.get("/priority-inbox", async (req, res) => {
  await Log("backend", "info", "route", "Priority inbox requested");

  try {
    // 🔹 Fetch notifications
    const response = await axios.get(`${BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`  
      }
    });

    const notifications = response.data.notifications;

    await Log("backend", "info", "service", "Notifications fetched");

    // 🔥 SORT: priority first, then latest
    const sorted = notifications
      .map(n => ({
        ...n,
        weight: PRIORITY[n.Type] || 0
      }))
      .sort((a, b) => {
        if (b.weight !== a.weight) return b.weight - a.weight;
        return new Date(b.Timestamp) - new Date(a.Timestamp);
      });

    // 🔥 TOP 10
    const top10 = sorted.slice(0, 10).map(n => ({
      ID: n.ID,
      Type: n.Type,
      Message: n.Message,
      Timestamp: n.Timestamp,
      Priority: n.weight
    }));

    await Log("backend", "info", "service", "Top 10 computed");

    res.json({
      totalNotifications: notifications.length,
      top10: top10
    });

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);
    await Log("backend", "error", "route", error.message);

    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;