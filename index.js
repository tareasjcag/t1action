const core=require('@actions/core');
try {
    const name= core.getInput('name');
    console.log(`Hola, mi nombre es: ${name}`);
    const edad= core.getInput('edad');
    console.log(`Tengo ${edad} años`);
    const apellido= core.getInput('apellido');
    console.log(`Y mi apellido es: ${apellido}`);
} catch (error) {
    core.setFailed(error.message);
}