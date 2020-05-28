const { createPool } = require("mysql");

const connection = createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
  multipleStatements: true,
});

/*
connection.getConnection((err, tempCon) => {
  if (err) {
    tempCon.release();
    console.log("Error!");
  } else {
    console.log(
      "Successfully Connected!\nConnection Count : " + tempCon.threadId
    );
  }
});
*/

module.exports = connection;
