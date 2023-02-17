import { getProduct } from '../../utils/products';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateItemInDatabaseBasket, deleteItemFromDatabaseBasket } from '../../utils/basket';
import { addOneToBasket, removeOneFromBasket, removeAllFromBasket } from '../../views/basket/basketSlice';
import './basketitem.css';

export const Basketitem = (props) => {
    const item = props.item;
    const loggedIn = sessionStorage.getItem("loggedIn");
    const quantity = props.item.quantity;
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const loadProduct = async (id) => {
        const res = await getProduct(id);
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

    const handleAdd = () => {
        if(loggedIn){
            updateItemInDatabaseBasket(sessionStorage.getItem("loggedUserID"), product.id, quantity+1);
        };
        dispatch(addOneToBasket({id: product.id, cost: product.cost}));
    };
    const handleMinus = () => {
        if(loggedIn){
            updateItemInDatabaseBasket(sessionStorage.getItem("loggedUserID"), product.id, quantity-1);
        };
        dispatch(removeOneFromBasket(item.id));
    };
    const handleRemoveItem = () => {
        if(loggedIn){
            deleteItemFromDatabaseBasket(sessionStorage.getItem("loggedUserID"), product.id);
        };
        dispatch(removeAllFromBasket(item.id));
    };

    useEffect(() => {
        loadProduct(item.id)
    }, []);

    return (
        <div className="basketItem">
            <img className="productImage" alt='product' src={item.image} />
            <div className='itemBody'>
                <h3 className="productName">{product.name}</h3>
                <p className='stockNumber'>{product.stock_count} in stock</p>
            </div>
            <div className='amountInfo'>
                <button className='minusButton' onClick={handleMinus}>-</button>
                <p className="amount">{quantity}</p>
                <button className='plusButton' onClick={handleAdd}>+</button>
            </div>
            <p className="productCost">£{itemCost}</p>
            <button className='removeAllButton' onClick={handleRemoveItem}>X</button>
        </div>
    )
}