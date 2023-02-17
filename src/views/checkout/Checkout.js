import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CheckoutTableRow } from "../../components/checkouttablerow/CheckoutTableRow";
import { selectBasket } from "../basket/basketSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Paymentform } from "../../components/paymentform/Paymentform";
import './checkout.css';

export const Checkout = () => {
    const [isShown, setShown] = useState(true);
    const [basketTotal, setBasketTotal] = useState(0);
    const basket = useSelector(selectBasket).items;
    const navigate = useNavigate();

    useEffect(() => {
        let totalSum = 0;
        for(const item of basket){
            totalSum += item.quantity*item.cost;
        }
        setBasketTotal(totalSum);
    }, [basket]);

    const handleExit = () => {
        setShown(false);
        setTimeout(() => navigate('/'), 200);
    };

    return (
        <AnimatePresence>
        {isShown &&
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="viewContainer" onClick={handleExit}>
        <div className="checkout" onClick={(e) => e.stopPropagation()}>
            
            <h2>Checkout</h2>
            <table>
                <thead>
                    <tr>
                    <th>Item</th>
                    <th>Cost</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    </tr>
                </thead>
                {basket.map(item => <CheckoutTableRow key={item.id} item={item} />)}
                <tfoot>
                    <tr>
                    <td colSpan='3'>Order total:</td>
                    <td>£{basketTotal.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
            <Paymentform basket={basket} basketTotal={basketTotal}/>
            <button className="backButton" onClick={() => navigate(-1)}>Back</button>

        </div>
        </motion.div>}
        </AnimatePresence>
    )
};