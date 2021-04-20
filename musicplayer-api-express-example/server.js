/**
 * Vad ska vi göra?
 * Ett API som returnerar låtar
 * 
 * Hur ska det se ut?
 * Endpoints:
 *
 * Url: /api/songs/search
 * Description: Baserat på ett sökkriterie returnera låtar från sökningen
 * Method: GET
 * Params: name, artist
 * 
 * Url: /api/songs/all
 * Description: Returnera alla låtar
 * Method: GET
 * 
 */
const express = require('express');
const app = express();

app.use(express.json());

const songs = [
  {
      url: 'https://p.scdn.co/mp3-preview/a3b5cf9da8473c959c6833e75404379db9226ba7?cid=774b29d4f13844c495f206cafdad9c86',
      name: 'When Christmas Comes to Town',
      artist: 'Matthew Hall, Meagan Moore'
  },
  {
      url: 'https://p.scdn.co/mp3-preview/ad04264bcbf286030f90895dacdc2af00e586c99?cid=774b29d4f13844c495f206cafdad9c86',
      name: 'Spirit of the season',
      artist: 'Alan Silvestri'
  },
  {
      url: 'https://p.scdn.co/mp3-preview/729371ac317464304d4ca3511653bbe866ac7cef?cid=774b29d4f13844c495f206cafdad9c86',
      name: 'Suite from The Polar Express',
      artist: 'Alan Silvestri'
  }
];

app.get('/api/songs/search', (request, response) => {
  console.log('Name:', request.query.name);
  console.log('Artist:', request.query.artist);
  const name = request.query.name;
  const artist = request.query.artist;

  if (name) {
    const result = songs.filter((song) => {
      return song.name === name
    });

    response.json(result);
  } else if (artist) {
    const result = songs.filter((song) => {
      return song.artist === artist
    });

    if (result.length > 0) {
      response.json(result);
    } else {
      response.json({ message: 'Inga låtar hittades' });
    }
  }
});

app.get('/api/songs/all', (request, response) => {
  response.json(songs);
});

app.post('/api/songs/add', (request, response) => {
  console.log('Body:', request.body);
  const songToAdd = request.body;
  songs.push(songToAdd);

  response.json(songs);
});

app.listen(8000, () => {
  console.log('Server started');
});


// const song = {
//       "url": "https://p.scdn.co/mp3-preview/a3b5cf9da8473c959c6833e75404379db9226ba7?cid=774b29d4f13844c495f206cafdad9c86",
//       "name": "When Christmas Comes to Town",
//       "artist": "Matthew Hall, Meagan Moore" 
// }
// fetch('http://awesome-todo-api.herokuapp.com/tasks', {
//   body: JSON.stringify(song), 
//   method: 'POST', 
//   headers: { 'Content-Type': 'application/json' }}
// )