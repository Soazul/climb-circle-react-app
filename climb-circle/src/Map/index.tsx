import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from '../Header';
import { useState } from 'react';

const API_KEY = 'AIzaSyCfqkGTA5KQ2NCYiaSHI3b2Kj9aBM5xSDs';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 42.3601, // Latitude for Boston
  lng: -71.0589, // Longitude for Boston
};

interface PlaceDetails {
  name: string;
  address: string;
  location: { lat: number, lng: number };
  rating: string;
  phone_number?: string; // Optional phone number field
  opening_hours?: string; // Optional opening hours field
}

export default function Map() {
  const [search, setSearch] = useState<string>('');
  const [places, setPlaces] = useState<PlaceDetails[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && search) {
      fetchPlaces(search);
    }
  };

  const fetchPlaces = (query: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;
  
    console.log(url); // Log the URL to make sure it's correct
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          // Map over the results array and fetch place details for each place
          const placesPromises = data.results.map((place: any) => {
            const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${API_KEY}`;
            console.log(placeDetailsUrl)
            console.log("HELLO")
            return fetch(placeDetailsUrl)
              .then(response => response.json())
              .then(placeDetails => {
                if (placeDetails.status === 'OK') {
                  const placeData = placeDetails.result;
                  return {
                    name: placeData.name,
                    address: placeData.formatted_address,
                    location: placeData.geometry.location,
                    rating: placeData.rating,
                    phone_number: placeData.formatted_phone_number || 'N/A',
                    opening_hours: placeData.opening_hours ? placeData.opening_hours.weekday_text.join(', ') : 'N/A',
                  };
                } else {
                  console.error('Error fetching place details:', placeDetails.error_message);
                  return null;
                }
              })
              .catch(error => {
                console.error('Error fetching place details:', error);
                return null;
              });
          });
  
          // Wait for all promises to resolve and set the places state
          Promise.all(placesPromises)
            .then(placesData => {
              // Filter out null values in case any requests failed
              setPlaces(placesData.filter((place) => place !== null));
            });
        } else {
          console.error('Error fetching places:', data.error_message);
        }
      })
      .catch(error => console.error('Error fetching places:', error));
  };

  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      <div className="row mb-4 mt-4 header-container">
        <Header />
      </div>

      <div className="row h-100">
        {/* Left section: Search bar and Results */}
        <div className="col-4 d-flex flex-column align-items-start bg-light p-3">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyPress}
            className="form-control mb-3"
            placeholder="Search location..."
          />

            
          {/* Display search results */}
          {places.length > 0 ? (
            places.map((place, index) => (
              <div key={index} className="search-result">
                <h5>{place.name}</h5>
                <p><strong>Address:</strong> {place.address}</p>
                <p><strong>Location:</strong> {place.location.lat}, {place.location.lng}</p>
                <p><strong>Rating:</strong> {place.rating}</p>
                <p><strong>Phone:</strong> {place.phone_number}</p>
                <p><strong>Opening Hours:</strong> {place.opening_hours}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>

        <div className="col-8 p-0">
          {/* <LoadScript googleMapsApiKey={API_KEY} libraries={['places']}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
            >
              {places.map((place) => (
                <Marker position={place.location} key={place.name} />
              ))}
            </GoogleMap>
          </LoadScript> */}
        </div>
      </div>
    </div>
  );
}
