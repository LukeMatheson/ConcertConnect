import express from "express";
import env from "../../env.json" assert { type: "json" };

const ticketMasterRouter = express.Router();
const apiKey = env.ticketMaster;

// get an artist by keyword and city
ticketMasterRouter.get("/eventTickets", async (req, res) => {
  try {
    // const artistName = req.query.artistName;
    // const eventCity = req.query.eventCity;

    let artistName = "Drake";
    let eventCity = "Philadelphia";
    // let url = `http://app.ticketmaster.com/discovery/v2/events.json?keyword=${artistName}&city=${eventCity}&apikey=${apiKey}`;
    let url = `http://app.ticketmaster.com/discovery/v2/events.json?keyword=Drake&city=Philadelphia&apikey=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();

    // get data from ticketmaster
    let eventUrl = data._embedded.events[0].url;
    let artistUrl = data._embedded.venues._embedded.dmas[0].url;
    res.json({ data: data });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default ticketMasterRouter;
