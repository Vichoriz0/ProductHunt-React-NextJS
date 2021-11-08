export default function validateLogIn(values) {
    let errors = {};

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