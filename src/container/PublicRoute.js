import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {

    const isAuthenticated = localStorage.getItem('auth_token');
    
    return (
        !isAuthenticated ? (
            children
        ) : (
            <Navigate
                to='/dashboard'
                replace />
        )
    );
}

export default PublicRoute;