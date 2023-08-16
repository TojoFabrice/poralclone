import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const AppWrapper = ({ children }: any) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const newPath = location.pathname.replace(/\/$/, '');
        if (newPath !== location.pathname) {
            navigate(newPath);
        }
    }, [location.pathname, navigate]);

    return <>{children}</>;
}

export default AppWrapper
