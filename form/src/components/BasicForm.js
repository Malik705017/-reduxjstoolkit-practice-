import useInput from '../hooks/use-input';

const isNotEmpty = value => value.trim() !== '';
const isEmail = value => value.includes('@');

const BasicForm = () => {
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandler: firstNameChangedHandler,
        inputBlurHandler: firstNameBlurHandler,
        resetValue: resetFirstNameInput,
    } = useInput(isNotEmpty);

    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        valueChangeHandler: lastNameChangedHandler,
        inputBlurHandler: lastNameBlurHandler,
        resetValue: resetLastNameInput,
    } = useInput(isNotEmpty);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        resetValue: resetEmailInput,
    } = useInput(isEmail);

    let formIsValid = false;
    if (enteredFirstNameIsValid && enteredEmailIsValid && enteredLastNameIsValid) {
        formIsValid = true;
    }

    const firstNameInputClasses = !firstNameInputHasError ? 'form-control' : 'form-control invalid';
    const lastNameInputClasses = !lastNameInputHasError ? 'form-control' : 'form-control invalid';
    const emailInputClasses = !emailInputHasError ? 'form-control' : 'form-control invalid';

    const formSubmissionHandler = event => {
        event.preventDefault();
        firstNameBlurHandler();
        lastNameBlurHandler();
        emailBlurHandler();

        if (!formIsValid) {
            return;
        }

        console.log(enteredFirstName, enteredLastName, enteredEmail);
        resetFirstNameInput();
        resetLastNameInput();
        resetEmailInput();
    };

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className='control-group'>
                <div className={firstNameInputClasses}>
                    <label htmlFor='first-name'>First Name</label>
                    <input
                        type='text'
                        id='first-name'
                        onChange={firstNameChangedHandler}
                        onBlur={firstNameBlurHandler}
                        value={enteredFirstName}
                    />
                    {firstNameInputHasError && <p className='error-text'>First name must not be empty</p>}
                </div>
                <div className={lastNameInputClasses}>
                    <label htmlFor='last-name'>Last Name</label>
                    <input
                        type='text'
                        id='last-name'
                        onChange={lastNameChangedHandler}
                        onBlur={lastNameBlurHandler}
                        value={enteredLastName}
                    />
                    {lastNameInputHasError && <p className='error-text'>Last name must not be empty</p>}
                </div>
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>E-Mail Address</label>
                <input
                    type='email'
                    id='email'
                    onChange={emailChangedHandler}
                    onBlur={emailBlurHandler}
                    value={enteredEmail}
                />
                {emailInputHasError && <p className='error-text'>Please enter a valid email</p>}
            </div>
            <div className='form-actions'>
                <button type='submit' disabled={!formIsValid}>
                    Submit
                </button>
            </div>
        </form>
    );
};

export default BasicForm;
