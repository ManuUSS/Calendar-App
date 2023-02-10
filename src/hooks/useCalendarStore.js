import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpadateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async ( calendarEvent ) => {
        
        try {

            if( !calendarEvent.id ) {
                
                const { data } = await calendarApi.post('/events', calendarEvent );
    
                dispatch( onAddNewEvent( {...calendarEvent, id: data.event.id, user  } ) );
                return;
            }
    
            await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
            dispatch( onUpadateEvent({ ...calendarEvent, user }) );

        } catch ( error ) {
            console.log( error );
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() );
    }

    const startLoadingEvents = async () => {
        try {
            
            const { data } = await calendarApi.get('/events'); 
            const events = convertEventToDateEvents( data.events );
            dispatch( onLoadEvents( events ) );

        } catch ( error ) {
            console.log( error );
        }
    }

    return {
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}