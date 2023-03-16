import express from "express";
import fs from "fs";
//import env from "../../env.json" assert { type: "json" };
//import env from "../../env.json";
const env = JSON.parse(fs.readFileSync('../../env.json', 'utf8'));

let apiKey = env.bandsInTownKey;

let bandsInTownRouter = express.Router();

// bandsInTownRouter.get('/artistEvents', async (req, res) => {
//     try {
//         let artistName = req.query.artist;
//         if (!artistName) {
//             res.status(400).json({ message: 'Error, artist name missing' });
//             return;
//         }

//         let url = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${apiKey}`;
//         let response = await fetch(url);
//         let data = await response.json();

//         let artistImage = data[0].artist.image_url;
//         let eventName = data[0].venue.name;
//         let dateTime = data[0].datetime;
//         let lineup = data[0].lineup.join(', ')
//         let eventLocation = data[0].venue.location;

//         console.log(data.slice(0, 2));

//         res.json({ eventName, dateTime, lineup, eventLocation, artistImage });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

bandsInTownRouter.get('/artistEvents', async (req, res) => {
    try {
        let artistName = req.query.artist;
        // let artistName = "Drake";

        if (!artistName) {
            res.status(400).json({ message: 'Error, artist name missing' });
            return;
        }

        let url = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();

        console.log(data);

        res.json(data);
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
