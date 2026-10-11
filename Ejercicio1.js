const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function calcularComision(montoVentas, porcentajeComision = 5) {
    return montoVentas * (porcentajeComision / 100);
}

rl.question('Ingrese el monto total de ventas: ', (ventas) => {
    const montoVentas = parseFloat(ventas);

    if (isNaN(montoVentas) || ventas.trim() === '') {
        console.log('Error: debe ingresar un monto de ventas válido.');
        rl.close();
        return;
    }

    rl.question('Ingrese el porcentaje de comisión (ENTER para usar 5%): ', (porcentaje) => {
        let porcentajeComision;

        if (porcentaje.trim() === '') {
            porcentajeComision = undefined;
        } else {
            porcentajeComision = parseFloat(porcentaje);

            if (isNaN(porcentajeComision)) {
                console.log('Error: el porcentaje debe ser numérico.');
                rl.close();
                return;
            }
        }

        const comision = calcularComision(montoVentas, porcentajeComision);

        console.log(`La comisión del vendedor es: $${comision.toFixed(2)}`);

        rl.close();
    });
});
