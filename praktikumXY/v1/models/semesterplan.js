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
        return this.kurse.length * 2;
    }
}

module.exports = Semesterplan;
