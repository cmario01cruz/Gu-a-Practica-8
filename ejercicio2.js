const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function calcularCostoTotal(tarifaSeguro = 15, ...pesosPaquetes) {
    let pesoTotal = 0;

    for (const peso of pesosPaquetes) {
        pesoTotal += peso;
    }

    const costoTransporte = pesoTotal * 3.50;

    return costoTransporte + tarifaSeguro;
}


function imprimirCotizacion(cliente, totalCobro) {
    console.log('\n===== COTIZACIÓN DE ENVÍO =====');
    console.log(`Cliente: ${cliente}`);
    console.log(`Total a pagar: $${totalCobro.toFixed(2)}`);
    console.log('===============================');
}


rl.question('Ingrese el nombre del cliente: ', (cliente) => {

    rl.question('Ingrese el costo del seguro (ENTER para usar $15.00): ', (seguro) => {
        let tarifaSeguro;

        if (seguro.trim() === '') {
            tarifaSeguro = undefined;
        } else {
            tarifaSeguro = parseFloat(seguro);

            if (isNaN(tarifaSeguro) || tarifaSeguro < 0) {
                console.log('Error: ingrese una tarifa de seguro válida.');
                rl.close();
                return;
            }
        }

        const pesos = [];
        let contador = 0;

        function solicitarPeso() {
            if (contador < 3) {
                rl.question(`Ingrese el peso del paquete ${contador + 1} en kg: `, (respuesta) => {
                    const peso = parseFloat(respuesta);

                    if (isNaN(peso) || respuesta.trim() === '' || peso < 0) {
                        console.log('Error: ingrese un peso numérico válido.');
                        solicitarPeso();
                        return;
                    }

                    pesos.push(peso);
                    contador++;
                    solicitarPeso();
                });
            } else {
                const totalCobro = calcularCostoTotal(tarifaSeguro, ...pesos);

                imprimirCotizacion(cliente, totalCobro);

                rl.close();
            }
        }

        solicitarPeso();
    });
});
