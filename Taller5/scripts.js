var inputLeft = document.getElementById("input-left");
var inputRight = document.getElementById("input-right");
var thumbLeft = document.querySelector(".slider > .thumb.left");
var thumbRight = document.querySelector(".slider > .thumb.right");
var range = document.querySelector(".slider > .range");

const form = document.getElementById('form');
const campos_disabled = Array.from(document.querySelectorAll('.disabled'));

form.addEventListener('click', (e) => {
    if (e.target.value == 'si') {
        for (i in campos_disabled) {
            campos_disabled[i].removeAttribute('disabled');
        }
    }
    if (e.target.value == 'no') {
        for (i in campos_disabled) {
            campos_disabled[i].setAttribute('disabled', "");
        }
    }
})

function validar25caracteres(valinput){
    var retorno = false;
    if (valinput == ""){
        alert("Debe escribir un nombre y un apellido.");
    } else if (valinput.length > 25) {
        alert("El nombre y apellido debe tener como máximo 25 caracteres.");
    } else {retorno = true;}
    return retorno;
};

function validarClave(valinput){
    var retorno = false;
    if (valinput == ""){
        alert("Debe ingresar una contraseña.");
    } else if (valinput.length < 15){
        alert("La contraseña debe tener al menos 15 caracteres.");
    } else if (valinput.length > 20){
        alert("La contraseña debe tener máximo 20 caracteres.");
    } else if (valinput.search(/[A-Z]/)<0){
        alert("La contraseña debe tener al menos un caracter en mayúscula.");
    } else if (valinput.search(/[0-9]/)<0){
        alert("La contraseña debe tener al menos un número.");
    } else if (valinput.search(/[#,%,/,&]/)<0){
        alert("La contraseña debe contener al menos uno de los siguientes caracteres: #,%,/,&.");
    } else {retorno = true};
    return retorno;
};

function validarCampos() {
    var retorno = false;
    var nombre = document.getElementById("nombre");
    retorno = validar25caracteres(nombre.value);
    var apellido = document.getElementById("apellido");
    retorno = validar25caracteres(apellido.value);
    var direccion = document.getElementById("direccion").value.toLowerCase();
    if(!(direccion.startsWith("cll"))&&!direccion.startsWith("cra")&&!(direccion.startsWith("av"))&&!(direccion.startsWith("anv"))&&!direccion.startsWith("trans")){
        alert("la direccion debe comenzar con cll, cra, av, anv o trans.");
    } else {retorno=true};
    var username = document.getElementById("username").value;
    if (username == ""){
        alert("Debe ingresar un usuario.");
    } else if (username.length < 10){
        alert("El usuario debe tener al menos 10 caracteres.");
    } else if (usuario.length > 20){
        alert("El usuario debe tener máximo 20 caracteres.");
    } else if (!(usuario.search(/[#,%,/,&]/)<0)){
        alert("El usuario no puede contener caracteres especiales.");
    } else {retorno=true};
    var clave = document.getElementById("clave");
    retorno = validarClave(clave.value);
    var confirm_clave = document.getElementById("confirm_clave");
    if(confirm_clave.value!=clave.value){alert("Las contraseñas deben coincidir.");};
    var email = document.getElementById("email").value;
    if (email==""){alert("Debe ingresar un correo.")}
    else if(email.length > 120){alert("El correo debe tener máximo 120 caracteres.");};
    return retorno;
}

function setLeftValue() {
	var _this = inputLeft,
		min = parseInt(_this.min),
        max = parseInt(_this.max);

    _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);
  

	var percent = ((_this.value - min) / (max - min)) * 100;

	thumbLeft.style.left = percent + "%";
	range.style.left = percent + "%";
}
setLeftValue();

function setRightValue() {
	var _this = inputRight,
		min = parseInt(_this.min),
		max = parseInt(_this.max);

	_this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

	var percent = ((_this.value - min) / (max - min)) * 100;

	thumbRight.style.right = (100 - percent) + "%";
	range.style.right = (100 - percent) + "%";
}
setRightValue();

inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);

inputLeft.addEventListener("mouseover", function() {
	thumbLeft.classList.add("hover");
});
inputLeft.addEventListener("mouseout", function() {
	thumbLeft.classList.remove("hover");
});
inputLeft.addEventListener("mousedown", function() {
	thumbLeft.classList.add("active");
});
inputLeft.addEventListener("mouseup", function() {
	thumbLeft.classList.remove("active");
});

inputRight.addEventListener("mouseover", function() {
	thumbRight.classList.add("hover");
});
inputRight.addEventListener("mouseout", function() {
	thumbRight.classList.remove("hover");
});
inputRight.addEventListener("mousedown", function() {
	thumbRight.classList.add("active");
});
inputRight.addEventListener("mouseup", function() {
	thumbRight.classList.remove("active");
});



