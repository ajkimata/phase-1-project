// This server-side code tells Express.js to use the public directory to serve static files like HTML and JavaScript. It also defines the /property route to receive POST requests and save data to the db.json file using the bundled server-side code.

const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/property', (req, res) => {
  // Use the bundled server-side code here to save data to db.json file
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
