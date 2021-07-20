import { useState } from 'react';
import InputField from './InputField/InputField';

const SimpleInput = props => {
    /* name input */
    const [enteredName, setEnteredName] = useState('');
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);

    const enteredNameIsValid = enteredName.trim() !== '';
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

    /* email input */
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

    const enteredEmailIsValid = enteredEmail.trim() !== '';
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

    let formIsValid = false;
    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = event => {
        event.preventDefault();
        setEnteredNameTouched(true);
        setEnteredEmailTouched(true);

        if (!enteredNameIsValid || !enteredEmailIsValid) {
            return;
        }

        console.log(enteredName, enteredEmail);
        setEnteredName('');
        setEnteredEmail('');
        setEnteredNameTouched(false);
        setEnteredEmailTouched(false);
    };

    return (
        <form onSubmit={formSubmissionHandler}>
            <InputField
                inputValue={enteredName}
                setInputValue={setEnteredName}
                setTouched={setEnteredNameTouched}
                inputLabel={'Name'}
                inputIsValid={!nameInputIsInvalid}
            />
            <InputField
                inputValue={enteredEmail}
                setInputValue={setEnteredEmail}
                setTouched={setEnteredEmailTouched}
                inputLabel={'Email'}
                inputIsValid={!emailInputIsInvalid}
            />
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
