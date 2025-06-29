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

module.exports = Studiengang;
