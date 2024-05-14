#!/usr/bin/node

const request = require("request");

request(process.argv[2], (error, response, body) => {
  if (!error) {
    const movies = JSON.parse(body).results;
    let count = 0;
    for (const movie of movies) {
      if (movie.characters.some((character) => character.endsWith("/18/"))) {
        count++;
      }
    }
    console.log(count);
  }
});
