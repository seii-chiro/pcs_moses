import React from 'react';
import MapViewer from './MapViewer';

const LocationSection = () => {
  const quezonCity = [14.676, 121.0437];

  return (
    <div className="w-full px-4 sm:px-8 py-10 flex flex-col items-center gap-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#635CBB] text-center">
        Precinct Location Map
      </h2>
      <MapViewer center={quezonCity} />
      <p className="text-sm sm:text-base text-center text-[#333] max-w-xl">
        Click the map marker to zoom into the precinct location. You can use this map to visualize polling
        stations, create new precincts, or verify the location of existing ones.
      </p>
    </div>
  );
};

export default LocationSection;
