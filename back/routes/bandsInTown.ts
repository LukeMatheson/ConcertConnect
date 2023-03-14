import express from "express";
import env from "../../env.json" assert { type: "json" };

let apiKey = env.bandsInTownKey;

let bandsInTownRouter = express.Router();

bandsInTownRouter.get('/artistEvents', async (req, res) => {
    try {
        // const artistName = req.query.artist;
        let artistName = "Drake";

        let url = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();
        let venues = data.map((event: { venue: any }) => event.venue);
        let datetime = data.map((event: { datetime: any }) => event.datetime);

        console.log("date and time: ", datetime)
        console.log("venue: ", venues);
        res.json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

bandsInTownRouter.get('/artistInfo', async (req, res) => {
    try {
        let artistName = "Drake";

        let url = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${apiKey}&date=2022-01-01,2022-12-31`;
        let response = await fetch(url);
        let data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


export default bandsInTownRouter;
