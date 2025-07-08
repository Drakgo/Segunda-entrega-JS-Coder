// Funciones Constructoras
function Solicitud(nombre, edad, especialidad) {
  this.nombre = nombre;
  this.edad = edad;
  this.especialidad = especialidad;
}

Solicitud.prototype.obtenerResumen = function () {
  return `${this.nombre} (${this.edad} años) - Especialidad: ${this.especialidad}`;
};

// Uso de DOM
const form = document.getElementById("registroForm");
const lista = document.getElementById("listaSolicitudes");
const selectEspecialidad = document.getElementById("especialidad");
const btnBorrar = document.getElementById("borrarTodo");

// Uso de Array
const especialidades = [
  "Cardiología",
  "Pediatría",
  "Traumatología",
  "Dermatología",
  "Gastroenterología"
];

especialidades.forEach((esp) => {
  const option = document.createElement("option");
  option.value = esp;
  option.textContent = esp;
  selectEspecialidad.appendChild(option);
});

// Uso de localStorage
let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];

function guardarEnLocalStorage() {
  localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
}

function mostrarSolicitudes() {
  lista.innerHTML = "";
  solicitudes.forEach((s, i) => {
    const item = document.createElement("li");
    item.textContent = s.obtenerResumen ? s.obtenerResumen() : `${s.nombre} (${s.edad} años) - ${s.especialidad}`;
    lista.appendChild(item);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const edad = parseInt(document.getElementById("edad").value);
  const especialidad = selectEspecialidad.value;

  if (!nombre || isNaN(edad)) return;

  const nueva = new Solicitud(nombre, edad, especialidad);
  solicitudes.push(nueva);
  guardarEnLocalStorage();
  mostrarSolicitudes();
  form.reset();
});

btnBorrar.addEventListener("click", () => {
  if (confirm("¿Deseas eliminar todas las solicitudes?")) {
    solicitudes = [];
    guardarEnLocalStorage();
    mostrarSolicitudes();
  }
});

mostrarSolicitudes(); // Mostrar al cargar