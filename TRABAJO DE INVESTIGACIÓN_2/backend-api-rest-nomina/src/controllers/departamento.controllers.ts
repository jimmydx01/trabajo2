import { Request, Response } from "express";
import { Coneccion } from "../bd/database";
import {Idepartamento} from '../interface/Departamento'

const conection:Coneccion = new Coneccion();

export async function getDepartamentos(req:Request, res:Response): Promise<Response | void> {
    try {
        const conn = await conection.getConneccion();
        const departamentos = await conn.query("SELECT * FROM tb_departamento");
        return res.json(departamentos[0]);
    } catch (err) {
        console.log(err);
    }
};

export async function createDepartamento(req: Request, res: Response) {
    try {
      const modDepartamento: Idepartamento = req.body;
      console.log(modDepartamento);
      const conn = await conection.getConneccion();
      const departamentos = await conn.query("INSERT INTO tb_departamento SET ?", [modDepartamento]);
      res.json({ msg: "Departamento insertado Satisfactoriamente", departamento: modDepartamento });
    } catch (err) {
      console.log(err);
    }
};

export async function getDepartamento(req: Request, res: Response) {
    const id = req.params.id;
    const conn = await conection.getConneccion();
    const departamento = await conn.query("SELECT * FROM tb_departamento WHERE id = ?", [id]);
    //console.log(req.params.cargoId,id);
    //res.json(req.params);
    res.json(departamento[0]);
};

export async function deleteDepartamento(req: Request, res: Response) {
    const id = req.params.id;
    console.log(req.params);
    const conn = await conection.getConneccion();
    await conn.query("DELETE FROM tb_departamento WHERE id = ?", [id]);
    res.json({
      message: "departamento eliminado",
      id,
    });
};

export async function updateDepartamento(req: Request, res: Response) {
    const id = req.params.id;
    const modDepartamento: Idepartamento = req.body;
    const conn = await conection.getConneccion();
    await conn.query("UPDATE tb_departamento set ? WHERE id = ?", [modDepartamento, id]);
    res.json({
      message: "Departamento actualizado",
      modDepartamento,
    });
};