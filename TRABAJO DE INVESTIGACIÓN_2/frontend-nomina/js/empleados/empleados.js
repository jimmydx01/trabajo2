import { Empleado } from "./componente.js";
// instanciamos cargo
const serEmpleado = new Empleado();
const d = document;
const $formEmpleado = d.getElementById("form-empleado");

d.addEventListener("DOMContentLoaded", serEmpleado.obtenerEmpleados());
d.addEventListener("DOMContentLoaded", serEmpleado.obtenerCargos());
d.addEventListener("DOMContentLoaded", serEmpleado.obtenerDepartamentos());
// delegacion de eventos
d.addEventListener("click", async (e) => {
  console.log(e.target);
  if (e.target.matches("#enviar")) {
    //alert("has hecho click")
    e.preventDefault();
    let $nombre = d.getElementById("nombre").value;
    let $cedula = d.getElementById("cedula").value;
    let $cargoID = d.getElementById("cargoop").value;
    let $departamentoID = d.getElementById("departamentoop").value;
    
    let $sueldo = d.getElementById("sueldo").value;
    let $estado = d.getElementById("activo").checked;

    console.log($nombre);
    console.log($cedula);
    console.log($cargoID);
    console.log($departamentoID);
    console.log($sueldo);

    if ($nombre.trim().length < 3 &&
        $cedula.trim().length < 3 &&
        $sueldo.trim().length < 3) {
      alert("Datos vacios o incompletos");
    } else {
      if (serEmpleado.grabar) {
        let id = Date.now();
        const empleado = { nombre: $nombre,
                           cedula: $cedula,
                           cargoID: $cargoID,
                           departamentoID: $departamentoID,
                           sueldo: $sueldo, 
                           estado: $estado };
        const empleadoJson = JSON.stringify(empleado);
        const res = await serEmpleado.insertarDatos(empleadoJson);
      } else {
        let id = serEmpleado.id;
        const empleado = { nombre: $nombre,
                           cedula: $cedula,
                           cargoID: $cargoID,
                           departamentoID: $departamentoID,
                           sueldo: $sueldo, 
                           estado: $estado };
        const empleadoModJson = JSON.stringify(empleado);
        const res = await serEmpleado.modificarDatos(empleadoModJson, serEmpleado.id);
      }
      $formEmpleado.reset();
    }
  }
});
