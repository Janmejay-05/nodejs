let http = require("http");
let PORT = 8081;
let fs = require("fs");

http
  .createServer((req, res) => {
    let route = "";
    switch (req.url) {
      case "/":
        route = "home.html";
        break;
      case "/about":
        route = "about.html";
        break;
      case "/features":
        route = "features.html";
        break;
      default:
        break;
    }

    fs.readFile(route, (err, data) => {
      if (!err) {
        res.end(data);
      }
    });
  })
  .listen(PORT, (err) => {
    if (err) {
      console.log("server ius not connected");
      return;
    }
    console.log("server is connected");
  });
