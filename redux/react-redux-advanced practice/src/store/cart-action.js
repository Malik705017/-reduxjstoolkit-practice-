import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = cart => {
    return async dispatch => {
        try {
            const response = await fetch('https://react-create-myburger-879bb-default-rtdb.firebaseio.com/cart.json');
            if (!response.ok) {
                throw new Error('Could not fetch cart data');
            }
            const cartData = await response.json();
            dispatch(
                cartActions.replaceCart({
                    items:
                        cartData.items ||
                        [] /* if items is undefined (firebase does'nt have items property), set items = [] */,
                    totalQuantity: cartData.totalQuantity,
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

/* This is an action creator which returns a function, and redux will run the returned function when we dispatch it in component*/
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
