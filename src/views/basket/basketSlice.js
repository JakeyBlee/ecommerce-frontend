import { createSlice } from "@reduxjs/toolkit";

if(!sessionStorage.basket){
    sessionStorage.setItem("basket", JSON.stringify([]));
};

const options = {
    name: 'basket',
    initialState: {
        items: JSON.parse(sessionStorage.getItem("basket"))
    },
    reducers: {
        updateLocalBasket: (state, action) => {
            state.items = action.payload;
            sessionStorage.setItem("basket", JSON.stringify(state.items));
        },
        addOneToBasket: (state, action) => {
            // If item doesnt exist in basket
            if(state.items.filter(item => item.id === action.payload.id).length === 0){
                state.items = [...state.items, {id: action.payload.id, cost: action.payload.cost, quantity: 1, image: action.payload.image}];
            } else {
                // If one of item already present
                const index = state.items.findIndex(item => item.id === action.payload.id);
                state.items[index].quantity += 1;
            }
            sessionStorage.setItem("basket", JSON.stringify(state.items));
        },
        removeOneFromBasket: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            state.items[index].quantity -= 1;
            if(state.items[index].quantity === 0){
                // If new quantity warrants deletion
                state.items.splice(index, 1);
            }
            sessionStorage.setItem("basket", JSON.stringify(state.items));
        },
        removeAllFromBasket: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            state.items.splice(index, 1);
            sessionStorage.setItem("basket", JSON.stringify(state.items));
        },
        clearBasket: (state, action) => {
            state.items = [];
            sessionStorage.setItem("basket", JSON.stringify(state.items));
        },
    },
};

const basketSlice = createSlice(options);

export const selectBasket = (state) => state.basket;
export const { updateLocalBasket, addOneToBasket, removeOneFromBasket, removeAllFromBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;