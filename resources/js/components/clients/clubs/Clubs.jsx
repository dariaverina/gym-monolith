import ClubsList from "./ClubsList/ClubsList";
import ClubsMap from "./ClubsMap/Map";
import { useState, useEffect } from 'react';

export default function ClientsClubs() {
    const [mapState, setMapState] = useState({
        center: [54.32096022627581, 48.447679630859355],
        zoom: 9,
      });
    const [clubs, setClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState(null);
    console.log('sel', selectedClub)
    useEffect(() => {
      fetch('/api/clubs')
        .then(response => response.json())
        .then(data => setClubs(data))
        .catch(error => console.error(error));
    }, []);
    console.log(clubs)
    return (
      <div className="flex flex-wrap mt-16 ml-10">
      <ClubsMap clubs = {clubs} selectedClub={selectedClub} setSelectedClub={setSelectedClub} mapState={mapState} setMapState={setMapState}/>
      <ClubsList clubs = {clubs} selectedClub={selectedClub} setSelectedClub={setSelectedClub} setMapState={setMapState}/>
      </div>
    );
  }