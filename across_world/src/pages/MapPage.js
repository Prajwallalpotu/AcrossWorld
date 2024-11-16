import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { mockProfiles } from '../data/profileData';
import Layout from '../components/Layout';

const MapPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const geocodeAddresses = async () => {
      const results = await Promise.all(
        mockProfiles.map(async (profile) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(profile.address)}&format=json`
            );
            const data = await response.json();
            if (data.length > 0) {
              return {
                id: profile.id,
                name: profile.name,
                address: profile.address,
                coordinates: [parseFloat(data[0].lat), parseFloat(data[0].lon)], // Geocoded location
              };
            } else {
              console.warn(`No geocoding results for: ${profile.address}`);
              return null; // No valid geocoding results
            }
          } catch (error) {
            console.error(`Error geocoding ${profile.address}`, error);
            return null;
          }
        })
      );

      const validLocations = results.filter((location) => location !== null);
      setLocations(validLocations);
      setLoading(false);
    };

    geocodeAddresses();
  }, []);

  return (
    <Layout>
        <center>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Loading map and locations...</p>
        </div>
      ) : (
        <MapContainer
          center={[20.5937, 78.9629]} // Default center coordinates (India)
          zoom={5}
          style={{ height: '80vh', width: '80%', marginTop: 30}}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location) => (
            <CircleMarker
              key={location.id}
              center={location.coordinates}
              radius={10}
              color="blue"
              fillColor="rgba(0, 123, 255, 0.5)"
              fillOpacity={0.7}
            >
              <Popup>
                <strong>{location.name}</strong>
                <br />
                {location.address}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      )}
      </center>
    </Layout>
  );
};

export default MapPage;
