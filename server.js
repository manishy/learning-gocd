const http = require('http');
const updateDB = require("./utility.js").updateDB;
const app = require("./app.js")
const PORT = 5000;
let server = http.createServer(app);
server.on('error', e => console.error('**error**', e.message));
server.listen(PORT, (e) => console.log(`server listening at ${PORT}`));
process.on('SIGINT', function() {
  console.log("shutting down...");
  server.close(function() {
    console.log("shut down!");
    updateDB();
    process.exit();
  });
});
