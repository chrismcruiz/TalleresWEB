//Cargar JSON
document.addEventListener('DOMContentLoaded', (e) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');

    xhr.addEventListener('load', (data) => {
        const dataJSON = JSON.parse(data.target.response);
        crearTabla(dataJSON);
    })
    xhr.send();
})

//Generar tabla
function crearTabla(json) {
    const tbody = document.getElementById('tbody');

    for (let i = 0; i < json.length; i++) { //Número de fila
        const tr = document.createElement('TR');
        for (j in json[i]) { //Nombres de columnas
            const td = document.createElement('TD');
            if (typeof json[i][j] == 'object') {
                for (z in json[i][j]) {
                    const td = document.createElement('TD');
                    if (typeof json[i][j][z] == 'object') {
                        for (k in json[i][j][z]) {
                            const td = document.createElement('TD');
                            td.textContent = json[i][j][z][k];
                            tr.appendChild(td);
                        }
                    } else {
                        td.textContent = json[i][j][z];
                        tr.appendChild(td);
                    }
                }
            } else {
                td.textContent = json[i][j];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    }
};

//Filtrado
const buscador = document.getElementById('search');
const trs = document.getElementsByTagName('tr');

buscador.addEventListener('keyup', (e) => {
    for (let i = 3; i < trs.length; i++) {
        visible = false;
        const tds = trs[i].getElementsByTagName('td');
        for (let j = 0; j < tds.length; j++) {
            if (tds[j].textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1) {
                visible = true;
            }
        }
        if (visible === true) {
            trs[i].style.display = "";
          } else {
            trs[i].style.display = "none";
          }
    }
});

// <!-- <script>
// $("#check1").click(function () {
//     $("#check2").show();
// });
// $("#check2").click(function () {
//     $("#ing").show();
// });
// </script> -->

