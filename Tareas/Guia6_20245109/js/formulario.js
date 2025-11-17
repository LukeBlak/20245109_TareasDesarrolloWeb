const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotification");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

const idModal = document.getElementById("idModal");

let arrayPaciente = [];
let editando = false;
let indiceEdicion = -1;

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";
    editando = false;
    indiceEdicion = -1;

    buttonAgregarPaciente.innerHTML = '<i class="bi bi-person-plus-fill"></i> Guardar Datos';

    inputNombre.focus();
}

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
            ? "Hombre"
            : inputRdFemenino.checked == true
                ? "Mujer"
                : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        if (editando) {
            arrayPaciente[indiceEdicion] = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];
            mensaje.innerHTML = "Paciente actualizado correctamente";
        } else {
            arrayPaciente.push([nombre, apellido, fechaNacimiento, sexo, labelPais, direccion]);
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        }

        toast.show();
        limpiarForm();
        imprintPacientes();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
}

function imprimirFilas() {
    let $fila = "";

    arrayPaciente.forEach((element, index) => {
        $fila += `<tr>
                    <td scope="row" class="text-center fw-bold">${index + 1}</td>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td>${element[2]}</td>
                    <td>${element[3]}</td>
                    <td>${element[4]}</td>
                    <td>${element[5]}</td>
                    <td class="text-center">
                        <button id="idBtnEditar${index}" type="button" class="btn btn-primary btn-sm" title="Editar">
                            <i class="bi bi-pencil-square"></i>
                        </button>    
                        <button id="idBtnEliminar${index}" type="button" class="btn btn-danger btn-sm" title="Eliminar">
                            <i class="bi bi-trash3-fill"></i>
                        </button>
                    </td>
                </tr>`;
    });
    return $fila;
}

const imprintPacientes = () => {
    if (arrayPaciente.length === 0) {
        document.getElementById("idTablaPacientes").innerHTML = "No hay pacientes registrados";
        return;
    }

    let $table = `<div class="table-responsive">
                    <table class="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center" style="width:5%">#</th>
                                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                                <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                                <th scope="col" class="text-center" style="width:10%">Sexo</th>
                                <th scope="col" class="text-center" style="width:10%">País</th>
                                <th scope="col" class="text-center" style="width:25%">Dirección</th>
                                <th scope="col" class="text-center" style="width:10%">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${imprimirFilas()}
                        </tbody>
                    </table>
    </div>`;
    document.getElementById("idTablaPacientes").innerHTML = $table;

    escuchaBotones();
};

const escuchaBotones = () => {
    arrayPaciente.forEach((element, index) => {
        const btnEditar = document.getElementById(`idBtnEditar${index}`);
        if (btnEditar) {
            btnEditar.onclick = () => editarPaciente(index);
        }

        const btnEliminar = document.getElementById(`idBtnEliminar${index}`);
        if (btnEliminar) {
            btnEliminar.onclick = () => eliminarPaciente(index);
        }
    });
};

const editarPaciente = (index) => {
    const paciente = arrayPaciente[index];

    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    if (paciente[3] === "Hombre") {
        inputRdMasculino.checked = true;
    } else if (paciente[3] === "Mujer") {
        inputRdFemenino.checked = true;
    }

    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text === paciente[4]) {
            cmbPais.value = cmbPais.options[i].value;
            break;
        }
    }

    inputDireccion.value = paciente[5];

    editando = true;
    indiceEdicion = index;

    buttonAgregarPaciente.innerHTML = '<i class="bi bi-check-circle"></i> Actualizar Paciente';

    mensaje.innerHTML = "Editando paciente...";
    toast.show();

    inputNombre.focus();
}

const eliminarPaciente = (index) => {
    if (confirm("¿Estás seguro de que quieres eliminar este paciente?")) {
        arrayPaciente.splice(index, 1);
        mensaje.innerHTML = "Paciente eliminado correctamente";
        toast.show();
        imprintPacientes(); 

        if (editando && indiceEdicion === index) {
            limpiarForm();
        }
    }
};

let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        cmbPais.appendChild(option);
        contadorGlobalOption++; // Incrementar el contador

        mensaje.innerHTML = "País agregado correctamente";
        toast.show();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
}

buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
}

buttonAgregarPaciente.onclick = () => {
    addPaciente();
}

buttonMostrarPaciente.onclick = () => {
    imprintPacientes();
}

buttonAgregarPais.onclick = () => {
    addPais();
}

idModal.addEventListener("show.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

limpiarForm();