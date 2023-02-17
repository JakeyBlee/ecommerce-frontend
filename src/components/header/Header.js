import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasket } from '../../views/basket/basketSlice.js';
import { logout } from "../../utils/authentication.js";
import { clearBasket } from '../../views/basket/basketSlice.js';
import './header.css';
import { getUserDetails } from '../../utils/users.js';


export const Header = () => {
    const [name, setName] = useState('Guest');
    const [basketTotal, setBasketTotal] = useState(0);
    const loggedIn = sessionStorage.getItem("loggedIn");
    const userID = sessionStorage.getItem('loggedUserID');
    const loadUserData = async () => {
        const res = await getUserDetails(userID);
        const jsonResponse = await res.json();
        if(res.ok){
            setName(jsonResponse.first_name);
            sessionStorage.setItem('firstName', jsonResponse.first_name);
            sessionStorage.setItem('lastName', jsonResponse.last_name);
        } else {
            window.alert(jsonResponse.message);
        }
    }
    useEffect(() => {
        if(loggedIn){
            loadUserData();
        } else {
            setName('Guest');
        }
    }, [loggedIn])

    const basket = useSelector(selectBasket).items;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setBasketTotal(basket.reduce((acc, obj) => acc + obj.quantity, 0));
    }, [basket]);

    const handleLogout = async () => {
        const res = await logout();
        if(res.ok){
        sessionStorage.clear();
        dispatch(clearBasket());
        console.log("Logged out");
        navigate('/login');
        } else {
            window.alert(res.message);
        }
    }

    return (
        <div className='header'>
            {/* Logo */}
            <div className='companyInfo' onClick={() => navigate('/')}>
                <img alt='company icon' className='siteIcon' src={require(`../../media/FotF icon.png`)}/>
                <h1 className='siteName'>Friends of the Thread</h1>
            </div>

            {/* Buttons */}
            <div className='navButtons'>
                {/* Account Button */}
                <div className='accountbutton' onClick={() => loggedIn ? navigate('/account') : navigate('/login')}>
                    <p className='smalltext'>Welcome, {name}!</p>
                    <p className='largetext'>{loggedIn? 'Account Info' : 'Sign In'}</p>
                </div>

                {/* Basket Button */}
                <div className='basketbutton' onClick={() => navigate('/basket')}>
                    <p className='smalltext'>Your Basket</p>
                    <div className='basketCounter'>
                        <img alt='basket' className='basketicon' src={require(`../../media/basket icon.png`)}/>
                        <p className='counter'>{basketTotal}</p>
                    </div>
                </div>

                {/* Logout Button */}
                {loggedIn &&
                <div className='logoutbutton' onClick={handleLogout}>
                    <p className='logtext'>Sign Out</p>
                </div>}
            </div>
        </div>
    )
}