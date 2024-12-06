import React, { useEffect, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import axios from 'axios';
import Layout from '../components/Layout';

const MapPage = () => {
  const OPEN_CAGE_API_KEY = process.env.REACT_APP_OPEN_CAGE_API_KEY;  // OpenCage API Key
  const TOMTOM_API_KEY = process.env.REACT_APP_TOMTOM_API_KEY;  // OpenCage API Key
  

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    let map;  // Ensure this is declared here to be accessible across the entire function

    // Geocoding function using OpenCage API
    const geocodeAddress = async (address) => {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPEN_CAGE_API_KEY}`
        );
        if (response.data && response.data.results && response.data.results.length > 0) {
          const geocode = response.data.results[0].geometry;
          console.log(`Geocode for "${address}":`, geocode);  // Prints the geo coordinates (lat, lng)
          return geocode;  // returns geo coordinates (lat, lng)
        } else {
          console.warn(`No geocode found for "${address}".`);
          return null;
        }
      } catch (err) {
        console.error(`Error fetching geocode for "${address}":`, err);
        return null;
      }
    };

    const initializeMap = async () => {
      try {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) {
          setError('Map container not found.');
          setLoading(false);
          return;
        }

        // Fetch profiles and geocode addresses
        const response = await axios.get(`${process.env.REACT_APP_BASE_LINK}/api/profiles`);
        const profiles = response.data;
        console.log('Fetched profiles:', profiles);  // Logs profiles data
        setProfiles(profiles);  // Storing profiles in state

        let totalLat = 0;
        let totalLng = 0;
        let validProfileCount = 0;

        // Initialize the map first
        map = tt.map({
          key: TOMTOM_API_KEY, // Your TomTom API Key for Map
          container: 'map',
          center: [77.1025, 28.7041], // Default to New Delhi [lng, lat]
          zoom: 5, // Zoom level for city view
        });

        // Wait for the map to be fully loaded
        map.on('load', async () => {
          const geocodePromises = profiles.map(async (profile) => {
            if (profile.address) {
              const geocode = await geocodeAddress(profile.address);
              if (geocode) {
                console.log('Geocode for profile', profile.name, 'is:', geocode);

                // Update total lat and lng for average calculation
                totalLat += geocode.lat;
                totalLng += geocode.lng;
                validProfileCount++;

                // Add a marker for each profile on the map with the geocoded coordinates
                const marker = new tt.Marker()
                  .setLngLat([geocode.lng, geocode.lat]) // Use the geocoded lat and lng
                  .addTo(map);  // Ensure the marker is added after the map is initialized

                // Optionally, add a popup with profile name (can be expanded for more details)
                const popup = new tt.Popup({ offset: 25 }).setText(profile.name);
                marker.setPopup(popup);
              }
            } else {
              console.warn(`Profile "${profile.name}" has no address.`);
            }
          });

          // Wait for all geocode requests to complete
          await Promise.all(geocodePromises);

          // Calculate average latitude and longitude for the center of the map
          if (validProfileCount > 0) {
            const avgLat = totalLat / validProfileCount;
            const avgLng = totalLng / validProfileCount;

            // Set the map center to the average lat/lng of the profiles
            map.setCenter([avgLng, avgLat]);
            console.log(`Map center updated to: [${avgLng}, ${avgLat}]`);

            setLoading(false); // Finished loading the map
          } else {
            setError('No valid profiles with addresses found.');
            setLoading(false);
          }
        });

      } catch (err) {
        console.error('Error initializing map or fetching profiles:', err);
        setError('An error occurred while initializing the map.');
        setLoading(false);
      }
    };

    // Initialize map and fetch profiles
    initializeMap();

    return () => {
      if (map) {
        map.remove(); // Clean up map on unmount
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <Layout>
      {loading && <p>Loading profiles and geocodes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div
        id="map"
        style={{
          height: '80vh',
          width: '90%',
        }}
      />
    </Layout>
  );
};

export default MapPage;
