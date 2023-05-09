import { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';

const ClubsMap = ({clubs, selectedClub, setSelectedClub, mapState, setMapState}) => {

  const [placemarkCoordinates, setPlacemarkCoordinates] = useState(null);

  const placemarks = clubs && clubs.map(club => (
    <Placemark key={club.id} geometry={[club.latitude, club.longitude]} onClick={()=>{setSelectedClub(club)}}/>
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
        className='h-96'
      >
        <Clusterer
          options={{
            preset: 'islands#violetClusterIcons',
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
