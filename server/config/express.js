const express = require ('express');
const cookieParser = require ('cookie-parser');
const auth = require ('../middlewares/auth');
const cors = require('cors');

const corsConfig = {
  credentials: true,
  origin: true
};

function setupExpress(app) {
  app.use(cors(corsConfig))
    
  app.use(cookieParser());

  app.use(auth());
}

module.exports = setupExpress;
