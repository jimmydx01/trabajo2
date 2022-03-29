"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmpleados = exports.deleteEmpleados = exports.getEmpleado = exports.createEmpleados = exports.getEmpleados = void 0;
const database_1 = require("../bd/database");
const conection = new database_1.Coneccion();
function getEmpleados(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield conection.getConneccion();
            //const empleados = await conn.query("SELECT * FROM tb_empleados, tb_cargo, tb_departamento WHERE tb_empleados.cargoID = tb_cargo.id AND tb_empleados.departmamentoID = tb_departamento.id");
            const empleados = yield conn.query("SELECT tbe.id, tbe.nombre, tbe.cedula, tbe.cargoID, tbe.departamentoID, tbe.sueldo, tbe.estado, tbe.create_at, tbc.descripcionc, tbd.descripciond FROM tb_empleados tbe, tb_cargo tbc, tb_departamento tbd WHERE tbe.cargoID = tbc.id AND tbe.departamentoID = tbd.id");
            return res.json(empleados[0]);
        }
        catch (err) {
            console.log(err);
        }
        // console.log(res);
    });
}
exports.getEmpleados = getEmpleados;
;
function createEmpleados(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const modEmpleados = req.body;
            console.log(modEmpleados);
            const conn = yield conection.getConneccion();
            const empleados = yield conn.query("INSERT INTO tb_empleados SET ?", [modEmpleados]);
            res.json({ msg: "Departamento insertado Satisfactoriamente", empleados: modEmpleados });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createEmpleados = createEmpleados;
;
function getEmpleado(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const conn = yield conection.getConneccion();
        const empleados = yield conn.query("SELECT * FROM tb_empleados WHERE id = ?", [id]);
        //console.log(req.params.cargoId,id);
        //res.json(req.params);
        res.json(empleados[0]);
    });
}
exports.getEmpleado = getEmpleado;
;
function deleteEmpleados(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        console.log(req.params);
        const conn = yield conection.getConneccion();
        yield conn.query("DELETE FROM tb_empleados WHERE id = ?", [id]);
        res.json({
            message: "Empleado eliminado",
            id,
        });
    });
}
exports.deleteEmpleados = deleteEmpleados;
;
function updateEmpleados(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const modEmpleados = req.body;
        const conn = yield conection.getConneccion();
        yield conn.query("UPDATE tb_empleados set ? WHERE id = ?", [modEmpleados, id]);
        res.json({
            message: "Empleado actualizado",
            modEmpleados,
        });
    });
}
exports.updateEmpleados = updateEmpleados;
;
