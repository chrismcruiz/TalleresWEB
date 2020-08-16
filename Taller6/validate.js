const form = document.getElementById('form');
const birthdate = document.getElementById('cumpleanos');
const edad = document.getElementById('age');
const password = document.getElementById('password');
const valpassword = document.getElementById('valpassword');
const username = document.getElementById('username');

const swc = document.getElementById('swc');
const swc2 = document.getElementById('swc2');
const diseases = document.getElementById('diseases');

// Objeto para validar que los campos estén correctos.
const validarCampos = {
  username: false,
  age: false,
  password: false,
  valpassword: false,
};

// Validar formulario.
const validateForm = () => {
  const formValues = Object.values(validarCampos);
  const valid = formValues.findIndex((value) => value === false);
  if (valid === -1) form.submit();
  else alert('¡Formulario Inválido!');
};

// Prevenir el comportamiento por defector del formulario en el submit y llamar a validar.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateForm();
});

// Función para obtener edad.
const getAge = (bd) => {
  const today = new Date();
  const birthDate = new Date(bd);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  edad.textContent = `Tienes ${age} año(s)`;
  validarCampos.age = true;
};

// Añadir o quitar clase disabled al span.
const toggleDisabled = (span, campo) => {
  if (campo) {
    span.classList.add('disabled');
  } else {
    span.classList.remove('disabled');
  }
};

// Validar usuario
const validateUsername = (user) => {
  // Cadena de texto alfanúmerica que puede tener _ y - con un largo de entre 3 a 16 caracteres.
  const usernameRegex = /^[a-z0-9_-]{3,16}$/;
  const span = username.nextElementSibling;
  if (usernameRegex.test(user)) {
    validarCampos.username = true;
    toggleDisabled(span, validarCampos.username);
  } else {
    validarCampos.username = false;
    toggleDisabled(span, validarCampos.username);
  }
};

// Validar contraseña
const validatePassword = (pass) => {
// Debe tener 1 letra minúscula, 1 letra mayúscula, 1 número y ser al menos de 8 carácteres de largo
  const passwordRegex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
  const span = password.nextElementSibling;
  if (passwordRegex.test(pass)) {
    validarCampos.password = true;
    toggleDisabled(span, validarCampos.password);
  } else {
    validarCampos.password = false;
    toggleDisabled(span, validarCampos.password);
  }
};

// Comparar contraseñas.
const comparePasswords = (valpass) => {
  const span = valpassword.nextElementSibling;
  if (validarCampos.password) {
    if (valpass !== password.value) {
      validarCampos.valpassword = false;
      span.classList.remove('disabled');
    } else {
      validarCampos.valpassword = true;
      span.classList.add('disabled');
    }
  }
};

birthdate.addEventListener('change', (e) => getAge(e.target.value));
username.addEventListener('change', (e) => validateUsername(e.target.value));
password.addEventListener('change', (e) => validatePassword(e.target.value));
valpassword.addEventListener('change', (e) => comparePasswords(e.target.value));

// Combo enfermedades.
swc.addEventListener('change', (e) => {
  if (e.target.checked) {
    swc2.parentElement.parentElement.classList.remove('disabled');
  } else {
    swc2.parentElement.parentElement.classList.add('disabled');
    diseases.classList.add('disabled');
    swc2.checked = false;
  }
});

swc2.addEventListener('change', (e) => {
  if (e.target.checked) diseases.classList.remove('disabled');
  else diseases.classList.add('disabled');
});
