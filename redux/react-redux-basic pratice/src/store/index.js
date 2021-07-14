import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';

const store = configureStore({
    reducer: { counter: counterReducer, auth: authReducer }, // a map of reducer, 之後在 useSelector 取用時需改為 state.counter
});

export default store;
