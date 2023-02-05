import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, Navbar, CalendarModal, FabAddNew } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useUIStore, useCalendarStore } from '../../hooks';

export const CalendarPage = () => {

  const [ lastView, setLastView ] = useState( localStorage.getItem('view') || 'week' );

  const { openDateModal } = useUIStore()
  const { events, setActiveEvent } = useCalendarStore();
  
  const eventStyleGetter = ( event, start, end, isSelected ) => {
  }
  
  const onDoubleClick = ( event ) => {
    openDateModal();
  }

  const onSelect = ( event ) => {
    setActiveEvent( event );
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
        <CalendarModal />
        <FabAddNew />
      </div>
    </>
  )
}
