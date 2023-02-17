import { getUserOrders } from "../../utils/orders"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersTableRow } from "../../components/orderstablerow/OrdersTableRow";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingAnim } from "../../components/loadingAnim/LoadingAnim";
import './orders.css';

export const Orders = () => {
    const [isShown, setShown] = useState(true);
    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const loadUserOrders = async () => {
        setLoading(true);
        const res = await getUserOrders(sessionStorage.getItem('loggedUserID'));
        const jsonResponse = await res.json();
        if(res.ok){
            setOrders(jsonResponse);
            setLoading(false);
        } else {
            window.alert(jsonResponse.message);
            setLoading(false);
        }
    }
    
    useEffect(() => {
        loadUserOrders();
    }, []);

    const handleExit = () => {
        setShown(false);
        setTimeout(() => navigate('/'), 200);
    };

    return(
        <AnimatePresence>
        {isShown &&
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="viewContainer" onClick={handleExit}>
        <div className="orders" onClick={(e) => e.stopPropagation()}>
            
        <h2>Order History</h2>
            {isLoading ? <LoadingAnim/> : orders.length > 0 ?
            <>
            <h3>Click to see more info</h3>
            <table>
                <thead>
                    <tr>
                    <th>Order ID</th>
                    <th>Date Placed</th>
                    <th>Total Cost</th>
                    </tr>
                </thead>
                {orders.map(order => <OrdersTableRow key={order.id} order={order} />)}
            </table>
            </>
            :
            <h3>No previous orders made!</h3>
            }

        <button className="backButton" onClick={() => navigate(-1)}>Back</button>


        </div>
        </motion.div>}
        </AnimatePresence>
    )
}