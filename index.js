const express = require('express');
const { Router } = require('express');

const app = express();
const router = Router();
const port = 3000;

app.use(router);
app.use(express.json());

console.log('Server is starting...');
console.log('Server is starting...');
console.log('Server is starting...');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
