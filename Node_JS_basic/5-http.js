const http = require('http');
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

const app = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const data = await countStudents(process.argv[2]);
      res.end(`This is the list of our students\n${data}`);
    } catch (error) {
      res.end(error.message);
    }
  } else {
    res.end('Invalid endpoint');
  }
});

app.listen(1245);
module.exports = app;
