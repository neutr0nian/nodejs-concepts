const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes").StatusCodes,
  app = http.createServer();

app.on("request", (req, res) => {
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html",
  });
  console.log(req.method);
  let responseMessage = "<h2>Hello</h2>";
  res.end(responseMessage);
});

app.listen(port);
console.log("The server has started and is listening on port:", port);
