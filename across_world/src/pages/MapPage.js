import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { mockProfiles } from '../data/profileData';
import Layout from '../components/Layout';
import axios from 'axios';

const MapPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profiles,setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfilesAndGeocode = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/profiles');
        const profilesData = response.data;
        setProfiles(profilesData);
  
        const results = await Promise.all(
          profilesData.map(async (profile) => {
            if (!profile.address) return null; // Skip if address is empty
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(profile.address)}&format=json`
              );
              const data = await response.json();
              if (data.length > 0) {
                return {
                  id: profile._id,
                  name: profile.name,
                  address: profile.address,
                  coordinates: [parseFloat(data[0].lat), parseFloat(data[0].lon)],
                };
              } else {
                console.warn(`No geocoding results for: ${profile.address}`);
                return null;
              }
            } catch (error) {
              console.error(`Error geocoding ${profile.address}`, error);
              return null;
            }
          })
        );
  
        const validLocations = results.filter((location) => location !== null);
        setLocations(validLocations);
      } catch (error) {
        console.error('Error fetching Profiles: ', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfilesAndGeocode();
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
