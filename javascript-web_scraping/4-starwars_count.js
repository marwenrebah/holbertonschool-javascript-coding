#!/usr/bin/node

const request = require("request");
const url = "https://swapi-api.hbtn.io/api/films/" + process.argv[2];

request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    let count = 0;
    for (const character of JSON.parse(body).characters) {
      if (character.includes("/18/")) {
        count++;
      }
    }
    console.log(count);
  }
});
