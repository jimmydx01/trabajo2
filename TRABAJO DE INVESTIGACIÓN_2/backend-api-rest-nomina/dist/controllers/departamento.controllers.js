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
exports.updateDepartamento = exports.deleteDepartamento = exports.getDepartamento = exports.createDepartamento = exports.getDepartamentos = void 0;
const database_1 = require("../bd/database");
const conection = new database_1.Coneccion();
function getDepartamentos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield conection.getConneccion();
            const departamentos = yield conn.query("SELECT * FROM tb_departamento");
            return res.json(departamentos[0]);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getDepartamentos = getDepartamentos;
;
function createDepartamento(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const modDepartamento = req.body;
            console.log(modDepartamento);
            const conn = yield conection.getConneccion();
            const departamentos = yield conn.query("INSERT INTO tb_departamento SET ?", [modDepartamento]);
            res.json({ msg: "Departamento insertado Satisfactoriamente", departamento: modDepartamento });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createDepartamento = createDepartamento;
;
function getDepartamento(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const conn = yield conection.getConneccion();
        const departamento = yield conn.query("SELECT * FROM tb_departamento WHERE id = ?", [id]);
        //console.log(req.params.cargoId,id);
        //res.json(req.params);
        res.json(departamento[0]);
    });
}
exports.getDepartamento = getDepartamento;
;
function deleteDepartamento(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        console.log(req.params);
        const conn = yield conection.getConneccion();
        yield conn.query("DELETE FROM tb_departamento WHERE id = ?", [id]);
        res.json({
            message: "departamento eliminado",
            id,
        });
    });
}
exports.deleteDepartamento = deleteDepartamento;
;
function updateDepartamento(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const modDepartamento = req.body;
        const conn = yield conection.getConneccion();
        yield conn.query("UPDATE tb_departamento set ? WHERE id = ?", [modDepartamento, id]);
        res.json({
            message: "Departamento actualizado",
            modDepartamento,
        });
    });
}
exports.updateDepartamento = updateDepartamento;
;
