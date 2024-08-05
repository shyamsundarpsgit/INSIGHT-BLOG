const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
});

module.exports = sessionMiddleware;