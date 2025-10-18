// Can be in App.jsx or its own file
import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AuthRedirector = () => {
    const { userRole, isLoggedIn, isLoading } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isLoading) {
            return;
        }
        
        if (isLoggedIn && userRole === 'SELLER') {
            
            if (!location.pathname.startsWith('/seller-')) {
                 navigate('/seller-dashboard');
            }
        }
    }, [userRole, isLoggedIn, isLoading, navigate, location.pathname]);

    return null;
};

export default AuthRedirector;