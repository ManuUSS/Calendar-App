import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumple',
    notes: 'Comprar qq',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
      _id: 'ABC',
      name: 'Manuel'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state, { payload }) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpadateEvent: ( state, { payload }) => {
            state.events = state.events.map( ( e ) => {
                if( e._id === payload._id ) {
                    return payload;
                }
                return e;
            })
        },
        onDeleteEvent : ( state ) => {
            if( state.activeEvent ) {
                state.events = state.events.filter( ( e ) => e._id !== state.activeEvent._id );
                state.activeEvent = null;
            }
        } 
    }
});


export const { onSetActiveEvent, onAddNewEvent, onUpadateEvent, onDeleteEvent } = calendarSlice.actions;