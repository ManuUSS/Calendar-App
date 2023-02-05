import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpadateEvent } from "../store";


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

    return {
        activeEvent,
        events,

        setActiveEvent,
        startSavingEvent
    }
}