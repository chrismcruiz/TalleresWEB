const paises = document.getElementById('paises');
const disableds = Array.from(document.querySelectorAll('.disabled'));
const selectDptos = document.getElementById('departamentos');
const selectMun = document.getElementById('municipios');

paises.addEventListener('change', (e) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.datos.gov.co/resource/xdk5-pm3f.json');

    xhr.addEventListener('load', (data) => {
        const dataJSON = JSON.parse(data.target.response);
        let dptos = [];

        for (i in dataJSON) {
            dptos.push(dataJSON[i]['departamento']);
        }

        let unique = [...new Set(dptos)].sort();

        for (i of unique) {
            const option = document.createElement('OPTION');
            option.textContent = i;
            option.value = `${i.toLowerCase()}`; 
            selectDptos.appendChild(option);
        }

        for (let i = 0; i < disableds.length / 2; i++) {
            disableds[i].classList.remove('disabled');
        }

        selectDptos.addEventListener('change', (e) => {
            const dptoselected = selectDptos.value;

            selectMun.length = 1;
            console.log(selectMun);
            let muni = [];

            for (i in dataJSON) {
                if (dataJSON[i].departamento.toLowerCase() == dptoselected) {
                    muni.push(dataJSON[i].municipio);
                }
            }
            muni.sort();
            for (i of muni) {
                const option = document.createElement('OPTION');
                option.textContent = i;
                selectMun.appendChild(option);
                // console.dir(selectMun.options);
            }

            for (let i = 2; i < disableds.length; i++) {
                disableds[i].classList.remove('disabled');
            }

            //Cargar el select municipios con Materialize
            $(document).ready(function () {
                $('select').formSelect();
            });
        })
        //Cargar el select departamentos con Materialize
        $(document).ready(function () {
            $('select').formSelect();
        });
    });
    xhr.send();
})

