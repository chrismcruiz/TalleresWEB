const paises = document.getElementById('paises');
const selectDptos = document.getElementById('selectDptos');
const selectMun = document.getElementById('selectMun');

const fillSelects = (data) => {
  selectDptos.parentElement.classList.remove('disabled');
  let dptos = [];
  data.forEach((d) => dptos.push(d.departamento));
  dptos = [...new Set(dptos)].sort();
  const fragment = document.createDocumentFragment();
  dptos.forEach((dpto) => {
    const option = document.createElement('OPTION');
    option.textContent = dpto;
    fragment.append(option);
  });
  selectDptos.append(fragment);
  selectDptos.addEventListener('change', () => {
    const municipios = [];
    selectMun.length = 1;
    selectMun.parentElement.classList.remove('disabled');
    data.forEach((i) => {
      if (i.departamento === selectDptos.value) municipios.push(i.municipio);
    });
    municipios.sort();
    const fragment2 = document.createDocumentFragment();
    municipios.forEach((mun) => {
      const option = document.createElement('OPTION');
      option.textContent = mun;
      fragment2.append(option);
    });
    selectMun.append(fragment2);
  });
};

paises.addEventListener('change', () => {
  axios({
    method: 'GET',
    url: 'https://www.datos.gov.co/resource/xdk5-pm3f.json',
  }).then((res) => fillSelects(res.data));
});
