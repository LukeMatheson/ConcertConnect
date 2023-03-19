import express, { Response } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import bandsInTownRouter from "./routes/bandsInTown.js";
import spotifyRouter from "./routes/Spotify.js";
import ticketMasterRouter from "./routes/ticketMaster.js";
import twilio from "./routes/twilio.js";
import path from "path";

let app = express();
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  //allow GET, POST, PUT, DELETE, OPTIONS
  res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use(
  cors({
      origin: ["http://localhost:6000", "http://localhost:6001"],
      credentials: true,
  })
);

app.use("/bands", bandsInTownRouter);
app.use("/spotify", spotifyRouter);
app.use("/ticketmaster", ticketMasterRouter);
app.use("/twilio", twilio);
app.use(express.static(path.join("..", "front", "public")));

// run server
let port = 6000;
let host = "localhost";
let protocol = "http";
app.listen(port, host, () => {
  console.log(`${protocol}://${host}:${port}`);
});
