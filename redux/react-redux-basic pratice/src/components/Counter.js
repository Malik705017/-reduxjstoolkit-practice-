import { useSelector, useDispatch } from 'react-redux'; //select a part of state from store

import { counterActions } from '../store/counter';
import classes from './Counter.module.css';

const Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.counter);
    const show = useSelector(state => state.counter.showCounter);

    const incrementHandler = () => {
        dispatch(counterActions.increment());
    };
    const decrementHandler = () => {
        dispatch(counterActions.decrement());
    };
    const toggleCounterHandler = () => {
        dispatch(counterActions.toggle());
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {show && <div className={classes.value}>{counter}</div>}
            <>
                <button onClick={incrementHandler}>increment</button>
                <button onClick={decrementHandler}>decrement</button>
            </>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
