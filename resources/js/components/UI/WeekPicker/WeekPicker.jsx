import React, { useState } from 'react'
import DatePicker from 'rsuite/DatePicker';
import moment from 'moment';
import 'rsuite/dist/rsuite.min.css';
import './WeekPicker.css';



const WeekPicker = ({selectedWeek, setSelectedWeek}) => {

    const [objWeek, setObjWeek] = useState({
        date: new Date(),
        dateFrom: null,
        dateTo: null,
    });

    const onChange = (date) => {
        setSelectedWeek(moment(date).isoWeek())
        const weekNumber = moment(date).isoWeek();
        const dateFrom = moment(date).startOf('isoWeek').toDate();
        const dateTo = moment(date).endOf('isoWeek').toDate();

        setObjWeek({
            date,
            dateFrom,
            dateTo,
            weekNumber
        })
    }

    const renderValue = (date) => {
        const weekNumber = moment(date).isoWeek();
        const year = moment(date).year();

        return `${weekNumber}, ${year}`;
    }

  return (
    <div className='WeekPicker'>
        <DatePicker
            placeholder='Week picker'
            isoWeek
            showWeekNumbers
            value={objWeek.date}
            onChange={onChange}
            renderValue={renderValue}
        />
    </div>
  )
}

export default WeekPicker