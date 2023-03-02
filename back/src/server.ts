import express, { Response } from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cookieParser from "cookie-parser";
import bandsInTownRouter from "../routes/bandsInTown";
import spotifyRouter from "../routes/Spotify";
import ticketMasterRouter from "../routes/ticketMaster";

let app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/bands", bandsInTownRouter);
app.use("/spotify", spotifyRouter);
app.use("/ticketmaster", ticketMasterRouter);
app.use(express.static("public"));

// run server
let port = 3000;
let host = "localhost";
let protocol = "http";
app.listen(port, host, () => {
  console.log(`${protocol}://${host}:${port}`);
});
