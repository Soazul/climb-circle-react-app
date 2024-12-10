import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header';
import * as client from "./client";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Details() {
    const { placeId } = useParams<{ placeId: string }>();
    const [place, setPlace] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [gymProfile, setProfile] = useState<any>(null);

    const fetchGymProfile = async () => {
        try {
            const data = await client.findGymByPlaceId(placeId);
            setProfile(data);
        } catch (err) {
            console.error("Error fetching gym profile:", err);
        }
    };

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
        fetchGymProfile();
    }, [placeId]);

    if (error) {
        return <div className="container mt-4">Error: {error}</div>;
    }

    if (!place) {
        return <div className="container mt-4">Loading...</div>;
    }

    return (
        <div className="mt-4 ms-2" >
            <div className="row mb-4 mt-4 header-container">
                <Header />
            </div>
            <div className="container">
                <div className="row g-4">
                    {place.photos && place.photos.length > 0 && (
                        <div className="col-md-6">
                            <img
                                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`}
                                alt={place.name}
                                className="img-fluid rounded shadow-sm"
                            />
                        </div>
                    )}
                    <div className="col-md-6">
                        <h1 className="mb-3">{place.name}</h1>
                        {gymProfile && (
                            <div className="mb-3">
                                <strong>View Climb Circle Profile:</strong>{' '}
                                <Link to={`/Profile/User/${gymProfile._id}`} className="text-decoration-none">
                                    {gymProfile.username}
                                </Link>
                            </div>
                        )}
                        <p><strong>Address:</strong> {place.formatted_address}</p>
                        <p><strong>Rating:</strong> {place.rating}</p>
                        {place.formatted_phone_number && <p><strong>Phone:</strong> {place.formatted_phone_number}</p>}
                        {place.website && (
                            <p>
                                <strong>Website:</strong>{' '}
                                <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                    {place.website}
                                </a>
                            </p>
                        )}
                        {place.opening_hours && (
                            <div>
                                <strong>Opening Hours:</strong>
                                <ul className="list-unstyled">
                                    {place.opening_hours.weekday_text.map((hour: string, idx: number) => (
                                        <li key={idx}>{hour}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
