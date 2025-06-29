// test/test.js

const http = require("http");
const port = 8844;

const {
  initialisiereLehrangebot,
  holeAlleStudiengaenge
} = require("../models/persistence");

const server = http.createServer(async (req, res) => {
  await initialisiereLehrangebot();
  const studiengaenge = holeAlleStudiengaenge();

  let html = `
  <!DOCTYPE html>
  <html lang="de">
  <head>
      <meta charset="UTF-8">
      <title>Studiengänge & Kurse</title>
  </head>
  <body>
      <h1>Alle Studiengänge</h1>
  `;

  for (const stg of studiengaenge) {
    html += `
    <section>
        <h2>${stg.name} (${stg.id})</h2>
        <p>Anzahl Module: ${stg.kurse.length}</p>
        <ul>
    `;

    for (const kurs of stg.kurse) {
      html += `<li>${kurs.modulId}: ${kurs.name} – ${kurs.typ} – ${kurs.lehrperson.name}</li>`;
    }

    html += `</ul></section>`;
  }

  html += `
  </body>
  </html>
  `;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

server.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});
