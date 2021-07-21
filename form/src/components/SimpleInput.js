import useInput from '../hooks/use-input';

const SimpleInput = props => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        resetValue: resetNameInput,
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        resetValue: resetEmailInput,
    } = useInput(value => value.includes('@'));

    let formIsValid = false;
    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = event => {
        event.preventDefault();
        nameBlurHandler();
        emailBlurHandler();

        if (formIsValid) {
            return;
        }

        console.log(enteredName, enteredEmail);
        resetNameInput();
        resetEmailInput();
    };

    const nameInputClasses = !nameInputHasError ? 'form-control' : 'form-control invalid';
    const emailInputClasses = !emailInputHasError ? 'form-control' : 'form-control invalid';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    value={enteredName}
                    id='name'
                    onChange={nameChangedHandler}
                    onBlur={nameBlurHandler}
                />
            </div>
            {nameInputHasError && <p className='error-text'>Name must not be empty</p>}
            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input
                    type='email'
                    value={enteredEmail}
                    id='email'
                    onChange={emailChangedHandler}
                    onBlur={emailBlurHandler}
                />
            </div>
            {emailInputHasError && <p className='error-text'>Please enter a valid email</p>}
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
