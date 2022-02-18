"use strict";

const { Connection, Request } = require("tedious");
const config = require("./config.js");

exports.callProcedure = (proc, params) => new Promise((resolve, reject) => {
  const connection = new Connection(config.getDBConfig());

  connection.on("connect", err => {
    if (err) {
      reject(err.message);
    } else {
      const startTime = new Date().getTime();
      const request = new Request(
        proc,
        (err, rowCount) => {
          if (err) {
            reject(err.message);
          } else {
            // console.log(`${rowCount} row(s) returned in ${(new Date().getTime() - startTime) / 1000}s`);
          }
        }
      );

      params.forEach(param => request.addParameter(param["name"], param["type"], param["value"]));

      var result = [];
      request.on("row", columns => {
        result.push(columns.map(x => x["value"]))
      })

      request.on("doneProc", () => {
        resolve(result);
      });

      connection.callProcedure(request);
    }
  });

  connection.connect();
});
