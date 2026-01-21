import express from "express";
import cors from "cors";
import matchInternships from "./matcher.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Internship Matching API is running");
});

// Main matching endpoint
app.post("/match", (req, res) => {
  const { skills, interest } = req.body;

  // Basic validation
  if (!skills || !interest) {
    return res.status(400).json({
      error: "Please provide skills and interest"
    });
  }

  try {
    const results = matchInternships(skills, interest);
    res.json(results);
  } catch (error) {
    res.status(500).json({
      error: "Error while matching internships"
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
