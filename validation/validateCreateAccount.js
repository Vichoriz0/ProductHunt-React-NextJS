export default function validateCreateAccount(values) {
    let errors = {};

    // Validar nombre del usuario
    if( !values.name ) {
        errors.name = 'El nombre es obligatorio';
    }

    // Validar email del usuario
    if( !values.email ) {
        errors.email = 'El correo es obligatorio';
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
        errors.email = 'El correo no es válido';
    }

    // Validar contraseña del usuario
    if( !values.password ) {
        errors.password = 'La contraseña es obligatoria';
    } else if( values.password.length < 6 ) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    return errors;
};