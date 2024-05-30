const http = require('http');
const fs = require('fs').promises;
const url = require('url');

const processStudents = async (filePath) => {
  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    const fileLines = fileData.trim().split('\n');

    const studentRecords = fileLines.slice(1).filter((line) => line.trim() !== '');
    const totalStudents = studentRecords.length;

    const fieldGroups = {};

    studentRecords.forEach((record) => {
      const [firstName, , , field] = record.split(',');
      if (!fieldGroups[field]) {
        fieldGroups[field] = [];
      }
      fieldGroups[field].push(firstName);
    });

    let result = `Number of students: ${totalStudents}\n`;
    for (const [field, names] of Object.entries(fieldGroups)) {
      result += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
    }
    return result.trim();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

// Create the HTTP server
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  const requestPath = url.parse(req.url, true).path;
  if (requestPath === '/') {
    res.end('Hello Holberton School!');
  } else if (requestPath === '/students') {
    res.write('This is the list of our students\n');
    processStudents(process.argv[2])
      .then((data) => { res.end(data); })
      .catch((error) => { res.end(error.message); });
  } else {
    res.end('Invalid endpoint');
  }
});

app.listen(1245);

module.exports = app;
