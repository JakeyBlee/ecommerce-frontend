import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { changePassword } from '../../utils/authentication';
import { motion, AnimatePresence } from 'framer-motion';
import './account.css';

export const Account = () => {
    const [isShown, setShown] = useState(true);
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password === checkPassword){
            const res = await changePassword(sessionStorage.getItem('loggedUserID'), password);
            const jsonResponse = await res.json();
            if(res.ok){
                setPassword('');
                setCheckPassword('');
                setShowChangePassword(false);
                window.alert(jsonResponse);
            } else {
                console.log(res);
                console.log(jsonResponse);
                window.alert(jsonResponse);
            }
        } else {
            window.alert("Whoops! Those passwords don't match!");
        }
    }

    const handleExit = () => {
        setShown(false);
        setTimeout(() => navigate('/'), 200);
    };

    return (
        <AnimatePresence>
        {isShown &&
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="viewContainer" onClick={handleExit}>
        <div className="account" onClick={(e) => e.stopPropagation()}>
            
            <h2>Account Information</h2>
            <h3>Currently logged in as: {sessionStorage.getItem('firstName')} {sessionStorage.getItem('lastName')}</h3>
            <div className="accountButtons">
                <button className="accountButton" onClick={() => navigate('/account/orders')}>View Orders</button>
                {!showChangePassword && <button className="accountButton" onClick={() => setShowChangePassword(true)}>Change Password</button>}
            </div>
            {showChangePassword && <form className='formInputs' onSubmit={handleSubmit}>
                <label>New Password:<br/>
                    <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label>Confirm New Password:<br/>
                    <input type="password" value={checkPassword} required onChange={(e) => setCheckPassword(e.target.value)}/>
                </label>
                <input className='button' type="submit" value="Submit"></input>
            </form>}
            <button className="backButton" onClick={() => navigate(-1)}>Back</button>

        </div>
        </motion.div>}
        </AnimatePresence>
    )
};