import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLougtCalendar } from '../store';


export const useAuthStore = () => {

const { status, user, errorMessage } = useSelector( state => state.auth );
const dispatch = useDispatch();


const startLogin = async({ email, password }) => {

    dispatch( onChecking() );
    
    try {
        
        const { data } = await calendarApi.post('/auth', {email, password});
        // console.log({ data });
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-data', new Date().getTime() );
        dispatch( onLogin({ name: data.name, uid: data.uid }) );


    } catch (error) {
        // console.log(error.response);
        dispatch( onLogout(error.response.data.msg) );
        setTimeout(() => {
           dispatch( clearErrorMessage() );
        }, 10);
    }
}


const startRegister = async({ name, email, password }) => {
    dispatch( onChecking() );
    
    try {
        
        const { data } = await calendarApi.post('/auth/new', { name, email, password});
        console.log({ data });
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-data', new Date().getTime() );
        dispatch( onLogin({ name: data.name, uid: data.uid }) );

    } catch (error) {

        console.log(error.response);
        dispatch( onLogout(error.response.data?.msg || '--') );
        setTimeout(() => {
           dispatch( clearErrorMessage() );
        }, 10);

    }
}


const checkAuthToken = async() => {

    const token = localStorage.getItem('token');
    if(!token) return dispatch( onLogout() );

    try {

        const { data } = await calendarApi.get('auth/renew');
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-data', new Date().getTime() );
        dispatch( onLogin({ name: data.name, uid: data.uid }) );
          
    } catch (error) {
        localStorage.clear();
        dispatch( onLogout() );
    }

}


const startLogout = () => {
    localStorage.clear();
    dispatch( onLougtCalendar() );
    dispatch( onLogout() );
}


    return {
        //* Properties
        status, 
        user, 
        errorMessage,

        //* Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }

}