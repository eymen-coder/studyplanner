const getViewportWidth = () => window.innerWidth || document.documentElement.clientWidth;

console.log(`Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`);

// Konstanten für gültige Kurstypen
const KURS_TYPEN = {
    V: "Vorlesung",
    Ü: "Übung",
    P: "Praktikum",
    ÜPP: "Übung/Praktikum",
    SV: "Seminaristische Vorlesung",
    T: "Tutorium",
    S: "Seminar",
    Org: "Organisatorische Veranstaltung"
};

// Fachobjekte

class Termin {
    constructor(wochentag, beginn, raum) {
        this.wochentag = wochentag;
        this.beginn = beginn;
        this.raum = raum;
    }
}

class Lehrperson {
    constructor(name, kuerzel) {
        this.name = name;
        this.kuerzel = kuerzel;
    }
}

class Kurs {
    constructor(modulId, name, typ, termin, lehrperson) {
        if (!Kurs.istValiderTyp(typ)) {
            throw new Error(`Ungültiger Kurstyp: ${typ}`);
        }

        this.modulId = modulId;
        this.name = name;
        this.typ = typ;
        this.termin = termin;
        this.lehrperson = lehrperson;
        this.id = `${modulId}_${termin.wochentag}_${termin.beginn}_${termin.raum}`;
    }

    static istValiderTyp(typ) {
        return Object.keys(KURS_TYPEN).includes(typ);
    }
}

class Studiengang {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.kurse = [];
    }

    addKurs(kurs) {
        this.kurse.push(kurs);
    }

    getKursById(id) {
        return this.kurse.find(k => k.id === id);
    }
}

class Semesterplan {
    static counter = 1;

    constructor(name, semester) {
        this.name = name;
        this.semester = semester;
        this.kurse = [];
        this.id = Semesterplan.counter++;
    }

    addKurse(kurseArray) {
        this.kurse.push(...kurseArray);
    }

    getAnzahlKurse() {
        return this.kurse.length;
    }

    getAnzahlStunden() {
        // Fürs Beispiel: jeder Kurs = 2 Stunden
        return this.kurse.length * 2;
    }
}

// Beispiel-Daten

const lehrperson1 = new Lehrperson("Prof. Dr. Müller", "PM");
const termin1 = new Termin("Mo", "10:00", "R101");
const termin2 = new Termin("Di", "14:00", "R202");
const termin3 = new Termin("Mi", "08:00", "R303");

const kurs1 = new Kurs("46834", "Künstliche Intelligenz", "V", termin1, lehrperson1);
const kurs2 = new Kurs("46812", "Datenbanken 2", "Ü", termin2, lehrperson1);
const kurs3 = new Kurs("46990", "BWL-Anwendungen", "P", termin3, lehrperson1);

// Studiengang
const studiengang = new Studiengang("WIPB", "Wirtschaftsinf. BPO 2018");
studiengang.addKurs(kurs1);
studiengang.addKurs(kurs2);
studiengang.addKurs(kurs3);

// Semesterplan
const semesterplan = new Semesterplan("Mein Plan", "WiSe 25");
semesterplan.addKurse([kurs1, kurs2, kurs3]);

// Sortieren nach modulId
studiengang.kurse.sort((a, b) => a.modulId.localeCompare(b.modulId));
semesterplan.kurse.sort((a, b) => a.modulId.localeCompare(b.modulId));

// Konsolenausgabe
console.log(`${studiengang.name} (${studiengang.id}):`);
studiengang.kurse.forEach(k => console.log(`    ${k.modulId}: ${k.name}`));

console.log(`${semesterplan.name} (${semesterplan.semester}):`);
semesterplan.kurse.forEach(k => console.log(`    ${k.modulId}: ${k.name}`));

/* Praktika 9 */ 
// Zusätzliche Beispielkurse
const kurs4 = new Kurs("11111", "Webtechnologien", "SV", termin1, lehrperson1);
const kurs5 = new Kurs("22222", "Machine Learning", "S", termin2, lehrperson1);
const kurs6 = new Kurs("33333", "Rechnernetze", "T", termin3, lehrperson1);

// Zusätzliche Semesterpläne
const semesterplan2 = new Semesterplan("Mein Plan 2", "Sose 26");
semesterplan2.studiengang = "INPBPI";
semesterplan2.addKurse([kurs4]);

const semesterplan3 = new Semesterplan("Mein Plan 3", "WiSe 27");
semesterplan3.studiengang = "INPBPI";
semesterplan3.addKurse([kurs5, kurs6]);

// Studiengang hinzufügen für den ersten Plan (falls noch nicht gesetzt)
semesterplan.studiengang = "WIPB";

// Alle Pläne zusammenfassen
const plaene = [semesterplan, semesterplan2, semesterplan3];