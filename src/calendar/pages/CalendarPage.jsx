import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';

import { Navbar } from '../';
import { localizer, getMessagesES } from '../../helpers';


const events = [{
  title: 'Cumple',
  notes: 'Comprar qq',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: 'ABC',
    name: 'Manuel'
  }
}]

export const CalendarPage = () => {
  
  const eventStyleGetter = ( event, start, end, isSelected ) => {
  }
  
  return (
    <>
      <Navbar />
      <div className='container shadow-sm p-4'>
        <Calendar
          culture='es-ES'
          localizer={ localizer }
          events={ events }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc( 90vh - 100px )' }}
          messages={ getMessagesES() }
          eventPropGetter={ eventStyleGetter }
        />
      </div>
    </>
  )
}
