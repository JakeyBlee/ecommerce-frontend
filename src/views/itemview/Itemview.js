import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOneItemToDatabaseBasket, updateItemInDatabaseBasket } from "../../utils/basket";
import { addOneToBasket, removeOneFromBasket } from "../basket/basketSlice";
import { selectBasket } from "../basket/basketSlice";
import { useNavigate, useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import './itemview.css';

export const Itemview = () => {
    const [isShown, setShown] = useState(true);
    const products = useOutletContext();
    const index = products.findIndex(obj => obj.id == document.location.pathname.substring(1));
    const product = products[index];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const basket = useSelector(selectBasket).items;
    const loggedIn = sessionStorage.getItem("loggedIn");
    const displayPrice = product.cost.toFixed(2);

    let quantity = 0;
    const item = basket.find(item => item.id === product.id);
    if(item) {
        quantity = (basket.find(item => item.id === product.id)).quantity;
    };

    if(!product.image2){
        product.image2 = product.image
    };
    if(!product.image3){
        product.image3 = product.image
    };

    const handleClick = (e) => {
        if(loggedIn){
            addOneItemToDatabaseBasket(sessionStorage.getItem("loggedUserID"), product.id);
        };
        dispatch(addOneToBasket({id: product.id, cost: product.cost, image: product.image}));
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
        dispatch(removeOneFromBasket(product.id));
    };

    const handleExit = () => {
        setShown(false);
        setTimeout(() => navigate(-1), 200);
    };

    return (
        <AnimatePresence>
        {isShown &&
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="viewContainer" onClick={handleExit}>
        <div className="item" onClick={(e) => e.stopPropagation()}>
            <div className="productImages">
                <img className="mainImage" alt='product' src={product.image} />
                <img className="productImage" alt='product' src={product.image2} />
                <img className="productImage" alt='product' src={product.image3} /> 
            </div>
            <h2 className="itemTitle">{product.name} - £{displayPrice}</h2>
            <p className="itemDesc">{product.description} <br/><br/> {product.stock_count} items left in stock</p>
            {quantity < 1 ?
            <button className="addBasketButton" onClick={handleClick}>Add to Basket</button>
            :
            <div className='itemViewAmountInfo'>
                <button className='minusButton' onClick={handleMinus}>-</button>
                <p className="amount">{quantity}</p>
                <button className='plusButton' onClick={handleAdd}>+</button>
            </div>
            }
        </div>
        </motion.div>}
        </AnimatePresence>
    )
};