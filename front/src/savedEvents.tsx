import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Event {
    artistName: string;
    venue: string;
    dateTime: string;
    lineup: string;
    location: string;
}

let SavedEvents: React.FC = () => {
    let [eventData, setEventData] = useState<Event[]>([]);
    let navigate = useNavigate();

    useEffect(() => {
        let fetchData = async () => {
            try {
                //Using my own spotify ID for not until I can grab spotify ID from cookie or however Luke makes it available
                let spotifyID = "12169996453"
                let response = await fetch(`/bands/savedEvents?spotifyID=${spotifyID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    let data: Event[] = await response.json();
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
                location: eventData[eventIndex].location
            },
            datetime: eventData[eventIndex].dateTime,
            lineup: eventData[eventIndex].lineup
        };

        navigate('/viewEvent', { state: restructuredEventData });
    };


    return (
        <div className="content">
            <h1>Saved Events</h1>
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