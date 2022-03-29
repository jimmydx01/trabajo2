"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleados_controller_1 = require("../controllers/empleados.controller");
const router = (0, express_1.Router)();
router.route("/")
    .get(empleados_controller_1.getEmpleados)
    .post(empleados_controller_1.createEmpleados);
router.route("/:id")
    .get(empleados_controller_1.getEmpleado)
    .delete(empleados_controller_1.deleteEmpleados)
    .put(empleados_controller_1.updateEmpleados);
exports.default = router;
