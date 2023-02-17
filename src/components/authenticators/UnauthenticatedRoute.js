import { Navigate } from "react-router-dom";

// Stops logged in users accessing routes that assume guest status

export const UnauthenticatedRoute = ({children}) => {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if(loggedIn){
        window.alert('Already logged in!');
        return <Navigate to={'/'}/>;
    }
    return children;
}