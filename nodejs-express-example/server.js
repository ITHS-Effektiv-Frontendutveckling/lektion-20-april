//Importera npm modul express
const express = require('express');
//Skapa en server kan liknas med http.createServer()
const app = express();

//Används för statiska filer (HTML, CSS, JS, bilder etc)
//Express kommer automatiskt att skicka tillbaka dessa filer i mappen frontend
//om url:en matchas ex /style.css
app.use(express.static('frontend'));

//En array med insults att skicka tillbaka till frontend
const insults = [
  {
    insult: "Never hung poison on a fouler toad",
    play: "Rickard III"
  },
  {
    insult: "He thinks too much: such men are dangerous. ",
    play: "Julius Ceasar"
  }
];

function randomInsult() {
  //Slumpa ett tal mellan 0 och 1
  const index = Math.floor(Math.random() * insults.length);
  //Plocka ut och returnera det objekt som finns på den slumpade positionen
  return insults[index];
}

//En route i express säger att om ett request matchar i HTTP-metod(GET, POST, DELETE etc) och
//url så kör den tillhörande callback-funktion och skickar tillbaka ett svar till klienten
app.get('/api/insults', (request, response) => {
  console.log('Inside route /api/insults');
  //Skicka tillbaka alla insults som ett json-objekt
  response.json(insults);
});

app.get('/api/insults/random', (request, response) => {
  const insult = randomInsult();
  //Skicka tillbaka slumpad insult som ett json-objekt
  response.json(insult);
});

app.get('/api/insults/search', (request, response) => {
  console.log('Query params:', request.query);
  //Hämta ut värdet från en query parameter
  const name = request.query.name;

  //Sök igenom vår insults array efter träffar och returnera de objekt som
  //uppfyller vårt kriterie
  const result = insults.filter((insult) => {
    return insult.play === name
  });

  console.log('Result:', result);
  //Skicka tillbaka hittade insults som ett json-objekt
  response.json(result);
});

app.get('/about', (request, response) => {
  console.log('Inside route /about');
  response.send('About page');
});

//Lyssnar på port 8000
app.listen(8000, () => {
  console.log('Server started');
});