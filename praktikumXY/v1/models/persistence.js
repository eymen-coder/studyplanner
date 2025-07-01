const fetcher = require("../models/scheduleFetcher");

// Weitere benötigte Module einbinden
const Studiengang = require("./studiengang");
const Kurs = require("./kurs");
const Lehrperson = require("./lehrperson");
const Termin = require("./termin");

const lehrangebot = [];
const semesterplaene = []; // NEU: Array für Semesterpläne

/**
 * Initialisiert die Daten der Anwendung, also die verfügbaren Studiengänge mit den
 * zugehörigen Kursen. Die Daten werden asynchron über das scheduleFetcher-Modul
 * abgerufen (Promise-API mit "then"). Danach werden die erhaltenen Daten
 * in Fachobjekte konvertiert und ins Lehrangebot übernommen.
 */
const initialisiereLehrangebot = () => {
  fetcher.fetchScheduleData().then((daten) => {
    daten.forEach((stdg) => {
      const studiengang = new Studiengang(stdg.sname, stdg.name);

      stdg.courses.forEach((kurs) => {
        const kursObjekt = new Kurs(
          kurs.courseId,
          kurs.name,
          kurs.courseType,
          kurs.courseOfStudy,
          kurs.termId,
          kurs.studentSet,
          new Lehrperson(kurs.lecturerId, kurs.lecturerSurname),
          new Termin(kurs.weekday, kurs.timeSlotBegin, kurs.roomId)
        );

        studiengang.addKurs(kursObjekt);
      });

      lehrangebot.push(studiengang);
    });

    console.log("Basisdaten initialisiert.");
  });
};

// Studiengänge & Kurse

function ermittleStudiengangZuId(id) {
  return lehrangebot.find((stg) => stg.id === id);
}

function ermittleKursZuStudiengangUndId(stgId, kursId) {
  const studiengang = ermittleStudiengangZuId(stgId);
  if (!studiengang) return undefined;
  return studiengang.getKursById(kursId);
}

function holeAlleStudiengaenge() {
  return lehrangebot;
}

// Hilfsfunktion: Gruppierung

function gruppiereNach(array, eigenschaft) {
  return array.reduce((acc, obj) => {
    const key = obj[eigenschaft];
    if (!acc[key]) acc[key] = [];
    acc[key].push(obj);
    return acc;
  }, {});
}

// NEU: Semesterpläne

function erstelleSemesterplan(name, semester, jahr, studiengangId, kurse) {
  const id = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const neuerPlan = {
    id,
    name,
    semester,
    jahr,
    studiengang: studiengangId,
    kurse
  };
  semesterplaene.push(neuerPlan);
  return neuerPlan;
}

function ermittleSemesterplanZuId(id) {
  return semesterplaene.find(p => p.id === id);
}

function holePlaeneGruppiertNachSemester() {
  return gruppiereNach(semesterplaene, "semester");
}

function holePlaeneGruppiertNachStudiengang() {
  return gruppiereNach(semesterplaene, "studiengang");
}

// Export aller Funktionen

module.exports = {
  initialisiereLehrangebot,
  ermittleStudiengangZuId,
  ermittleKursZuStudiengangUndId,
  holeAlleStudiengaenge,
  lehrangebot,
  erstelleSemesterplan,
  ermittleSemesterplanZuId,
  holePlaeneGruppiertNachSemester,
  holePlaeneGruppiertNachStudiengang
};
