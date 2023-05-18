function buscar() {
    var departamento = document.getElementById('departamentoInput').value;

    var apiUrl = 'https://www.datos.gov.co/resource/ccvq-rp9s.json';

    if (departamento) {
        apiUrl += '?departamento=' + encodeURIComponent(departamento);
    }

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            mostrarTabla(data);
        })
        .catch(function(error) {
            console.log('Error:', error);
        });
}

function mostrarTabla(data) {
    var tablaBody = document.getElementById('tablaDatosBody');
    tablaBody.innerHTML = '';

    if (data.length === 0) {
        return;
    }

    var maxResults = Math.min(data.length, 10);

    for (var i = 0; i < maxResults; i++) {
        var fila = document.createElement('tr');
        var fecha = document.createElement('td');
        fecha.textContent = data[i].fechaobservacion;
        var valor = document.createElement('td');
        valor.textContent = data[i].valorobservado;
        var estacion = document.createElement('td');
        estacion.textContent = data[i].codigoestacion;
        var departamento = document.createElement('td');
        departamento.textContent = data[i].departamento;
        var municipio = document.createElement('td');
        municipio.textContent = data[i].municipio;

        fila.appendChild(fecha);
        fila.appendChild(valor);
        fila.appendChild(estacion);
        fila.appendChild(departamento);
        fila.appendChild(municipio);

        tablaBody.appendChild(fila);
    }
}
