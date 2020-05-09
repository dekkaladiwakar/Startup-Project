const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const conn = require("../config/connection");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      conn.query(
        "SELECT institute_id FROM institutes WHERE institute_id = ?",
        jwt_payload.institute_id,
        (err, rows, fields) => {
          if (err) {
            console.log("Passport Error : " + err);
          } else if (Object.keys(rows).length != 0) {
            return done(null, jwt_payload);
          } else {
            return done(null, false);
          }
        }
      );
    })
  );
};
