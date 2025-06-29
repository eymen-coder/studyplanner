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

module.exports = Kurs;
