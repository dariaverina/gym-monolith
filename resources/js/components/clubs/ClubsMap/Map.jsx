import { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';

const ClubsMap = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch('/api/clubs')
      .then(response => response.json())
      .then(data => setClubs(data))
      .catch(error => console.error(error));
  }, []);
  console.log(clubs)

  const [mapState, setMapState] = useState({
    center: [55.751574, 37.573856],
    zoom: 5,
  });

  const [placemarkCoordinates, setPlacemarkCoordinates] = useState(null);

  const handleMapClick = (event) => {
    const coordinates = event.get('coords');
    console.log(coordinates);
    setPlacemarkCoordinates(coordinates);
  };

  const coordinates = [
    [55.751574, 37.573856],
    [55.750851, 37.579253],
    [55.751523, 37.574875],
  ];

  const placemarks = clubs.map(club => (
    <Placemark key={club.id} geometry={[club.latitude, club.longitude]} />
  ));

  if (placemarkCoordinates) {
    placemarks.push(
      <Placemark key="custom" geometry={placemarkCoordinates} />
    );
  }

  return (
    <YMaps>
      <Map
        state={mapState}
        onClick={handleMapClick}
        className='h-96 w-96'
      >
        <Clusterer
          options={{
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterBalloonContentLayout: CustomBalloonLayout,
          }}
        >
          {placemarks}
        </Clusterer>
      </Map>
    </YMaps>
  );
};

const CustomBalloonLayout = ({ properties }) => {
  return (
    <div>
      <h3>{properties.clusterCaption}</h3>
      <p>{properties.balloonContentBody}</p>
    </div>
  );
};

export default ClubsMap;
