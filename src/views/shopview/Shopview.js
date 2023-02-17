import { Itemtile } from "../../components/itemtile/Itemtile";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../utils/products";
import { motion } from "framer-motion";
import './shopview.css';

export const Shopview = () => {
    const [products, setProducts] = useState([]);
    const loadAllProducts = async () => {
        const res = await getAllProducts();
        const jsonResponse = await res.json();
        if(res.ok){
            setProducts(jsonResponse);
        } else {
            window.alert(jsonResponse.message);
        }
    }

    useEffect(() => {
        loadAllProducts()
    }, []);

    return (
        <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        <div className="itemGrid">
            {products.map(item => <Itemtile key={item.id} item={item} />)}
        </div>
        <Outlet context={products}/>
        </motion.div>
    )
};