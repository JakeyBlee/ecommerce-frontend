import { Navigate } from "react-router-dom";

// Stops users accessing routes that require login if not logged in

export const AuthenticatedRoute = ({children}) => {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if(!loggedIn){
        window.alert('Please log in to view page');
        return <Navigate to={'/login'}/>;
    }
    return children;
}