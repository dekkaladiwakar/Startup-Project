const con = require("../../../config/connection");

module.exports = {
  create: (data, callBack) => {
    con.query(`call insert_management_details()`);
  },
};
