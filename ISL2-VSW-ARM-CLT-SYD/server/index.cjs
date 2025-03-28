global.configuration = {
  development: true,
  httpPort: 19080,
  httpsPort: 19443,
  startTime: new Date().getTime(),
};

// import http from 'http';      // To use the HTTP interfaces in Node.js
// import https from 'https';
// import fs from 'fs';          // For interacting with the file system
// import path from 'path';      // For working with file and directory paths

const http = require("http"); // To use the HTTP interfaces in Node.js
const https = require("https");
const fs = require("fs"); // For interacting with the file system
const path = require("path"); // For working with file and directory paths
// const url = require("url"); // For URL resolution and parsing

// To look up MIME types
// Full list of extensions can be found at
// https://www.iana.org/assignments/media-types/media-types.xhtml
const mimeTypes = {
  ".txt": "text/plain",
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".map": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const dist = path.join(__dirname, "../dist");

function requestProcessing(protocol, req, res) {
  try {
    const parseUrl = new URL(req.url, `${protocol}://${req.headers.host}`);
    // console.log(
    //   `${new Date().toLocaleString()} (${protocol}.${req.method})> href: "${
    //     parseUrl.href
    //   }"; pathname: "${parseUrl.pathname}"; extPathName: "${path.extname(
    //     parseUrl.pathname
    //   )}"`
    // );
    // console.log(`${protocol}.${req.method}> url: "${req.url}"`);

    // console.log("-------- parseUrl: ", parseUrl.pathname);
    if (parseUrl.pathname === "/sys/info") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ startTime: global.configuration.startTime }));
    } else {
      const send = { mimeType: "", filePath: "", content: Buffer };
      if (
        path.extname(parseUrl.pathname) === ".html" ||
        path.extname(parseUrl.pathname) === ""
      ) {
        // console.log("SEND index.html");
        send.mimeType = mimeTypes[".html"];
        send.filePath = path.join(dist, "index.html");
      } else {
        send.mimeType = mimeTypes[path.extname(parseUrl.pathname)];
        send.filePath = path.join(dist, parseUrl.pathname);
        // console.log(`SEND mimeType: "${send.mimeType}"; file: ${send.content}`);
      }

      console.log(
        `${new Date().toLocaleTimeString()} ${protocol}.${req.method}> href: "${parseUrl.href}"; SEND mimeType: "${send.mimeType}"; file: ${send.filePath}`,
      );
      // const filePath = path.join(process.cwd(), "/public", pathName);

      // Check if the requested asset exists on the server
      fs.access(send.filePath, fs.constants.R_OK, (err) => {
        if (err) {
          console.log(
            `${new Date().toLocaleTimeString()} (${protocol}.${
              req.method
            }> File does not exist: ${send.filePath}`,
          );
          res
            .writeHead(404, { "Content-Type": "text/plain" })
            // .write("404 Not Found")
            .end("404 Not Found");
        } else {
          res.writeHead(200, { "Content-Type": send.mimeType ?? "text/plain" });
          const fileStream = fs.createReadStream(send.filePath);
          fileStream.pipe(res);
        }
      });
      // res
      //   .writeHead(200, { "Content-Type": mimeTypes[".txt"] })
      //   .end("Привет, мир!!!");
    }
  } catch (ex) {
    console.error(`${protocol}.${req.method}> ERROR: `, ex);
  }
}

try {
  http
    .createServer((request, response) => {
      requestProcessing("HTTP", request, response);
      // request.headers.host
      // response.
    })
    .listen(global.configuration.httpPort, (err) => {
      if (!err)
        console.info(
          `${new Date().toLocaleString()}> HTTP Server listen on port: ${global.configuration.httpPort}`,
        );
      else console.error(`${new Date().toLocaleString()}> HTTP.listen> `, err);
    });
} catch (ex) {
  console.error(`${new Date().toLocaleString()}> HTTP> `, ex);
}

try {
  https
    .createServer(
      {
        // cert: fs.readFileSync("./sslcert/fullchain.pem"),
        // key: fs.readFileSync("./sslcert/privkey.pem"),
        pfx: fs.readFileSync(
          path.join(__dirname, "./certificate/isl2-vsw-tesc1.pfx"),
        ),
        passphrase: "VSW-TESC1-2024 (TPEP)",
      },
      (request, response) => {
        requestProcessing("HTTPS", request, response);
      },
    )
    .listen(global.configuration.httpsPort, (err) => {
      if (!err)
        console.info(
          `${new Date().toLocaleString()}> HTTPS Server listen on port: ${global.configuration.httpsPort}`,
        );
      else console.error(`${new Date().toLocaleString()}> HTTPS.listen> `, err);
    });
} catch (ex) {
  console.error(`${new Date().toLocaleString()}> HTTPS> `, ex);
}

console.log(
  "Сервер запущен: " +
    new Date(global.configuration.startTime).toLocaleString() +
    " (" +
    global.configuration.startTime +
    ")",
);
