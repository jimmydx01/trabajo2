export class Empleado {
    // se ejecuta al instanciar la clea y crea los atributos con this
    constructor() {
      this.id = "";
      this.grabar = true;
      this.url = "http://localhost:3000/empleados";
    }
  
    obtenerEmpleados() {
      fetch(this.url)
       .then((res) => res.json())
       .then((empleados) => {
         console.log(empleados);
         let filas = "";
         empleados.forEach((empleado) => {
           // destructuring: descomponer un objeto en sus atributos
           let { id, nombre, cedula, descripcionc, descripciond, sueldo, estado } = empleado;
           filas += ` <tr>
          <td>${id}</td>
          <td>${nombre}</td>
          <td>${cedula}</td>
          <td>${descripcionc}</td>
          <td>${descripciond}</td>
          <td>${sueldo}</td>
          <td>${estado ? "Activo" : "Inactivo"}</td>
          <td>
            <button type="button" class="btn btn-edit" id="btn-edit" data-id="${id}">✏️</button>
            <button type="button" class="btn btn-delete" id="btn-delete" data-id="${id}">❌</button>
          </td>
        </tr>
          `;

         });
         //console.log(filas);
         document.getElementById("detalle-empleados").innerHTML = filas;
         

         // eliminar
         const btnsDelete = document.querySelectorAll(".btn-delete");
         //console.log(btnsDelete);
         btnsDelete.forEach((btn) => {
           btn.addEventListener("click",async (e) => {
             console.log(btn.dataset.id, e.target.dataset.id);
             console.log("eliminando...");
             await this.eliminarEmpleado(e.target.dataset.id);
           });
         });
         // editar
         const $btnsEdit = document.querySelectorAll(".btn-edit");
         $btnsEdit.forEach((btn) => {
           btn.addEventListener("click",async (e) => {
             console.log(e.target.dataset.id);
             this.id = e.target.dataset.id;
             let { nombre, cedula, cargoID, departamentoID, sueldo, estado } = await this.obtenerEmpleado(this.id);
             document.getElementById("nombre").value = nombre;
             document.getElementById("cedula").value = cedula;
             document.getElementById("cargoop").value = cargoID;
             document.getElementById("departamentoop").value = departamentoID;
             document.getElementById("sueldo").value = sueldo;
             document.getElementById("activo").checked = estado;
             document.getElementById("enviar").innerHTML = "Actualizar";
             console.log(nombre, cedula, cargoID, departamentoID, sueldo, estado);
             this.grabar = false;
           });
         });
       })
       .catch((err) => console.log("error:=>",err))
    }

    obtenerCargos(){
      fetch(this.url = "http://localhost:3000/cargos")
       .then((res) => res.json())
       .then((cargos) => {
        let op = "";
        cargos.forEach((cargo) => {
          let { id, descripcionc, estado } = cargo;
          document.getElementById("cargoop").innerHTML += `<option value="${id}">${descripcionc}</option>`;
          // console.log(cargos);
          // console.log("mira", id, descripcion);
        });
        
       })
    }

    obtenerDepartamentos(){
      fetch(this.url = "http://localhost:3000/departamento")
      .then((res) => res.json())
      .then((departamentos) => {
        let op1 = "";
        departamentos.forEach((departamento) => {
         let { id, descripciond, estado } = departamento;
         op1 += `<option value="${id}">${descripciond}</option>`;
        });
        document.getElementById("departamentoop").innerHTML = op1;
      })
    }
  
    async obtenerEmpleado(id) {
      const res = await fetch(`${this.url = "http://localhost:3000/empleados"}/${id}`)
      const dato = await res.json();  
      console.log(dato[0]);
      return dato[0]; 
    }
  
    async eliminarEmpleado(id) {
      const res = await fetch(`${this.url = "http://localhost:3000/empleados"}/${id}`, { method: "delete" });
      this.obtenerEmpleados();
    }
    
    async insertarDatos(empleado) {
      const res= await fetch(this.url = "http://localhost:3000/empleados", { method: "post", body: empleado });
      console.log(res);
      this.obtenerEmpleados()
      return true
    }
                      
    async modificarDatos(empleadoMod, id) {
      try{
          const res = await fetch(`${this.url = "http://localhost:3000/empleados"}/${id}`, { method: "put",body:empleadoMod });
          this.obtenerEmpleados();
          document.getElementById("enviar").innerHTML = "Insertar";
          this.grabar = true;
  
      } catch (error) {
         console.log("error: ", error);
      }
    }
  
    // fin de la clase cargo
  }