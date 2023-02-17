import { getOrderProducts } from "../../utils/orders"
import { useState, useEffect } from "react";
import { OrderTableRow } from "../../components/ordertablerow/Ordertablerow";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LoadingAnim } from "../../components/loadingAnim/LoadingAnim";
import './order.css';

export const Order = () => {
    const [isShown, setShown] = useState(true);
    const [order, setOrder] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate()
    const loadOrderProducts = async (order_id) => {
        setLoading(true);
        const res = await getOrderProducts(sessionStorage.getItem('loggedUserID'), order_id);
        const jsonResponse = await res.json();
        if(res.ok){
            setOrder(jsonResponse);
            setLoading(false);
        } else {
            window.alert(jsonResponse.message);
            setLoading(false);
        }
    }
    
    useEffect(() => {
        loadOrderProducts(document.location.pathname.substring(16));
    }, []);

    const handleExit = () => {
        setShown(false);
        setTimeout(() => navigate('/'), 200);
    };

    return(
        <AnimatePresence>
        {isShown &&
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="viewContainer" onClick={handleExit}>
        <div className="order" onClick={(e) => e.stopPropagation()}>
            
            {isLoading ? <LoadingAnim/> :
            <>
            <h2>Order #{document.location.pathname.substring(16)}</h2>
            <table>
                <thead>
                    <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Cost</th>
                    </tr>
                </thead>
                {order.map(order => <OrderTableRow key={order.name} order={order} />)}
                <tfoot>
                    <tr>
                    <td colSpan='3'>Order total:</td>
                    <td>£{order.reduce((acc, obj) => acc + obj.quantity*obj.cost, 0).toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
            <button className="backButton" onClick={() => navigate(-1)}>Back</button>
            </>
            }
        
        </div>
        </motion.div>}
        </AnimatePresence>
    )
}