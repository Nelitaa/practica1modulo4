const http = require("http");
const url = require('url');
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  const response = {
    success: true,
    message: "API Working",
  };


  res.writeHead(200, {
    "Content-type": "application/json",
  });
  console.log('test',query, pathname);
  res.end(JSON.stringify(response));
  
});

server.listen(3030, "127.0.0.1", () => {
  console.log("Listening to requests on port 3030");
});

console.log("after server");