import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Reporting = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(clubs[0]);
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  useEffect(() => {
    fetch("/api/clubs")
      .then((response) => response.json())
      .then((data) => {setClubs(data); setSelectedClub(data[0].id)})
      .catch((error) => console.error(error));
    
  }, []);

  const pdfGenerate = () => {
    fetch("/generate-report?club_id=" + selectedClub + '&week_number=23')
      .then((response) => response.blob())
      .then((blob) => {
        // Создайте URL-объект для скачивания PDF-файла
        const url = window.URL.createObjectURL(new Blob([blob]));

        // Создайте ссылку для скачивания и нажмите на нее для скачивания файла
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error(error));
  }



  return (
    <div className='bg-gray-900'>
      <div className="flex justify-center pt-6 h-28">
        <h1 class="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900">
          Получить отчет
        </h1>
      </div>
      <div className="flex justify-center h-24">
        <h1 class="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-400 to-indigo-400">
          Расписание выбранного клуба
        </h1>
      </div>

      <div className='flex justify-center '>
        <label htmlFor="location" className="block text-sm font-medium leading-6 text-white pr-4 text-center">
          Клуб:
        </label>
        <select
          id="location"
          name="location"
          className="mt-2 block w-48 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue="Canada"
          onChange={(e) => setSelectedClub(e.target.value)}
        >
          {clubs && clubs.map((club) => (
            <option className="text-black" key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center mt-4">
        <label htmlFor="week" className="block text-sm font-medium leading-6 text-white pr-4 text-center">
          Неделя:
        </label>
        <div className="ml-4">
        <DatePicker
            id="week"
            selected={selectedWeek}
            onChange={(date) => setSelectedWeek(date)}
            className="block w-48 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            showWeekNumbers
            dateFormat="w, yyyy"
            showMonthDropdown
            startDate={new Date(selectedWeek)} // Set the start date of the selected week
            endDate={new Date(selectedWeek)} // Set the end date of the selected week
            selectsRange
          />
        </div>
      </div>
      <div className='flex justify-center mt-4'><button className=" rounded-md bg-indigo-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => { pdfGenerate() }}>Скачать отчет </button></div>

    </div>

  );
};

export default Reporting;