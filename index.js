const app = require('./server');
// const PORT = require('./config').PORT[process.env.NODE_ENV];

app.listen(3000, function () {
  console.log(`listening on port 3000`);
});