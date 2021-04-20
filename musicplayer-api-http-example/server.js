const http = require('http');
//Bibliotek för att hantera url:er
const url = require('url');
const server = http.createServer();

const songs = [
  {
      url: 'https://p.scdn.co/mp3-preview/a3b5cf9da8473c959c6833e75404379db9226ba7?cid=774b29d4f13844c495f206cafdad9c86',
      Namn: 'When Christmas Comes to Town',
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
]

server.on('request', (request, response) => {
  //Parsa url:en och plocka ut query parametrarna
  const query = url.parse(request.url,true).query;

  let result = {}

  if (request.url.includes('/api/songs/search')) {
    if (query.name) {
      result.songs = songs.filter((song) => {
        return song.name === query.name
      });
    } else if (query.artist) {
      result.songs = songs.filter((song) => {
        return song.artist === query.artist
      });
    } 
  } else if (request.url === '/api/songs/all') {
    result.songs = songs;
  }

  response.end(JSON.stringify(result));
});

server.listen(8000, () => {
  console.log('Server started');
})