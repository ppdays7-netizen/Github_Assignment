const express = require("express");
const fs = require("fs");
const session = require("express-session");
const profiles = require("./profiles");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "indian-army-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", (req, res) => {
  const enteredCode = req.body.code.trim();

  fs.readFile("auth.txt", "utf8", (err, data) => {
    if (err) {
      return res.send("Authentication file not found.");
    }

    const lines = data.split("\n").map((l) => l.trim());

    let matchedUser = null;

    lines.forEach((line) => {
      const [code, username] = line.split("|");

      if (code === enteredCode) {
        matchedUser = username;
      }
    });

    if (matchedUser && profiles[matchedUser]) {
      req.session.user = matchedUser;
      return res.redirect("/profile");
    }

    res.render("login", {
      error: "Invalid Authorization Code",
    });
  });
});

app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  const user = profiles[req.session.user];

  res.render("profile", { user });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});