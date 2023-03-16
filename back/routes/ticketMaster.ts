import express from "express";
import env from "../../env.json" assert { type: "json" };

const ticketMasterRouter = express.Router();
const apiKey = env.ticketMaster;

// get an artist by keyword and city
ticketMasterRouter.get("/eventTickets", async (req, res) => {
  try {
    const artistName = req.query.artist;
    const eventCity = req.query.city;

    let url = `http://app.ticketmaster.com/discovery/v2/events.json?keyword=${artistName}&city=${eventCity}&apikey=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();

    // get event link from ticketmaster
    let eventUrl = data._embedded.events[0].url;

    res.json({ link: eventUrl });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default ticketMasterRouter;
