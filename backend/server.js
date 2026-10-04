const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]); // Cloudflare & Google DNS

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ message: "API route not found" });
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ShopKart running at http://localhost:${PORT}`));
