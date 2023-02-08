import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from '../api'


export const useAuthStore = () => {

    const { status, errorMessage, user } = useSelector( state => state.auth );
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {

        try {
            
            const { data } = await calendarApi.post('/auth', { email, password });
            
        } catch ( error ) {
            console.log( error ); 
        }

    }

    return {
        status,
        errorMessage,
        user,
        startLogin
    }

}