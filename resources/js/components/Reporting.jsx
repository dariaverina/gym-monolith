import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { PDFDocument, rgb } from 'pdf-lib';

// Импортируйте шрифт и кодировку для русских символов


const Reporting = () => {
  const [clubs, setClubs] = useState([]);

    useEffect(() => {
        fetch("/api/clubs")
            .then((response) => response.json())
            .then((data) => setClubs(data))
            .catch((error) => console.error(error));
    }, []);

  const pdfGenerate = () => {
    const doc = new jsPDF('p', 'pt');
    doc.setFont('helvetica');
    // Добавляем шрифт Arial Unicode MS
    doc.setFontSize(12);
    doc.text('Расписание зала', 40, 40);

    const bodyData = [
      ['7:00-8:20', '', 'free', '', 'free', '', '', ''],
      ['8:30-9:50', '', '', '', '', '', '', ''],
      ['10:00-11:20', '', '', '', '', '', '', ''],
      ['11:30-12:50', '', '', '', 'free', '', '', ''],
      ['13:00-14:20', 'free', '', 'free', '', '', '', ''],
      ['14:30-15:50', 'free', '', 'free', '', '', '', ''],
      ['16:00-17:20', 'free', '', 'free', '', '', '', ''],
      ['17:30-18:50', 'free', '', 'free', '', '', '', ''],
      ['19:00-20:20', '', '', '', 'free', '', '', ''],
      ['20:30-21:50', '', '', '', 'free', '', '', ''],
    ];

    const bodyData2 = [
      ['7:00-8:20', 'free', 'free', '', 'free', '', '', ''],
      ['8:30-9:50', 'free', '', '', '', '', '', ''],
      ['10:00-11:20', 'free', '', '', '', '', '', ''],
      ['11:30-12:50', '', '', '', 'free', '', '', ''],
      ['13:00-14:20', 'free', '', 'free', '', '', '', ''],
      ['14:30-15:50', 'free', '', 'free', '', '', 'free', ''],
      ['16:00-17:20', 'free', '', 'free', '', '', 'free', ''],
      ['17:30-18:50', 'free', '', 'free', '', '', 'free', ''],
      ['19:00-20:20', '', '', '', 'free', '', '', 'free'],
      ['20:30-21:50', '', '', '', 'free', '', '', ''],
    ];
    doc.text('Расписание зала 2', 40, 40);
    doc.autoTable({
      head: [['', 'mon', 'tues', 'wed', 'thurs', 'fr', 'sat', 'sun']],
      body: bodyData,
      didDrawCell: (data) => {
        if (data.cell.raw === 'free') {
          doc.setFillColor(153, 255, 153); // Зеленый цвет заливки
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
          doc.setTextColor(0, 0, 0); // Белый цвет текста
          doc.text('free', data.cell.x + 6, data.cell.y + 12); // Отображение текста в ячейке
        }
      },
    });
    const secondTextY = doc.previousAutoTable.finalY + 10;
    doc.text('Расписание зала 2', 40, secondTextY);
    doc.autoTable({
      head: [['', 'mon', 'tues', 'wed', 'thurs', 'fr', 'sat', 'sun']],
      body: bodyData2,
      didDrawCell: (data) => {
        if (data.cell.raw === 'free') {
          doc.setFillColor(153, 255, 153); // Зеленый цвет заливки
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
          doc.setTextColor(0, 0, 0); // Белый цвет текста
          doc.text('free', data.cell.x + 6, data.cell.y + 12); // Отображение текста в ячейке
        }
      },
    });

    doc.save('report.pdf');
  };
  
  
    
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
          >
                {clubs && clubs.map((club) => (
                    <option className="text-black" key={club.id} value={club.id}>
                        {club.name}
                    </option>
                ))}
          </select>
          <button className="ml-16 rounded-md bg-indigo-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={()=>{pdfGenerate()}}>save pdf</button>
		</div>
        </div>
			
	);
};

export default Reporting;