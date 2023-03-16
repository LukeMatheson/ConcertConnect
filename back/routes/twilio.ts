import express from "express";
import fs from "fs";
//import env from "../../env.json" assert { type: "json" };
//import env from "../../env.json";
const env = JSON.parse(fs.readFileSync("../../env.json", "utf8"));
import twilio from "twilio";
import sendgrid from "@sendgrid/mail";

let twilioRoute = express.Router();

let accountSid = env.twilioAccountSID;
let authToken = env.twilioAuthToken;
let twilioSendgridKey = env.twilioSendgridKey;
sendgrid.setApiKey(twilioSendgridKey);

let client = twilio(accountSid, authToken);

twilioRoute.post("/sendMessage", async (req, res) => {
  try {
    let { notificationMethod, contactInfo, name, date, lineup, location } =
      req.body;
    console.log(req.body);
    let messageBody = `A friend has invited to this concert starring Lineup: ${lineup}. This event will be at ${name} on ${date} in ${location}`;
    let message;
    if (notificationMethod === "email") {
      const msg: sendgrid.MailDataRequired = {
        to: contactInfo,
        from: "nd596@drexel.edu",
        subject: `Invitation to ${lineup} concert`,
        text: messageBody,
        html: `<p>${messageBody}</p>`,
      };
      message = await sendgrid.send(msg);
    } else if (notificationMethod === "sms") {
      message = await client.messages.create({
        body: messageBody,
        from: env.twilioNumber,
        to: contactInfo,
      });
    }
    console.log(message);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default twilioRoute;
