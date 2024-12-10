import { GoogleMap, LoadScript, Marker, InfoWindowF } from '@react-google-maps/api';
import Header from '../Header';
import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as client from './client';
import { useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
const API_KEY = process.env.REACT_APP_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 42.3601, // Latitude for Boston
  lng: -71.0589, // Longitude for Boston
};

interface PlaceDetails {
  place_id: string;
  name: string;
  address: string;
  location: { lat: number, lng: number };
  rating: string;
  phone_number?: string;
  opening_hours?: string[];
  photoUrl?: string;
  website?: string;
}

export default function Map() {
  const [search, setSearch] = useState<string>('');
  const [places, setPlaces] = useState<PlaceDetails[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && search) {
      fetchPlaces(search);
      navigate(`/Map?criteria=${search}`);
    }
  };

  const fetchPlaces = async (query: string) => {
    try {
      const data = await client.fetchPlaces('/api/place/textsearch/json', { query, key: API_KEY });
      if (data.status === 'OK') {
        const placesPromises = data.results.map(async (place: any) => {
          try {
            const placeDetails = await client.fetchPlaces('/api/place/details/json', { place_id: place.place_id, key: API_KEY });
            if (placeDetails.status === 'OK') {
              const placeData = placeDetails.result;
              const photoReference = placeData.photos && placeData.photos.length > 0 ? placeData.photos[0].photo_reference : null;
              const photoUrl = photoReference
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`
                : null;

              return {
                place_id: placeData.place_id,
                name: placeData.name,
                address: placeData.formatted_address,
                location: placeData.geometry.location,
                rating: placeData.rating,
                phone_number: placeData.formatted_phone_number || 'N/A',
                opening_hours: placeData.opening_hours ? placeData.opening_hours.weekday_text : null,
                photoUrl,
                website: placeData.website || 'N/A',
              };
            } else {
              console.error('Error fetching place details:', placeDetails.error_message);
              return null;
            }
          } catch (error) {
            console.error('Error fetching place details:', error);
            return null;
          }
        });

        const placesData = await Promise.all(placesPromises);
        setPlaces(placesData.filter((place) => place !== null) as PlaceDetails[]);
      } else {
        console.error('Error fetching places:', data.error_message);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const panTo = (location: { lat: number; lng: number }) => {
    if (map) {
      map.panTo(location);
      map.setZoom(15);
    }
  };

  const handleMarkerClick = (placeId: string) => {
    setActiveMarker(placeId);
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <div className="row mb-4 mt-4 header-container">
        <Header />
        {currentUser && (
        <div className="col-12 col-md-6 text-end d-flex justify-content-end align-items-center">
          
          <Link to={`/Profile/${currentUser.username}`} className="d-flex align-items-center">
            <FaUserCircle size="30px" />
          </Link>

        </div>)}
      </div>

      <div className="row flex-grow-1 d-flex h-100">
        <div className="col-4 d-flex flex-column align-items-start bg-light p-3" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyPress}
            className="form-control mb-3"
            placeholder="Search location..."
          />

          {places.length > 0 ? (
            places.map((place, index) => (
              <div
                key={index}
                className="search-result"
                onClick={() => panTo(place.location)}
                style={{ cursor: 'pointer' }}
              >
                {place.photoUrl && <img src={place.photoUrl} alt={place.name} className="img-fluid mb-2" style={{ maxWidth: '100%' }} />}
                <h5>{place.name}</h5>
                <p><strong>Address:</strong> {place.address}</p>
                <p><strong>Rating:</strong> {place.rating}</p>
                <p><strong>Phone:</strong> {place.phone_number}</p>
                {place.opening_hours ? (
                  <div>
                    <strong>Opening Hours:</strong>
                    <ul>
                      {place.opening_hours.map((hour, idx) => (
                        <li key={idx}>{hour}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p><strong>Opening Hours:</strong> N/A</p>
                )}
                <p>
                  <strong>Website:</strong>{' '}
                  {place.website !== 'N/A' ? (
                    <a href={place.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  ) : (
                    'N/A'
                  )}
                </p>
                <Link to={`/Map/Details/${place.place_id}`} className="btn btn-primary mt-2">
                  View Details
                </Link>
                <hr />
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>

        <div className="col-8 d-flex flex-grow-1 p-0" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
          <LoadScript googleMapsApiKey={API_KEY!} libraries={['places']}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
              onLoad={onLoad}
            >
              {places.map((place) => (
                <div key={place.place_id}>
                  <Marker
                    position={place.location}
                    onClick={() => handleMarkerClick(place.place_id)}
                  />
                  {activeMarker === place.place_id && (
                    <InfoWindowF
                      position={place.location}
                      onCloseClick={handleInfoWindowClose}
                    >
                      <h6>{place.name}</h6>
                    </InfoWindowF>
                  )}
                </div>
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}
