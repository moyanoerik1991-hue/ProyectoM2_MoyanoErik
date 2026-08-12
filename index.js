const { app } = require("./src/server");
const { loadEnvFile } = require('node:process');

if (process.env.NODE_ENV !== 'production') {
  loadEnvFile('.env');
}

const PORT = 3000;

console.log('Server is starting...3');
console.log('Server is starting...2');
console.log('Server is starting...1');

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
