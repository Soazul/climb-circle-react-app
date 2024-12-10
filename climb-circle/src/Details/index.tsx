import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header';
import * as client from "./client";
import * as loginClient from "../Login/client";

import { BsPlus, BsDash } from "react-icons/bs";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Details() {
    const { placeId } = useParams<{ placeId: string }>();
    const [place, setPlace] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [gymProfile, setProfile] = useState<any>(null);
    const [currentUser, setCurrentUser] = useState<any | null>(null);
    const [favorited, setFavorited] = useState(false);
    const [registered, setRegistered] = useState(false);

    const fetchGymProfile = async () => {
        try {
            const data = await client.findGymByPlaceId(placeId);
            setProfile(data);
        } catch (err) {
            console.error("Error fetching gym profile:", err);
        }
    };

    const fetchCurrentUser = async () => {
        const user = await loginClient.fetchCurrentUser();
        setCurrentUser(user);
    };

    useEffect(() => {
        fetchCurrentUser();
        fetchGymProfile();
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

    useEffect(() => {
        if (gymProfile && currentUser) {
            setFavorited(currentUser.favoriteGyms.includes(gymProfile._id));
        }
    }, [gymProfile, currentUser]);

    useEffect(() => {
        if (currentUser && currentUser.role === "Gym Owner") {
            setRegistered(currentUser.placeId === placeId);
        }
    }, [currentUser, placeId]);

    if (error) {
        return <div className="container mt-4">Error: {error}</div>;
    }

    if (!place) {
        return <div className="container mt-4">Loading...</div>;
    }

    const handleFavoriteClick = async () => {
        try {
            if (favorited) {
                await client.unfavoriteGym(gymProfile._id);
            } else {
                await client.favoriteGym(gymProfile._id);
            }
            setFavorited(!favorited);
        } catch (error) {
            console.error("Error favoriting/unfavoriting post:", error);
        }
    };

    const handleRegisterClick = async () => {
        try {
            if (registered) {
                await client.unregisterGym(placeId);
            } else {
                await client.registerGym(placeId);
            }
            setRegistered(!registered);
        } catch (error) {
            console.error("Error registering/unregistering location:", error);
        }
    };

    return (
        <div className="mt-4 ms-2">
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
                        <div className="mb-3">
                            <h1 className="mb-2">{place.name}</h1>
                            {currentUser && (
                                currentUser.role === "Gym Owner" ? (
                                    <button
                                        onClick={handleRegisterClick}
                                        className={`btn btn-outline-primary d-flex align-items-center`}
                                        style={{ gap: "0.5rem" }}
                                    >
                                        {registered ? <BsDash /> : <BsPlus />}
                                        {registered ? "Unregister Location" : "Register Location"}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleFavoriteClick}
                                        className="btn btn-outline-primary d-flex align-items-center"
                                        style={{ gap: "0.5rem" }}
                                    >
                                        {favorited ? <BsDash /> : <BsPlus />}
                                        {favorited ? "Remove from favorites" : "Add to favorites"}
                                    </button>
                                )
                            )}
                        </div>

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
