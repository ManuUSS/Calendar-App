import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [],
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
        },
        onLoadEvents : ( state, { payload = [] } ) => {
            state.isLoadingEvents = false;
            payload.forEach( e => {
                const isOnState = state.events.some( dbEvent => dbEvent.id === e.id );
                if( !isOnState ) {
                    state.events.push( e );
                }
            })
        }  
    }
});


export const { onSetActiveEvent, onAddNewEvent, onUpadateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions;