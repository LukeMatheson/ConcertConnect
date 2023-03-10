import express from "express";

const ticketMasterRouter = express.Router();

const apiKey = "LqGK8iQhoBRTXxv9mLcQjTBXQ3q9ETer";

// get an artist by keyword and city
ticketMasterRouter.get("/eventTickets", async (req, res) => {
  try {
    // const artistName = req.query.artistName;
    // const eventCity = req.query.eventCity;

    let artistName = "Drake";
    let eventCity = "Raleigh";
    let url = `http://app.ticketmaster.com/discovery/v1/events.json?keyword=${artistName}&city=${eventCity}&apikey=${apiKey}`;

    let response = await fetch(url);
    let data = await response.json();

    // get data from ticketmaster

    res.json();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default ticketMasterRouter;
