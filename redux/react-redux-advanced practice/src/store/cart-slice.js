import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false,
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
    },
});

/* An action creator which returns a function, and redux will run the returned function when we dispatch it in component*/
export const sendCartData = cart => {
    /* return a function, redux will run this function */
    return async dispatch => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            })
        );

        try {
            const response = await fetch('https://react-create-myburger-879bb-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart),
            });

            if (!response.ok) {
                throw new Error('Sending cart data Failed');
            }

            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success',
                    message: 'Sending cart data successfully',
                })
            );
        } catch (e) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error',
                    message: 'Sending cart data failed',
                })
            );
        }
    };
};

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
