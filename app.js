var http = require("http");
const confg = require("./config.json");
setInterval(function () {
  http
    .get(confg.url, (res) => {
      const { statusCode } = res;
      const contentType = res.headers["content-type"];

      let error;
      // Any 2xx status code signals a successful response but
      // here we're only checking for 200.
      if (statusCode !== 200) {
        error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
      }
      if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        console.log(chunk);
      });
    })
    .on("error", (e) => {
      console.error(`Got error: ${e.message}`);
    });
}, confg.interval); // every 20 minutes (1200000)
