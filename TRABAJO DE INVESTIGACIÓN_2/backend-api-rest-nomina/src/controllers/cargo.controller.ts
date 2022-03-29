import  { Request, Response } from "express";
import { Coneccion } from "../bd/database";
import {Icargo} from '../interface/Cargo'
// instanciar la clase coneccion
const conection:Coneccion = new Coneccion();
// controlador de getcargos (funcion o logica de la peticion)
export async function getCargos(req:Request, res:Response): Promise<Response | void> {
 try { 
     const conn = await conection.getConneccion();
     const cargos = await conn.query("SELECT * FROM tb_cargo");
     return res.json(cargos[0]);
 }   
 catch (err) {
     console.log(err);
 }
};
// creacion de un cargo
export async function createCargo(req: Request, res: Response) {
  try {
    const modCargo: Icargo = req.body;
    console.log(modCargo);
    const conn = await conection.getConneccion();
    const cargos = await conn.query("INSERT INTO tb_cargo SET ?", [modCargo]);
    res.json({ msg: "Cargo insertado Satisfactoriamente", cargo: modCargo });
  } catch (err) {
    console.log(err);
  }
}
// obtener un cargo mediante su id 
export async function getCargo(req: Request, res: Response) {
  const id = req.params.id;
  const conn = await conection.getConneccion();
  const cargo = await conn.query("SELECT * FROM tb_cargo WHERE id = ?", [id]);
  //console.log(req.params.cargoId,id);
  //res.json(req.params);
  res.json(cargo[0]);
}
// eliminar un cargo mediante su id
export async function deleteCargo(req: Request, res: Response) {
  const id = req.params.id;
  console.log(req.params);
  const conn = await conection.getConneccion();
  await conn.query("DELETE FROM tb_cargo WHERE id = ?", [id]);
  res.json({
    message: "cargo eliminado",
    id,
  });
}
// actualizar o modificar o editar un cargo mediante su id
export async function updateCargo(req: Request, res: Response) {
  const id = req.params.id;
  const modCargo: Icargo = req.body;
  const conn = await conection.getConneccion();
  await conn.query("UPDATE tb_cargo set ? WHERE id = ?", [modCargo, id]);
  res.json({
    message: "Cargo actualizado",
    modCargo,
  });
}


