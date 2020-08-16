// Filtrado de tabla
const buscador = document.getElementById('search');
const filtrarTabla = (rows) => {
  buscador.addEventListener('keyup', (e) => {
    rows.forEach((row) => {
      let visible = false;
      const columns = [...row.querySelectorAll('td')];
      columns.forEach((column) => {
        if (column.textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
          visible = true;
        }
      });
      if (visible) row.classList.toggle('disabled', '');
      else row.classList.add('disabled');
    });
  });
};

// Generar tabla
const tbody = document.getElementById('tbody');
const crearTabla = (json) => {
  const fragment = document.createDocumentFragment();
  json.forEach((person) => {
    const row = document.createElement('TR');
    const dataId = document.createElement('TD');
    const dataName = document.createElement('TD');
    const dataUser = document.createElement('TD');
    const dataEmail = document.createElement('TD');
    const dataStreet = document.createElement('TD');
    const dataSuite = document.createElement('TD');
    const dataCity = document.createElement('TD');
    const dataZip = document.createElement('TD');
    const dataLat = document.createElement('TD');
    const dataLng = document.createElement('TD');
    const dataPhone = document.createElement('TD');
    const dataWeb = document.createElement('TD');
    const dataCname = document.createElement('TD');
    const dataCp = document.createElement('TD');
    const dataBs = document.createElement('TD');
    dataId.textContent = person.id;
    dataName.textContent = person.name;
    dataUser.textContent = person.username;
    dataEmail.textContent = person.email;
    dataStreet.textContent = person.address.street;
    dataSuite.textContent = person.address.suite;
    dataCity.textContent = person.address.city;
    dataZip.textContent = person.address.zipcode;
    dataLat.textContent = person.address.geo.lat;
    dataLng.textContent = person.address.geo.lng;
    dataPhone.textContent = person.phone;
    dataWeb.textContent = person.website;
    dataCname.textContent = person.company.name;
    dataCp.textContent = person.company.catchPhrase;
    dataBs.textContent = person.company.bs;

    row.append(dataId);
    row.append(dataName);
    row.append(dataUser);
    row.append(dataEmail);
    row.append(dataStreet);
    row.append(dataSuite);
    row.append(dataCity);
    row.append(dataZip);
    row.append(dataLat);
    row.append(dataLng);
    row.append(dataPhone);
    row.append(dataWeb);
    row.append(dataCname);
    row.append(dataCp);
    row.append(dataBs);

    row.classList.add('row');
    fragment.append(row);
  });
  tbody.append(fragment);
  filtrarTabla([...document.querySelectorAll('.row')]);
};

// Cargar JSON
document.addEventListener('DOMContentLoaded', () => {
  axios({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/users',
  }).then((res) => crearTabla(res.data));
});
