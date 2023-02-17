import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteDatabaseBasket, checkout } from "../../utils/basket";
import { clearBasket } from "../../views/basket/basketSlice";
import './paymentform.css';

export const Paymentform = (props) => {
    const [inProgress, setInProgress] = useState(false);
    const basket = props.basket;
    const basketTotal = props.basketTotal;
    const elements = useElements();
    const stripe = useStripe();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInProgress(true);

        if(!stripe || !elements){
            setInProgress(false);
            return;
        }
        // Create payment intent on server.
        const {error: backendError, clientSecret} = await fetch('http://localhost:3000/create-payment-intent', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentMethodType: 'card',
                currency: 'gbp',
                items: basket}),
        }).then(r => r.json());

        if(backendError){
            window.alert(backendError.message);
            console.log(backendError.message);
            setInProgress(false);
            return;
        }

        // Confirm payment on client.

        const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(
            clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            }
        )

        if(stripeError) {
            window.alert(stripeError.message);
            console.log(stripeError.message);
            setInProgress(false);
            return;
        }

        // If successful payment
        if(paymentIntent.status === 'succeeded'){
            window.alert(`Payment Successful!`)
            const checkoutRes = await checkout(sessionStorage.getItem('loggedUserID'), new Date().toLocaleString(), basketTotal);
            if(checkoutRes.ok){
                const jsonResponse = await checkoutRes.json();
                console.log("Order Completed");
                deleteDatabaseBasket(sessionStorage.getItem("loggedUserID"));
                dispatch(clearBasket());
                window.alert(jsonResponse);
                navigate('/');
            } else {
            window.alert(checkout.message)
        }
        }
    }

    return (
        <form className="paymentform" onSubmit={handleSubmit}>
            <CardElement id="card-element" />
            <button className="checkoutButton" disabled={inProgress}>Pay Now!</button>
        </form>
    )
}