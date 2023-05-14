import { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const ClubsMap = ({ clubs, selectedClub, setSelectedClub, mapState, setMapState }) => {
  const [placemarkCoordinates, setPlacemarkCoordinates] = useState(null);

  const placemarks = clubs && clubs.map((club) => (
    <Placemark key={club.id} geometry={[club.latitude, club.longitude]} onClick={() => { setSelectedClub(club) }} />
  ));

  if (placemarkCoordinates) {
    placemarks.push(
      <Placemark key="custom" geometry={placemarkCoordinates} />
    );
  }

  return (
    <div className='w-2/5'>
      <YMaps>
        <Map
          state={mapState}
        >
          {placemarks}
        </Map>
      </YMaps>
    </div>
  );
};

export default ClubsMap;
