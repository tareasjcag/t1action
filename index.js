const core = require('@actions/core');

try {
    // --- Obtener entradas ---
    const name = core.getInput('name');
    const edadInput = core.getInput('edad');
    const apellido = core.getInput('apellido');


    // --- Validar y convertir la edad ---
    const edad = parseInt(edadInput, 10);
    if (isNaN(edad) || edad < 0) {
        throw new Error('La edad debe ser un número positivo.');
    }

    // --- Función auxiliar para determinar si un año es bisiesto ---
    function esBisiesto(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // --- 1. Calcular el año de nacimiento ---

    // Primero, encontramos el año del último cumpleaños (el último 29 de febrero que ya pasó)
    let ultimoCumpleaños = new Date().getFullYear();
    const hoy = new Date();
    
    // Si hoy es antes del 29 de febrero de un año bisiesto, el último cumpleaños fue en el anterior año bisiesto.
    if (esBisiesto(ultimoCumpleaños) && (hoy.getMonth() < 1 || (hoy.getMonth() === 1 && hoy.getDate() < 29))) {
         ultimoCumpleaños--;
    }
    // Nos aseguramos de que el año del último cumpleaños sea bisiesto, retrocediendo si es necesario.
    while (!esBisiesto(ultimoCumpleaños)) {
        ultimoCumpleaños--;
    }

    // Segundo, calculamos el año de nacimiento retrocediendo 'edad - 1' años bisiestos.
    let anioNacimiento = ultimoCumpleaños;
    if (edad > 0) {
        let cumpleañosARetroceder = edad - 1;
        while (cumpleañosARetroceder > 0) {
            anioNacimiento--;
            if (esBisiesto(anioNacimiento)) {
                cumpleañosARetroceder--;
            }
        }
    }
    
    // --- 2. Calcular el año en que cumplirá 100 años ---
    let anioCentenario = anioNacimiento;
    let cumpleañosContados = 0;
    while (cumpleañosContados < 100) {
        anioCentenario++;
        if (esBisiesto(anioCentenario)) {
            cumpleañosContados++;
        }
    }

    // --- 3. Imprimir el mensaje final ---
    const mensaje = `${name} ${apellido} nació el 29 de febrero del año ${anioNacimiento} y cumplira 100 años el 29 de febrero de ${anioCentenario}`;
    console.log(mensaje);


    // --- Establecer la salida ---
    core.setOutput('multiplicacion', edad * 100); // Ejemplo de salida, puedes cambiarlo según tus necesidade

} catch (error) {
    core.setFailed(error.message);
}
