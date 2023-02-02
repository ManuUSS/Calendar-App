import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';

import { CalendarEvent, Navbar } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';


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

  const [ lastView, setLastView ] = useState( localStorage.getItem('view') || 'week' );
  
  const eventStyleGetter = ( event, start, end, isSelected ) => {
  }
  
  const onDoubleClick = ( event ) => {

  }

  const onSelect = ( event ) => {

  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('view', event);
  }

  return (
    <>
      <Navbar />
      <div className='container shadow-sm p-4'>
        <Calendar
          culture='es-ES'
          localizer={ localizer }
          events={ events }
          defaultView={ lastView }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc( 90vh - 100px )' }}
          messages={ getMessagesES() }
          eventPropGetter={ eventStyleGetter }
          components= {{
            event: CalendarEvent
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChanged }
        />
      </div>
    </>
  )
}
