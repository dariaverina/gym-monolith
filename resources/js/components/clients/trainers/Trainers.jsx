import axios from 'axios';
import { useState, useEffect } from 'react';
import { userStateContext } from '@/context/context-provider';
import TrainersList from './TrainersList/TrainersList';

export default function ClientsTrainers() {
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const [trainers, setTrainers] = useState([]);
    console.log('trainera',trainers)

    useEffect(() => {
        axios
          .get('/api/users', {
            params: {
              user_type: 't'
            }
          })
          .then((res) => setTrainers(res.data))
          .catch((err) => console.log(err));
      }, []);
    return (
      <div className=" pt-16 pl-10 pr-10 bg-gray-900">
        {trainers && <TrainersList trainers = {trainers}/>}
      </div>
    );
  }