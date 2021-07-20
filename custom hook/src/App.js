import React, { useState, useEffect } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import { fetchTasks } from './lib/api';
import useHttp from './hooks/use-http';

function App() {
    const [tasks, setTasks] = useState([]);
    const { isLoading, error, sendRequest } = useHttp(fetchTasks, true);

    console.log('APP RUNNING', isLoading, error, tasks);

    useEffect(() => {
        console.log('USE_EFFECT');
        const dataTransformer = data => {
            const loadedTasks = [];
            for (const taskKey in data) {
                loadedTasks.push({ id: taskKey, text: data[taskKey].text });
            }
            setTasks(loadedTasks);
        };

        sendRequest(dataTransformer);
    }, [sendRequest]);

    const addTaskHandler = newTask => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    return (
        <React.Fragment>
            <NewTask onAdd={addTaskHandler} />
            <Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
        </React.Fragment>
    );
}

export default App;
