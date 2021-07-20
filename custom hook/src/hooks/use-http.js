import { useReducer, useCallback } from 'react';

function httpReducer(state, action) {
    if (action.type === 'SEND') {
        return {
            error: null,
            isLoading: true,
        };
    }

    if (action.type === 'SUCCESS') {
        return {
            error: null,
            isLoading: false,
        };
    }

    if (action.type === 'ERROR') {
        return {
            error: action.errorMessage,
            isLoading: false,
        };
    }

    return state;
}

const useHttp = (requestFunction, startWithPending) => {
    const [httpState, dispatch] = useReducer(httpReducer, {
        isLoading: startWithPending,
        error: null,
    });

    const sendRequest = useCallback(
        async (dataTransformer, taskText) => {
            try {
                dispatch({ type: 'SEND' });
                const tasks = await requestFunction(taskText);
                dataTransformer(tasks, taskText);
                dispatch({ type: 'SUCCESS' });
            } catch (err) {
                dispatch({
                    type: 'ERROR',
                    errorMessage: err.message || 'Something went wrong!',
                });
            }
        },
        [requestFunction]
    );

    return { ...httpState, sendRequest };
};

export default useHttp;
