import ClubsList from "./ClubsList/ClubsList";
import ClubsMap from "./ClubsMap/Map";
import { useState, useEffect } from 'react';
import { getClubs } from "../../../api/get-clubs";

export default function ClientsClubs() {
  const [mapState, setMapState] = useState({
    center: [54.32096022627581, 48.447679630859355],
    zoom: 9,
  });
  const [clubs, setClubs] = useState([]);
  
  const [selectedClub, setSelectedClub] = useState(null);
  useEffect(() => {
    getClubs()
      .then((data) => setClubs(data))
      .catch((error) => console.error(error));
  }, []);
  console.log(clubs)
  return (
    <div className="flex flex-wrap pt-16 pl-10 bg-gray-900">
      <ClubsMap clubs={clubs} selectedClub={selectedClub} setSelectedClub={setSelectedClub} mapState={mapState} setMapState={setMapState} />
      <ClubsList clubs={clubs} selectedClub={selectedClub} setSelectedClub={setSelectedClub} setMapState={setMapState} />
    </div>
  );
}