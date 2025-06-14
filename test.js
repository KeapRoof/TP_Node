// test.js
import express from 'express';

const app = express();

app.get('/ping', (req, res) => {
  console.log('Ping received');
  res.send('pong');
});

app.listen(3000, () => {
  console.log('Test server running on port 3000');
});