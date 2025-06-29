const container = document.getElementById("plaene-container");
const dropdown = document.getElementById("ansicht");

// Gruppierungsfunktion
const gruppiereNach = (array, eigenschaft) =>
  array.reduce((ergebnis, element) => {
    if (!ergebnis[element[eigenschaft]]) {
      ergebnis[element[eigenschaft]] = [];
    }
    ergebnis[element[eigenschaft]].push(element);
    return ergebnis;
  }, {});

function renderAnsicht(nach) {
    container.innerHTML = "";

    const gruppiert = gruppiereNach(plaene, nach);

    for (let gruppe in gruppiert) {
        const section = document.createElement("section");
        const heading = document.createElement("h2");
        heading.textContent = gruppe;
        section.appendChild(heading);

        const ul = document.createElement("ul");
        for (let plan of gruppiert[gruppe]) {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = "plan.html";
            link.textContent = plan.name;

            li.appendChild(link);
            li.innerHTML += ` (${plan.getAnzahlKurse()} Kurse, ${plan.getAnzahlStunden()} Stunden)`;
            ul.appendChild(li);
        }

        section.appendChild(ul);
        container.appendChild(section);
    }
}

// Event-Listener für Dropdown
dropdown.addEventListener("change", () => {
    renderAnsicht(dropdown.value);
});

// Standardansicht beim Laden
renderAnsicht("semester");
