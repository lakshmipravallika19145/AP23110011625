const express = require("express");
const app = express();

// ✅ Middleware first
app.use(express.json());

const middleware = require("../logging_middleware/middleware");
app.use(middleware);

// ✅ Routes after imports
const vehicleRoutes = require("./vehicle_scheduler");
const priorityRoutes = require("./priority_inbox");

app.use("/", vehicleRoutes);
app.use("/", priorityRoutes);

// ✅ Test route
app.get("/", async (req, res) => {
  res.send("Server running");
});

// ✅ Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});