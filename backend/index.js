const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bannerdb",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Create table if not exists
// db.query(`
//   CREATE TABLE IF NOT EXISTS banner (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     description TEXT,
//     image TEXT
//   )
// `);

app.get("/", (req, res) => {
  db.query("SELECT * FROM banner ORDER BY id DESC", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error fetching banners" });
    } else {
      res.json(results);
    }
  });
});

app.post("/api/banner", upload.single("image"), (req, res) => {
  const { description } = req.body;
  const image = req.file.filename;

  db.query(
    "INSERT INTO banner (description, image) VALUES (?, ?)",
    [description, image],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error updating banners" });
      } else {
        res.json({
          message: "Banners updated successfully",
          id: result.insertId,
        });
      }
    }
  );
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
