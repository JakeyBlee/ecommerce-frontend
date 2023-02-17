import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectBasket } from "../../views/basket/basketSlice";
import './itemtile.css';

export const Itemtile = (props) => {
    const [basketNum, setBasketNum] = useState(0);
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    const basket = useSelector(selectBasket).items;
    const item = props.item;
    
    useEffect(() => {
        const product = basket.find(x => x.id == item.id);
        if(product){
            setBasketNum(product.quantity);
        } else {
            setBasketNum(0);
        }
    }, [basket]);
    
    const handleClick = () => {
        navigate(`/${item.id}`)
    };

    const mouseover = () => {
        setHover(true);
    };
    const mouseout = () => {
        setHover(false);
    }

    return (
        <div className="itemCard" onClick={handleClick} onMouseOver={mouseover} onMouseOut={mouseout}>
            <div className="images">
            <AnimatePresence>
            {hover && item.image2 ?
            <motion.img key={item.image2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="productImage" alt='product' src={item.image2} />
            : <motion.img key={item.image} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="productImage" alt='product' src={item.image} />}
            {basketNum > 0 && <div className="basketNumBanner">{basketNum} in Basket</div>}
            </AnimatePresence>
            </div>
            <h3 className="productName">{item.name}</h3>
            <p className="productInfo">£{item.cost.toFixed(2)} - {item.stock_count} left in stock</p>
        </div>
    )
}