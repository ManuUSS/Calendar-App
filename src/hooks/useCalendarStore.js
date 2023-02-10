import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpadateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async ( calendarEvent ) => {
        

        
        if( !calendarEvent._id ) {
            
            const { data } = await calendarApi.post('/events', calendarEvent );

            dispatch( onAddNewEvent( {...calendarEvent, id: data.event.id, user  } ) );
            return;
        }

        dispatch( onUpadateEvent({ ...calendarEvent }) );
    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() );
    }

    return {
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}