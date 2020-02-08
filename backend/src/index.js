import http from "http";
import dotenv from "dotenv";
import url from "url";

import fetchWeatherData from "./fetchWeatherData.js";
dotenv.config();

const { SERVER_PORT } = process.env;
http
.createServer( (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  const { pathname } = url.parse(req.url, true);

  if (pathname === '/weather' && req.method === 'GET') {
    fetchWeatherData(req, res)
  } else {
    res.end(`That was an invalid route. try http://localhost:${SERVER_PORT}/weather`);
  }
})
.listen(SERVER_PORT, function(){
 console.log(`server started at port ${SERVER_PORT}`);
});