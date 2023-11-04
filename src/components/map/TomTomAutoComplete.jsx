import React, { useState, useEffect, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "./TomTomAutoComplete.css";

const TomTomAutoComplete = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [userLocation, setUserLocation] = useState(null); // User's location
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [map, setMap] = useState({});
  const [marker, setMarker] = useState(null);

  const apiKey = "JwHnAZhAnIimgNZBeSVdqbeElmbtyAh5"; // Replace with your TomTom API key

  const mapElement = useRef();

  // Function to get the user's location using the Geolocation API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
      });
    }
  };

  // Fetch suggestions based on user location
  useEffect(() => {
    if (userLocation && query.length > 2) {
      fetch(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(
          query
        )}.json?key=${apiKey}&lat=${userLocation.lat}&lon=${userLocation.lon}`
      )
        .then(response => response.json())
        .then(data => {
          if (data.results) {
            setSuggestions(data.results);
          }
        })
        .catch(error => {
          console.error("Error fetching suggestions: ", error);
        });
    } else {
      setSuggestions([]);
    }
  }, [userLocation, query]);

  const handleInputChange = event => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setSelectedSuggestion(null); // Reset the selected suggestion
  };

  const handleSuggestionSelect = suggestion => {
    setQuery(suggestion.address.freeformAddress);
    setSuggestions([]); // Clear the suggestions list
    setSelectedSuggestion(suggestion);
  };

  // Get the user's location when the component mounts
  useEffect(() => {
    getUserLocation();
  }, [selectedSuggestion]);

  // Default Value
  useEffect(() => {
    let map = tt.map({
      key: apiKey,
      container: mapElement.current,
      center: ["-123.138572", "49.263566"],
      zoom: 12
    });
    const newMarker = new tt.Marker()
      .setLngLat(["-123.138572", "49.263566"])
      .addTo(map);

    setMap(map);
    setMarker(newMarker);

    return () => {
      map.remove();
      newMarker.remove();
    };
  }, []);

  useEffect(() => {
    // console.log("selectedSuggestion", selectedSuggestion.position)
    if (selectedSuggestion) {
      let map = tt.map({
        key: apiKey,
        container: mapElement.current,
        center: [
          selectedSuggestion.position.lon,
          selectedSuggestion.position.lat
        ],
        zoom: 12
      });

      const newMarker = new tt.Marker()
        .setLngLat([
          selectedSuggestion.position.lon,
          selectedSuggestion.position.lat
        ])
        .addTo(map);

      setMap(map);
      setMarker(newMarker);

      return () => {
        map.remove();
        newMarker.remove();
      };
    }
  }, [selectedSuggestion]);

  console.log(
    "selectedSuggestion",
    selectedSuggestion == null
      ? {
          lat: -123.138572,
          lon: 49.263566
        }
      : selectedSuggestion.position
  );

  return (
    <div>
      <form>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          placeholder="Enter an address"
          value={query}
          onChange={handleInputChange}
          id="address"
        />
      </form>
      <ul>
        {suggestions.map(suggestion => (
          <li
            key={suggestion.id}
            onClick={() => handleSuggestionSelect(suggestion)}
          >
            {suggestion.address.freeformAddress}
          </li>
        ))}
      </ul>
      {selectedSuggestion && (
        <p>Selected: {selectedSuggestion.address.freeformAddress}</p>
      )}

      <div ref={mapElement} className="mapDiv"></div>
    </div>
  );
};

export default TomTomAutoComplete;
