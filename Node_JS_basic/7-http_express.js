const express = require('express');
const fs = require('fs').promises;

const countStudents = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8');
    const students = data.trim().split('\n').slice(1).filter(Boolean);
    const totalStudents = students.length;

    const fields = students.reduce((acc, student) => {
      const [firstname, , , field] = student.split(',');
      acc[field] = acc[field] || [];
      acc[field].push(firstname);
      return acc;
    }, {});

    let result = `Number of students: ${totalStudents}`;
    for (const [field, names] of Object.entries(fields)) {
      result += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
    }
    return result;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const data = await countStudents(process.argv[2]);
    res.send(`This is the list of our students\n${data}`);
  } catch (err) {
    res.send(`This is the list of our students\n${err.message}`);
  }
});

app.listen(port);

module.exports = app;
