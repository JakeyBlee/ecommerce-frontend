import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Basketitem } from "../../components/basketitem/Basketitem";
import { selectBasket, clearBasket } from "./basketSlice";
import { useNavigate } from "react-router-dom";
import { deleteDatabaseBasket } from "../../utils/basket";
import { motion, AnimatePresence } from "framer-motion";
import './basket.css';

export const Basket = () => {
    const [isShown, setShown] = useState(true);
    const [basketTotal, setBasketTotal] = useState(0);
    const loggedIn = sessionStorage.getItem("loggedIn");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const basket = useSelector(selectBasket).items;

    useEffect(() => {
        let totalSum = 0;
        for(const item of basket){
            totalSum += item.quantity*item.cost;
        }
        setBasketTotal(totalSum);
    }, [basket]);

    const handleClearBasket = () => {
        if(loggedIn){
            deleteDatabaseBasket(sessionStorage.getItem("loggedUserID"));
        };
        dispatch(clearBasket());
    };

    const handleExit = () => {
        setShown(false);
        setTimeout(() => navigate('/'), 200);
    };

    return (
        <AnimatePresence>
        {isShown &&
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="viewContainer" onClick={handleExit}>
        <div className="basket" onClick={(e) => e.stopPropagation()}>
            
            <h2>Shopping Basket</h2>
            {(basket.length > 0) ? 
            <>
            <h3>Basket Sub-total: £{basketTotal.toFixed(2)}</h3>
            <div className="basketButtons">
                {sessionStorage.loggedIn ? 
                <button className="basketButton" onClick={() => navigate('/basket/checkout')}>Proceed to Checkout</button>:
                <button className="basketButton" onClick={() => navigate('/login')}>Sign in to Account</button>
                }
                <button className="basketButton" onClick={handleClearBasket}>Clear Basket</button>
            </div>
            <div className="basketList">
                {basket.map(item => <Basketitem key={item.id} item={item} />)}
            </div>
            </>
            :
            <>
            <h3>Your Basket is Empty!</h3>
            <button className="backButton" onClick={() => navigate(-1)}>Back</button>
            </>}

        </div>
        </motion.div>}
        </AnimatePresence>
    )
};