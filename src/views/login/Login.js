import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/authentication';
import { updateDatabaseBasket } from '../../utils/basket';
import { selectBasket, updateLocalBasket } from '../basket/basketSlice';
import { motion, AnimatePresence } from 'framer-motion';
import './login.css';

export const Login = () => {
    const [isShown, setShown] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateBasket = useSelector(selectBasket).items;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginRes = await login(username, password);
        if(loginRes.ok){
            const jsonResponse = await loginRes.json();
            sessionStorage.setItem("loggedIn", true);
            sessionStorage.setItem("loggedUserID", jsonResponse.userID);
            console.log("Logged in");
            setUsername('');
            setPassword('');
            navigate('/');
        } else {
        window.alert(loginRes.message);
        }

        // Updates database basket with items added pre login
        const updatedBasket = await updateDatabaseBasket(sessionStorage.getItem("loggedUserID"), stateBasket);
        if(updatedBasket.ok){
            const jsonResponse = await updatedBasket.json();
            // Assigns new combined basket to client state
            dispatch(updateLocalBasket(jsonResponse));
            } else {
            window.alert(updatedBasket.message);
        }
    }

    const handleExit = () => {
        setShown(false);
        setTimeout(() => navigate('/'), 200);
    };

    return(
        <AnimatePresence>
        {isShown &&
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="viewContainer" onClick={handleExit}>
        <div className="loginWindow" onClick={(e) => e.stopPropagation()}>
            
            <h2>Sign In</h2>
            <form className='formInputs' onSubmit={handleSubmit}>
            <label>Username:<br/>
            <input type="text" value={username} required onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>Password:<br/>
            <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <input className='button' type="submit" value="Submit"></input>
            </form>
            <span className='breakLine'></span>
            <p>Don't have an account yet?</p>
            <button className='button' onClick={() => navigate('/register')}>Create Account</button>


        </div>
        </motion.div>}
        </AnimatePresence>
    )
};