import { Navigate } from 'react-router-dom';
  
  function PrivateRoute({ children }) {

    const isAuthenticated = localStorage.getItem('auth_token');

    return (
            isAuthenticated
              ? (
                children
              ) : (
                  <Navigate to="/signin" replace/>
              )
    );
  }
  
  export default PrivateRoute;