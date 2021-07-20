import Section from '../UI/Section';
import TaskForm from './TaskForm';
import { addTask } from '../../lib/api';
import useHttp from '../../hooks/use-http';

const NewTask = ({ onAdd }) => {
    const { isLoading, error, sendRequest } = useHttp(addTask, false);
    console.log('NewTask RUNNING', isLoading, error);

    const dataTransformer = (taskData, taskText) => {
        console.log('taskData', taskData);
        const generatedId = taskData.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };
        onAdd(createdTask);
    };

    const onEnterTaskHandler = taskText => {
        sendRequest(dataTransformer, taskText);
    };

    return (
        <Section>
            <TaskForm onEnterTask={onEnterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
