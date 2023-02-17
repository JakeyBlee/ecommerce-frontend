import { useNavigate } from "react-router-dom";
import './orderstablerow.css';

export const OrdersTableRow = (props) => {
    const navigate = useNavigate();
    const order = props.order;

    return (
        <tbody className="ordersTableRow" onClick={() => {navigate(`/account/orders/${order.id}`)}}>
            <tr>
                <td>#{order.id}</td>
                <td>{order.date}</td>
                <td>£{order.total_cost.toFixed(2)}</td>
            </tr>
        </tbody>
    )
}