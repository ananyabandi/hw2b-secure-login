const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const safeMode = true;

// Fake account: the password is stored as a salted bcrypt hash.
const user = {
  email: "student@example.com",
  passwordHash: bcrypt.hashSync("DemoPass123!", 12),
};

app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body || {};

  // Server-side validation cannot be bypassed by editing the HTML.
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !email.includes("@") ||
    password.length < 8 ||
    email.length > 254 ||
    password.length > 128
  ) {
    return res.status(400).json({
      message: "Email must contain @. Password must be 8–128 characters.",
      safeMode,
    });
  }

  try {
    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (email.trim() === user.email && passwordMatches) {
      return res.json({
        message: "Login successful! Demo credentials verified.",
        safeMode,
      });
    }

    // Intentionally reflect input in vulnerable mode.
    return res.status(401).json({
      message: safeMode
        ? "Invalid email or password."
        : `Login failed for ${email}`,
      safeMode,
    });
  } catch {
    return res.status(500).json({
      message: "Unable to process login.",
      safeMode,
    });
  }
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Open http://127.0.0.1:3000");
  console.log(`Output mode: ${safeMode ? "fixed" : "vulnerable"}`);
});