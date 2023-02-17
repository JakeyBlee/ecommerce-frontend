import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../utils/authentication';
import { motion, AnimatePresence } from 'framer-motion';
import './login.css';

export const Register = () => {
    const [isShown, setShown] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        if(password === checkPassword){
            const res = await register(username, password, firstName, lastName);
            const jsonResponse = await res.json();
            if(res.ok){
                setUsername('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setCheckPassword('');
                navigate('/login');
                window.alert(jsonResponse.message);
            } else {
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

    return(
        <AnimatePresence>
        {isShown &&
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="viewContainer" onClick={handleExit}>
        <div className="loginWindow" onClick={(e) => e.stopPropagation()}>
            
            <h2>Create Account</h2>
            <form className='formInputs' onSubmit={handleCreate}>
            <label>Username:<br/>
            <input type="text" value={username} required onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <div className='nameInputs'>
                <label className='nameInput'>First Name:<br/>
                <input type="text" value={firstName} required onChange={(e) => setFirstName(e.target.value)}/>
                </label>
                <label className='nameInput'>Last Name:<br/>
                <input type="text" value={lastName} required onChange={(e) => setLastName(e.target.value)}/>
                </label>
            </div>
            <label>Password:<br/>
            <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <label>Confirm Password:<br/>
            <input type="password" value={checkPassword} required onChange={(e) => setCheckPassword(e.target.value)}/>
            </label>
            <input className='button' type="submit" value="Submit"></input>
            </form>
            <span className='breakLine'></span>
            <p>Already have an account?</p>
            <button className='button' onClick={() => navigate('/login')}>Log In</button>


        </div>
        </motion.div>}
        </AnimatePresence>
    )
};