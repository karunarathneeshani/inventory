const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');


module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    User.findOne({id: jwt_payload.sub}, function(err, user) { 
      if(err){
        return done(err, false);
      }

      if(jwt_payload){                             // there should be replace "jwt_payload" from "user" 
        return done(null, jwt_payload);            // then error will occur 
      } else {
        return done(null, false);
      }
    });
  }));
}
