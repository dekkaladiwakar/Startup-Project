const { createPool } = require("mysql");

const connection = createPool({
  connectionLimit: process.env.CON_LIMIT,
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  port: process.env.DB_PORT,
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
