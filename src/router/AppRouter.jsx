import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';
import { WordsPage } from '../words/WordsPage';

export const AppRouter = () => {

    const { checkAuthToken, status } = useAuthStore();
    // const authStatus = 'not-authenticated'; //  'checking' 'authenticated', 'not-authenticated', 


    useEffect( () => {
        checkAuthToken();
    }, [])

    if(status === 'checking'){
        return (
            <h3 className='text-center mt-4'>Cargando...</h3>
        )
    }


    return (
        <Routes>

            {
                (status === 'not-authenticated')
                ? ( 
                    <>
                        <Route path="/auth/*" element={ <LoginPage /> } />
                        <Route path="/*"  element={ <Navigate to="/auth/login" />} />                    
                    </>
                )
                :(
                    <>
                        <Route path="/" element={ <CalendarPage /> } />
                        <Route path="/*"  element={ <Navigate to="/" />} /> 
                        <Route path="/words" element={  <WordsPage />  } />                  
                    </>
                )
            }


        </Routes>
    )
}