import { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


const Reporting = () => {
    const pdfGenerate = () => {
        var doc = new jsPDF('p', 'pt');
        const scheduleData = [
          {
            day: 'Monday',
            rooms: [
              {
                room: 'Small Room',
                schedule: [
                  { time: '7:00 - 8:20', visitors: '12/20' },
                  { time: '8:30 - 9:50', visitors: '18/20' },
                  { time: '10:00 - 11:20', visitors: '20/20' },
                  { time: '11:30 - 12:50', visitors: '16/20' },
                ],
              },
              {
                room: 'Large Room',
                schedule: [
                  { time: '7:00 - 8:20', visitors: '15/30' },
                  { time: '8:30 - 9:50', visitors: '25/30' },
                  { time: '10:00 - 11:20', visitors: '30/30' },
                  { time: '11:30 - 12:50', visitors: '28/30' },
                ],
              },
            ],
          },
          {
            day: 'Tuesday',
            rooms: [
              {
                room: 'Small Room',
                schedule: [
                  { time: '7:00 - 8:20', visitors: '10/20' },
                  { time: '8:30 - 9:50', visitors: '20/20' },
                  { time: '10:00 - 11:20', visitors: '18/20' },
                  { time: '11:30 - 12:50', visitors: '15/20' },
                ],
              },
              {
                room: 'Large Room',
                schedule: [
                  { time: '7:00 - 8:20', visitors: '20/30' },
                  { time: '8:30 - 9:50', visitors: '28/30' },
                  { time: '10:00 - 11:20', visitors: '25/30' },
                  { time: '11:30 - 12:50', visitors: '22/30' },
                ],
              },
            ],
          },
        ];
    
        doc.setFontSize(12);
        doc.text('Gym Schedule', 40, 40);
    
        let startY = 60;
    
        scheduleData.forEach((dayData) => {
          doc.setFontSize(14);
          doc.text(dayData.day, 40, startY);
    
          dayData.rooms.forEach((roomData) => {
            doc.setFontSize(12);
            startY += 20;
            doc.text(roomData.room, 40, startY);
    
            doc.autoTable({
              startY: startY + 10,
              head: [['Time', 'Visitors']],
              body: roomData.schedule.map((entry) => [entry.time, entry.visitors]),
              didDrawCell: (data) => {
                if (data.row.index === 0) {
                  doc.setFillColor(220, 220, 220);
                  doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
                }
              },
            });
    
            startY += roomData.schedule.length * 20 + 20;
          });
        });
    
        doc.save('report.pdf');
      };
    
	return (
		<div>
			<button onClick={()=>{pdfGenerate()}}>save pdf</button>
		</div>
	);
};

export default Reporting;