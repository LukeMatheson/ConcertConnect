import express from "express";
import twilio from "twilio";
let twilioRoute = express.Router();
let accountSid = "//tested and working";
let authToken = "//tested and working";
let client = twilio(accountSid, authToken);
client.messages
    .create({
    body: 'Test Message',
    from: 'tested and working',
    to: '+tested and working'
})
    .then(message => console.log(message.sid));
// twilio.put('/sendText', async (req, res) => {
//     try {
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });
export default twilioRoute;
