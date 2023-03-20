import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

let spotifyID = sessionStorage.getItem('spotifyID');

interface Event {
    artistName: string;
    venue: string;
    dateTime: string;
    lineup: string;
    location: string;
    latitude: number;
    longitude: number;
}

let SavedEvents: React.FC = () => {
    let [eventData, setEventData] = useState<Event[]>([]);
    let [removeMessage, setRemoveMessage] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        let fetchData = async () => {
            try {
                let response = await fetch(`/bands/savedEvents?spotifyID=${spotifyID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    let data: Event[] = await response.json();
                    console.log(data);
                    setEventData(data);
                } else {
                    console.error('Error fetching saved events');
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    let handleViewEvent = (eventIndex: number) => {
        console.log('Artist Name:', eventData[eventIndex].artistName);
        console.log('Venue: ', eventData[eventIndex].venue);
        console.log('Date: ', eventData[eventIndex].dateTime);
        console.log('Lineup: ', eventData[eventIndex].lineup);
        let restructuredEventData = {
            artistName: eventData[eventIndex].artistName,
            venue: {
                name: eventData[eventIndex].venue,
                location: eventData[eventIndex].location,
                latitude: eventData[eventIndex].latitude,
                longitude: eventData[eventIndex].longitude
            },
            datetime: eventData[eventIndex].dateTime,
            lineup: eventData[eventIndex].lineup
        };

        navigate('/viewEvent', { state: restructuredEventData });
    };

    let handleRemoveEvent = async (eventIndex: number) => {
        try {
            let response = await fetch('/bands/removeEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spotifyID: spotifyID,
                    artistName: eventData[eventIndex].artistName,
                    dateTime: eventData[eventIndex].dateTime,
                }),
            });

            let data = await response.json();
            console.log(data);

            if (response.status === 200) {
                setRemoveMessage(true);
                let updatedEvents = eventData.filter((_, index) => index !== eventIndex);
                setEventData(updatedEvents);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="content">
            <h1>Saved Events</h1>
            {removeMessage && (
                <p style={{ marginTop: "10px" }}>Removed Successfully!</p>
            )}
            {eventData && eventData.length > 0 ? (
                <>
                    {eventData.map((event, index) => (
                        <div
                            key={index}
                            style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}
                        >
                            <p>
                                <strong>Venue: </strong>
                                {event.venue}
                            </p>
                            <p>
                                <strong>Date: </strong>
                                {event.dateTime}
                            </p>
                            <p>
                                <strong>Lineup: </strong>
                                {event.lineup}
                            </p>
                            <p>
                                <strong>Location: </strong>
                                {event.location}
                            </p>
                            <button onClick={() => handleViewEvent(index)}>View Event</button>
                            <button onClick={() => handleRemoveEvent(index)}>Remove Event</button>
                        </div>
                    ))}
                </>
            ) : (
                <p>No saved events found.</p>
            )}
        </div>
    );
};

export default SavedEvents;