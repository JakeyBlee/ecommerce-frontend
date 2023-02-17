import './ordertablerow.css';

export const OrderTableRow = (props) => {
    const order = props.order;

    return (
        <tbody className="orderTableRow">
            <tr>
                <td>{order.name}</td>
                <td>£{order.cost.toFixed(2)}</td>
                <td>{order.quantity}</td>
                <td>£{(order.cost*order.quantity).toFixed(2)}</td>
            </tr>
        </tbody>
    )
}