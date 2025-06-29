const fetcher = require("../models/scheduleFetcher");

// Weitere benoetigte Module einbinden
const Studiengang = require("./studiengang");
const Kurs = require("./kurs");
const Lehrperson = require("./lehrperson");
const Termin = require("./termin");

const lehrangebot = [];

/**
 * Initialisiert die Daten der Anwendung, also die verfuegbaren Studiengaenge mit den
 * zugehoerigen Kursen. Die Daten werden asynchron über das scheduleFetcher-Modul
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
          new Termin(
            kurs.weekday,
            kurs.timeSlotBegin,
            kurs.roomId
          )
        );

        studiengang.addKurs(kursObjekt);
      });

      lehrangebot.push(studiengang);
    });

    console.log("Basisdaten initialisiert.");
  });
};

// Weitere Funktionen aus der Aufgabenstellung

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

// Schnittstelle des Moduls
module.exports = {
  initialisiereLehrangebot,
  ermittleStudiengangZuId,
  ermittleKursZuStudiengangUndId,
  holeAlleStudiengaenge,
  lehrangebot
};
