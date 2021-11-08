export default function validateNewProduct(values) {
    let errors = {};

    // Validar nombre del usuario
    if( !values.name ) {
        errors.name = 'El nombre del producto es obligatorio';
    }

    // Validar nombre de la empresa
    if( !values.company ) {
        errors.company = 'El nombre de la empresa es obligatorio';
    }

    // Validar URL
    if( !values.url ) {
        errors.url = 'La URL es obligatoria';
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ) {
        errors.url = 'La URL no es válida';
    }

    // Validar descripción del producto
    if( !values.description ) {
        errors.description = 'Agrega una descripción de tu producto';
    }

    return errors;
};