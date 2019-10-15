const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session')

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfiguration = {
  name: 'cookiename', //default is "sid" for express- session library! 
  secret: 'secret', //for encrypting/decrypting the cookie! (use an ENV variable)
  cookie: {
    httpOnly: false, // JS can't access cookies. 
    maxAge: 60 * 60 * 1000, //experiation in milli sec.
    //NOTE in production use HTTPS
    // secure: process.env.NODE_ENV === production ? true : false , //should be true in production only 
    secure: false
  },
  //GDPR compliance: 
  resave: false,
  saveUninitialized: true, //read about GDPR compliance concerning cookies

};



//GLOBAL MIDDLEWARE
server.use(helmet());
server.use(express.json());
server.use(cors());
//SESSIONS
server.use(sessions(sessionConfiguration)); //turn on sessions support 

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;

//session is like a table for clients
//express-session
//needs global middleware (so in server.js)
