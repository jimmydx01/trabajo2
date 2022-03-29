import { Router } from "express";
import { getEmpleados, createEmpleados, getEmpleado, deleteEmpleados, updateEmpleados } from "../controllers/empleados.controller";

const router = Router();
router.route("/")
    .get(getEmpleados)
    .post(createEmpleados)

router.route("/:id")
    .get(getEmpleado)
    .delete(deleteEmpleados)
    .put(updateEmpleados)


export default router
