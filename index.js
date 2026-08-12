const { app } = require("./src/server");

const PORT = 3000;

console.log('Server is starting...3');
console.log('Server is starting...2');
console.log('Server is starting...1');

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
