const express = require("express");
const router = express.Router();

const {
  holePlaeneGruppiertNachSemester,
  holePlaeneGruppiertNachStudiengang,
  ermittleSemesterplanZuId,
  ermittleStudiengangZuId,
  ermittleKursZuStudiengangUndId,
  erstelleSemesterplan,
  holeAlleStudiengaenge
} = require("../models/persistence");

// 🔁 Startseite → Weiterleitung auf /index
router.get("/", (req, res) => {
  res.redirect("/index");
});

// 📄 Übersicht der Semesterpläne (nach Semester oder Studiengang gruppiert)
router.get("/index", (req, res) => {
  const gruppierung = req.query.gruppierung || "Semester";
  let plaene;

  if (gruppierung === "Studiengang") {
    plaene = holePlaeneGruppiertNachStudiengang();
  } else {
    plaene = holePlaeneGruppiertNachSemester();
  }

  res.render("index", { plaene, gruppierung });
});

// 📘 Detailansicht eines Semesterplans
router.get("/plan", (req, res) => {
  const id = req.query.id;
  const plan = ermittleSemesterplanZuId(id);

  if (!plan) {
    return res.status(404).render("404", { url: req.originalUrl });
  }

  const studiengang = ermittleStudiengangZuId(plan.studiengang);
  res.render("plan", { plan, studiengang });
});

// 📘 Kursdetails anzeigen (/kurs?sid=X&kid=Y)
router.get("/kurs", (req, res) => {
  const sid = req.query.sid;
  const kid = req.query.kid;
  const kurs = ermittleKursZuStudiengangUndId(sid, kid);

  if (!kurs) {
    return res.status(404).render("404", { url: req.originalUrl });
  }

  res.render("kurs", { kurs });
});

// 🧱 Schritt 1: Planerstellung starten → Studiengang wählen
router.get("/neu", (req, res) => {
  const studiengaenge = holeAlleStudiengaenge();
  res.render("plan-neu-schritt1", { studiengaenge });
});

// 🧱 Schritt 2: POST /waehleStudiengang → Kurse wählen
router.post("/waehleStudiengang", (req, res) => {
  const studiengangId = req.body.studiengang;
  const studiengang = ermittleStudiengangZuId(studiengangId);

  if (!studiengang) {
    return res.status(404).render("404", { url: req.originalUrl });
  }

  res.render("plan-neu-schritt2", { studiengang });
});

// ✅ Plan abschließen → Semesterplan speichern
router.post("/neu", (req, res) => {
  const { name, semester, jahr, studiengang, kurse } = req.body;

  const kursListe = Array.isArray(kurse) ? kurse : [kurse];
  const kursObjekte = kursListe
    .map(id => ermittleKursZuStudiengangUndId(studiengang, id))
    .filter(k => k); // nur gültige Kurse

  erstelleSemesterplan(name, semester, parseInt(jahr), studiengang, kursObjekte);
  res.redirect("/index");
});

module.exports = router;
