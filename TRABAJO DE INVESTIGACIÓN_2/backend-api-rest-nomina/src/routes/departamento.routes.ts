import { Router } from "express";
import { getDepartamentos, createDepartamento, getDepartamento, deleteDepartamento, updateDepartamento } from "../controllers/departamento.controllers";

const router = Router();
router.route("/")
    .get(getDepartamentos)
    .post(createDepartamento)

router.route("/:id")
    .get(getDepartamento)
    .delete(deleteDepartamento)
    .put(updateDepartamento)


export default router