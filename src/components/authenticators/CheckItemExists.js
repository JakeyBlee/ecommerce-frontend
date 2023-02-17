import { Navigate, useOutletContext } from "react-router-dom";

//Ensures item exists before rendering Itemview

export const CheckItemExists = ({children}) => {
    const products = useOutletContext();
    const index = products.findIndex(obj => obj.id == document.location.pathname.substring(1));
    const product = products[index];
    if(!product){
        return <Navigate to={'/'}/>;
    }
    return children;
}