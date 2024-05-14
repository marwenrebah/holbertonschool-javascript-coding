#!/usr/bin/node

const request = require("request");
const url = "https://swapi-api.hbtn.io/api/films/" + process.argv[2];

request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    const result = JSON.parse(body).characters.filter((character) =>
      character.includes("/18/")
    );
    console.log(result.length);
  }
});
