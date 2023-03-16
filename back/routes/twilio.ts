import express from "express";
import env from "../../env.json" assert { type: "json" };
import twilio from "twilio";

let twilioRoute = express.Router();

let accountSid = env.twilioAccountSID;
let authToken = env.twilioAuthToken;

let client = twilio(accountSid, authToken);

twilioRoute.post('/sendMessage', async (req, res) => {
    try {
        let { notificationMethod, contactInfo, name, date, lineup, location } = req.body;
        console.log(req.body);
        let messageBody = `A friend has invited to this concert starring Lineup: ${lineup}. This event will be at ${name} on ${date} in ${location}`;
        let message;
        if (notificationMethod === "email") {
            // TODO: send email
            message = "Email sent!";
        } else if (notificationMethod === "sms") {
            message = await client.messages.create({
                body: messageBody,
                from: env.twilioNumber,
                to: contactInfo
            });
        }
        console.log(message);
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


export default twilioRoute;
