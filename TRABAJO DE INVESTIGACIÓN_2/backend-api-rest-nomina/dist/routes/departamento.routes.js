"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamento_controllers_1 = require("../controllers/departamento.controllers");
const router = (0, express_1.Router)();
router.route("/")
    .get(departamento_controllers_1.getDepartamentos)
    .post(departamento_controllers_1.createDepartamento);
router.route("/:id")
    .get(departamento_controllers_1.getDepartamento)
    .delete(departamento_controllers_1.deleteDepartamento)
    .put(departamento_controllers_1.updateDepartamento);
exports.default = router;
