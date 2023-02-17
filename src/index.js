import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { App } from './app/App';
import { Login } from './views/login/Login';
import { Register } from './views/login/Register';
import { Account } from './views/account/Account';
import { Orders } from './views/orders/Orders';
import { Order } from './views/order/Order';
import { Basket } from './views/basket/Basket';
import { Checkout } from './views/checkout/Checkout';
import { Shopview } from './views/shopview/Shopview';
import { Itemview } from './views/itemview/Itemview';
import { CheckItemExists } from './components/authenticators/CheckItemExists';
import { AuthenticatedRoute } from './components/authenticators/AuthenticatedRoute';
import { UnauthenticatedRoute } from './components/authenticators/UnauthenticatedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Shopview/>,
        children: [
          {
            path: '/:productId',
            element: <CheckItemExists><Itemview/></CheckItemExists>,
          },
          {
            path: '/account',
            element: <AuthenticatedRoute><Account /></AuthenticatedRoute>
          },
          {
            path: '/account/orders',
            element: <AuthenticatedRoute><Orders /></AuthenticatedRoute>
          },
          {
            path: '/account/orders/:orderId',
            element: <AuthenticatedRoute><Order /></AuthenticatedRoute>
          },
          {
            path: '/basket',
            element: <Basket />
          },
          {
            path: '/basket/checkout',
            element: <AuthenticatedRoute><Checkout /></AuthenticatedRoute>
          },
          {
            path: '/login',
            element: <UnauthenticatedRoute><Login /></UnauthenticatedRoute>
          },
          {
            path: '/register',
            element: <UnauthenticatedRoute><Register /></UnauthenticatedRoute>
          }
        ]
      }
    ]
  }
]);


(async () => {
  const { publishableKey } = await fetch(`/stripe-config`, {
    credentials: "include"
  }).then(res => res.json())
  const stripePromise = loadStripe(publishableKey);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router}/>
        </Elements>
      </Provider>
    </React.StrictMode>
  )
})();
