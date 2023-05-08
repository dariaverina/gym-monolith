import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';

const ClubsMap = () => {
  const coordinates = [
    [55.751574, 37.573856],
    [55.750851, 37.579253],
    [55.751523, 37.574875],
  ];

  const placemarks = coordinates.map((coordinate) => (
    <Placemark key={coordinate} geometry={coordinate} />
  ));

  return (
    <YMaps>
      <Map defaultState={{ center: [55.751574, 37.573856], zoom: 14 }}>
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
