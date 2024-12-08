import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';

const API_KEY = process.env.API_KEY;

export default function Details() {
    const { placeId } = useParams<{ placeId: string }>();
    const [place, setPlace] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (placeId) {
            const fetchPlaceDetails = async () => {
                try {
                    const response = await fetch(
                        `http://localhost:4000/api/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`
                    );
                    const data = await response.json();
                    if (data.status === 'OK') {
                        setPlace(data.result);
                    } else {
                        setError(data.error_message || 'Error fetching place details');
                    }
                } catch (err) {
                    setError('An error occurred while fetching the place details');
                }
            };

            fetchPlaceDetails();
        }
    }, [placeId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!place) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="row mb-4 mt-4 header-container">
                <Header />
            </div>
            <h1>{place.name}</h1>
            <p><strong>Address:</strong> {place.formatted_address}</p>
            <p><strong>Rating:</strong> {place.rating}</p>
            {place.formatted_phone_number && <p><strong>Phone:</strong> {place.formatted_phone_number}</p>}
            {place.website && (
                <p>
                    <strong>Website:</strong>{' '}
                    <a href={place.website} target="_blank" rel="noopener noreferrer">
                        {place.website}
                    </a>
                </p>
            )}
            {place.opening_hours && (
                <div>
                    <strong>Opening Hours:</strong>
                    <ul>
                        {place.opening_hours.weekday_text.map((hour: string, idx: number) => (
                            <li key={idx}>{hour}</li>
                        ))}
                    </ul>
                </div>
            )}
            {place.photos && place.photos.length > 0 && (
                <div>
                    <img
                        //src={`http://localhost:4000/api/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`}
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`}
                        alt={place.name}
                    />
                </div>
            )}
        </div>
    );
}
