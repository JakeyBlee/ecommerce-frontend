import { getProduct } from '../../utils/products';
import { useState, useEffect } from 'react';

export const CheckoutTableRow = (props) => {
    const quantity = props.item.quantity;
    const [product, setProduct] = useState({});
    const loadProduct = async () => {
        const res = await getProduct(props.item.id);
        const jsonResponse = await res.json();
        if(res.ok){
            setProduct(jsonResponse);
        } else {
            window.alert(jsonResponse.message);
        }
    ;}
    let itemCost;
    if(product.cost){
        itemCost = product.cost.toFixed(2);
    };

    useEffect(() => {
        loadProduct()
    }, []);

    return (
        <tbody>
            <tr>
                <td>{product.name}</td>
                <td>£{itemCost}</td>
                <td>{quantity}</td>
                <td>£{(product.cost*quantity).toFixed(2)}</td>
            </tr>
        </tbody>
    )
}