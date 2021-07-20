const InputField = ({ inputValue, setInputValue, setTouched, inputLabel, inputIsValid }) => {
    const InputChangeHandler = func => event => {
        console.log(event.target.value);
        func(event.target.value);
    };

    const InputBlurHandler = func => event => {
        console.log(event.target.value);
        func(true);
    };

    const inputClasses = inputIsValid ? 'form-control' : 'form-control invalid';

    return (
        <>
            <div className={inputClasses}>
                <label htmlFor={inputLabel}>Your {inputLabel}</label>
                <input
                    type='text'
                    value={inputValue}
                    id={inputLabel}
                    onChange={InputChangeHandler(setInputValue)}
                    onBlur={InputBlurHandler(setTouched)}
                />
            </div>
            {!inputIsValid && <p className='error-text'>{inputLabel} must not be empty</p>}
        </>
    );
};

export default InputField;
