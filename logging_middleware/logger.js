const axios = require("axios");

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsYWtzaG1pcHJhdmFsbGlrYV9rYXR0YW11cmlAc3JtYXAuZWR1LmluIiwiZXhwIjoxNzc3Njk5NjY5LCJpYXQiOjE3Nzc2OTg3NjksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkZGZiNjI2OC1kMGU1LTQyZTQtYjY1MS01NzdiNTVlMDA3ZDciLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJsYWtzaG1pIHByYXZhbGxpa2EiLCJzdWIiOiJiNzk3MDA1NC1jZjNlLTQ0NmMtOWFhMy1iM2Q2NGNiNzg5MzMifSwiZW1haWwiOiJsYWtzaG1pcHJhdmFsbGlrYV9rYXR0YW11cmlAc3JtYXAuZWR1LmluIiwibmFtZSI6Imxha3NobWkgcHJhdmFsbGlrYSIsInJvbGxObyI6ImFwMjMxMTAwMTE2MjUiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJiNzk3MDA1NC1jZjNlLTQ0NmMtOWFhMy1iM2Q2NGNiNzg5MzMiLCJjbGllbnRTZWNyZXQiOiJtcXZYZEhwZHhhVFR5ZWNWIn0.FG44yx5HPNxhtD10-fgLVPPHYpv4C0Xqg3-X7oRSbkQ"; 

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Log created:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

module.exports = Log;