import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpadateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar )

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async ( calendarEvent ) => {
        if( !calendarEvent._id ) {
            dispatch( onAddNewEvent( {...calendarEvent, _id: new Date().getTime() } ) );
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