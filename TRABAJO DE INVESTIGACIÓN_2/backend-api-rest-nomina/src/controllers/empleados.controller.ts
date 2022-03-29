import { Request, Response } from "express";
import { Coneccion } from "../bd/database";
import {Iempleados} from '../interface/Empleados';

const conection:Coneccion = new Coneccion();

export async function getEmpleados(req:Request, res:Response): Promise<Response | void> {
    try {
        const conn = await conection.getConneccion();
        //const empleados = await conn.query("SELECT * FROM tb_empleados, tb_cargo, tb_departamento WHERE tb_empleados.cargoID = tb_cargo.id AND tb_empleados.departmamentoID = tb_departamento.id");
        const empleados = await conn.query("SELECT tbe.id, tbe.nombre, tbe.cedula, tbe.cargoID, tbe.departamentoID, tbe.sueldo, tbe.estado, tbe.create_at, tbc.descripcionc, tbd.descripciond FROM tb_empleados tbe, tb_cargo tbc, tb_departamento tbd WHERE tbe.cargoID = tbc.id AND tbe.departamentoID = tbd.id");
        return res.json(empleados[0]);
    } catch (err) {
        console.log(err);
    }
    // console.log(res);
};

export async function createEmpleados(req: Request, res: Response) {
    try {
      const modEmpleados: Iempleados = req.body;
      console.log(modEmpleados);
      const conn = await conection.getConneccion();
      const empleados = await conn.query("INSERT INTO tb_empleados SET ?", [modEmpleados]);
      
      res.json({ msg: "Departamento insertado Satisfactoriamente", empleados: modEmpleados });
    } catch (err) {
      console.log(err);
    }
};

export async function getEmpleado(req: Request, res: Response) {
    const id = req.params.id;
    const conn = await conection.getConneccion();
    const empleados = await conn.query("SELECT * FROM tb_empleados WHERE id = ?", [id]);
    //console.log(req.params.cargoId,id);
    //res.json(req.params);
    res.json(empleados[0]);
};

export async function deleteEmpleados(req: Request, res: Response) {
    const id = req.params.id;
    console.log(req.params);
    const conn = await conection.getConneccion();
    await conn.query("DELETE FROM tb_empleados WHERE id = ?", [id]);
    res.json({
      message: "Empleado eliminado",
      id,
    });
};

export async function updateEmpleados(req: Request, res: Response) {
    const id = req.params.id;
    const modEmpleados: Iempleados = req.body;
    const conn = await conection.getConneccion();
    await conn.query("UPDATE tb_empleados set ? WHERE id = ?", [modEmpleados, id]);
    res.json({
      message: "Empleado actualizado",
      modEmpleados,
    });
};