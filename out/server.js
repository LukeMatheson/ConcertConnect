import express from "express";
import cookieParser from "cookie-parser";
import bandsInTownRouter from "./routes/bandsInTown.js";
import spotifyRouter from "./routes/Spotify.js";
import ticketMasterRouter from "./routes/ticketMaster.js";
import twilio from "./routes/twilio.js";
let app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/bands", bandsInTownRouter);
app.use("/spotify", spotifyRouter);
app.use("/ticketmaster", ticketMasterRouter);
app.use("/twilio", twilio);
app.use(express.static("public"));
console.log("o");
// run server
let port = 3000;
let host = "localhost";
let protocol = "http";
app.listen(port, host, () => {
    console.log(`${protocol}://${host}:${port}`);
});
