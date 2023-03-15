import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function ViewEvent() {
    let location = useLocation();
    let eventData = location.state;

    let handleSaveEvent = () => {
        // TODO
    };
    let handleTicketmasterRedirect = () => {
        // TODO
    };
    let handleMapRedirect = () => {
        // TODO
    };

    let [notificationMethod, setNotificationMethod] = useState<string>("email");
    let [contactInfo, setContactInfo] = useState<string>("");

    let handleMethodChange = (method: React.ChangeEvent<HTMLSelectElement>) => {
        setNotificationMethod(method.target.value);
    };

    let handleContactChange = (contact: React.ChangeEvent<HTMLInputElement>) => {
        setContactInfo(contact.target.value);
    };

    let handleSubmit = (form: React.FormEvent<HTMLFormElement>) => {
        form.preventDefault();
        console.log(`Notification method:`, notificationMethod);
        console.log(`Contact info: ${contactInfo}`);
        console.log(`Name: `, eventData.venue.name);
        console.log(`Date: `, eventData.datetime);
        console.log(`Lineup: `, JSON.stringify(eventData.lineup));
        console.log(`Location: `, eventData.venue.location);

        fetch('/twilio/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                notificationMethod,
                contactInfo,
                name: eventData.venue.name,
                date: eventData.datetime,
                lineup: eventData.lineup,
                location: eventData.venue.location,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <div style={{ padding: "20px" }}>
            <h1>Event Details</h1>
            <div style={{ border: "1px solid black", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2 style={{ marginTop: "20px" }}>{eventData.venue.name}</h2>
                <p><strong>Date: </strong>{eventData.datetime}</p>
                <p><strong>Lineup: </strong>{eventData.lineup.join(', ')}</p>
                <p><strong>Location: </strong>{eventData.venue.location}</p>
                <button style={{ marginTop: "20px" }} onClick={handleSaveEvent}>Save Event</button>
            </div>
            <form style={{ marginTop: "20px", border: "1px solid black", padding: "10px", display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSubmit}>
                <h2>Invite Your Friends</h2>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="notification-method" style={{ marginRight: "10px" }}>Share via:</label>
                    <select id="notification-method" name="notification-method" value={notificationMethod} onChange={handleMethodChange}>
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                    </select>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                    <label htmlFor="contact-info" style={{ marginRight: "10px" }}>Contact Info:</label>
                    <input type="text" id="contact-info" name="contact-info" value={contactInfo} onChange={handleContactChange} />
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    <button type="submit">Send</button>
                </div>
            </form>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <div style={{ border: "1px solid black", padding: "10px", marginRight: "10px" }}>
                    <h2>Ticketmaster Redirect</h2>
                    <button onClick={handleTicketmasterRedirect}>Ticketmaster</button>
                </div>
                <div style={{ border: "1px solid black", padding: "10px" }}>
                    <h2>Map Redirect</h2>
                    <button onClick={handleMapRedirect}>Map</button>
                </div>
            </div>
        </div>
    );

}

export default ViewEvent;
