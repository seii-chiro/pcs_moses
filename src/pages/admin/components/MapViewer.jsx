import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ZoomToLocation = ({ latlng, locationName }) => {
  const map = useMap();

  const handleZoom = () => {
    map.setView(latlng, 16, { animate: true });
  };

  return (
    <Marker position={latlng} icon={customIcon} eventHandlers={{ click: handleZoom }}>
      <Popup>{locationName || 'Precinct Location (Quezon City)'}</Popup>
    </Marker>
  );
};

const MapViewer = ({ center }) => {
  const [location, setLocation] = useState(center);
  const [locationName, setLocationName] = useState('Precinct Location (Quezon City)');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    setSearchTerm(query);
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleSelectLocation = (place) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    setLocation({ lat, lng: lon });
    setLocationName(place.display_name);
    setShowModal(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="relative">
      {/* Button */}
      <div className="mb-4 flex justify-end z-10 relative">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#635CBB] text-white rounded hover:bg-[#5247a5] transition"
        >
          Add Location
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] sm:w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Search for a Location</h2>
            <input
              type="text"
              placeholder="Search place name..."
              className="w-full mb-2 p-2 border rounded"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <ul className="max-h-48 overflow-y-auto border rounded mb-4">
                {searchResults.map((result) => (
                  <li
                    key={result.place_id}
                    onClick={() => handleSelectLocation(result)}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {result.display_name}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      <div className="w-full md:w-[800px] md:h-[500px] rounded-lg overflow-hidden shadow-lg border border-[#635CBB]">
        <MapContainer center={location} zoom={12} scrollWheelZoom={false} className="h-full w-full z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomToLocation latlng={location} locationName={locationName} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapViewer;
