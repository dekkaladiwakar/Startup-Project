import passportJwt from "passport-jwt";
import { PassportStatic } from "passport";
import { Pool } from "mysql";

import { secretOrKey } from "./keys";

// DB Connection
const conn: Pool = require("../config/connection");

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

module.exports = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secretOrKey,
      },
      (jwt_payload, done) => {
        conn.query(
          "SELECT institute_id FROM institutes WHERE institute_id = ?",
          jwt_payload.institute_id,
          (err, rows) => {
            if (err) {
              console.log("Passport Error : " + err);
            } else if (Object.keys(rows).length != 0) {
              // return value (jwt_payload) is stored in -> 'user' and can be accessed by -> req.user;
              // req.user -> user is the default return parameter name assigned by passport.
              return done(null, jwt_payload);
            } else {
              return done(null, false);
            }
          }
        );
      }
    )
  );
};
