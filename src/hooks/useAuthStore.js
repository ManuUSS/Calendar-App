import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '../store';

export const useAuthStore = () => {

    const { status, errorMessage, user } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        dispatch( onChecking() );
        
        try {
            
            const { data } = await calendarApi.post('/auth/', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch ( error ) {
            console.log( error ); 
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 100);
        }

    }

    const startRegister = async ({ name, email, password }) => {
        dispatch( onChecking() );

        try {
            const data = await calendarApi.post('/auth/new', { name, email, password } );
            
            //localStorage.setItem('token', data.token);
            //localStorage.setItem('token-init-date', new Date().getTime());
            //dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch ( error ) {
            console.log( error );
            dispatch( onLogout( error.response.data?.msg || 'Sucedió algo inesperado.' ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 100);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutCalendar() );
        dispatch( onLogout( ) );
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        
        if( !token ) return dispatch( onLogout() );

        try {

            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch ( error ) {
            console.log( error );
            localStorage.clear();
            dispatch( onLogout() );
        }

    }

    return {
        status,
        errorMessage,
        user,
        startLogin,
        startRegister,
        startLogout,
        checkAuthToken
    }

}