const express = require("express");
const path = require("path");

const app = express();
const PORT = 8123;

// View-Engine: EJS verwenden
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Statische Dateien aus dem "public"-Ordner bereitstellen
app.use(express.static(path.join(__dirname, "public")));

// Body-Parser für Formulardaten aktivieren
app.use(express.urlencoded({ extended: true }));

// Routing einbinden
const routes = require("./routes/routes");
app.use("/", routes);

// 404-Seite bei nicht vorhandenen Routen
app.use((req, res) => {
  res.status(404).render("404", { url: req.originalUrl });
});

// Server starten
app.listen(PORT, () => {
  console.log(`✅ Server läuft unter http://localhost:${PORT}`);
});
