import { NextApiRequest, NextApiResponse } from "next"
//import {conn} from "../../../utils/database";
import {conn} from "src/utils/database";

export default async(req:NextApiRequest, res:NextApiResponse) =>{
   const {method, body} = req;

   switch (method) {
    case "GET":
        try {
            //constulta (task es la tabla)
        const query ="SELECT * FROM prueba";
        const response = await conn.query(query);
        return res.status(200).json(response.rows);
        } catch (error: any) {
            return res.status(400).json({error: error.message});
        }
    case "POST":
        try {
            console.log(body);
        //creacion tareas
        const { NombrePredio, Avaluo, Departamento, Municipio,
        TipoDocumento,NumeroDeDocumento,NombresPropietario,ApellidosPropietario,NIT,Razon,Direccion,
        Telefono,CorreoElectronico,NombreConstruccion,NumeroDePisos,AreaTotal,TipoConstruccion,
        DireccionConstruccion,NombreTerreno,AreaTerreno,ValorComercial,FuenteDeAgua,TipoTerreno}=body;
        const query = "INSERT INTO prueba(nombrepredio, avaluo,Departamento,Municipio,TipoDocumento,NumeroDeDocumento,NombresPropietario,ApellidosPropietario,NIT,Razon,direccion,telefono,correoelectronico,nombreconstruccion,construccionnumeropisos,construccionareatotal,tipodeconstruccion,construcciondireccion,nombreterreno,terrenoarea,terrenovalorcomercial,terrenofuentedeagua,tipoterreno) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23) RETURNING *";
        const values= [NombrePredio, Avaluo,Departamento, Municipio,TipoDocumento,NumeroDeDocumento,
            NombresPropietario,ApellidosPropietario,NIT,Razon,Direccion,Telefono,CorreoElectronico,NombreConstruccion,NumeroDePisos,AreaTotal,TipoConstruccion,
            DireccionConstruccion,NombreTerreno,AreaTerreno,ValorComercial,FuenteDeAgua,TipoTerreno];

        const response = await conn.query(query, values);
        console.log(response);

        return res.status(200).json(response.rows[0]);
        } catch (error:any) {
            return res.status(400).json({error: error.message});
        }
    default:
        return res.status(400).json("Invalid method");

   }

};