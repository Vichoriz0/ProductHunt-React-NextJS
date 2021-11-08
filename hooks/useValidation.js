import React, { useState, useEffect } from 'react'

const useValidation = (initialState, validate, fn) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if( submitForm ) {
            const noErrors = (Object.keys(errors).length === 0);
            if( noErrors )
                fn();   // Función que se ejecuta en el componente

            setSubmitForm(false);
        }
    }, [submitForm]);

    // Validar mientras el usuario escribe
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    // Submit del formulario
    const handleSubmit = e => {
        e.preventDefault();

        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitForm(true);
    };

    return {
        values,
        errors,
        submitForm,
        handleChange,
        handleSubmit
    };
}
 
export default useValidation;