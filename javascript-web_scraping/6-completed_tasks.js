#!/usr/bin/node
const request = require('request');
const url = process.argv[2];
const completedTasks = {};

request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    const tasks = JSON.parse(body);

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed === true) {
        if (completedTasks[tasks[i].userId] === undefined) {
          completedTasks[tasks[i].userId] = 1;
        } else {
          completedTasks[tasks[i].userId] += 1;
        }
      }
    }
  }
  console.log(completedTasks);
});
