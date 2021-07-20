export const fetchTasks = async () => {
    const response = await fetch('https://react-create-myburger-879bb-default-rtdb.firebaseio.com/tasks.json');

    if (!response.ok) {
        throw new Error('Request failed!');
    }

    const data = await response.json();
    return data;
};

export const addTask = async taskText => {
    const response = await fetch('https://react-create-myburger-879bb-default-rtdb.firebaseio.com/tasks.json', {
        method: 'POST',
        body: JSON.stringify({ text: taskText }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Request failed!');
    }

    const data = await response.json();
    return data;
};
